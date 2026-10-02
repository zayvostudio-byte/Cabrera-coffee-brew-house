import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { EspressoTransition } from './components/EspressoTransition';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { GalleryPage } from './pages/GalleryPage';
import { VisitPage } from './pages/VisitPage';
import { OrderType, CartItem, Order } from './types';
import { Language, TRANSLATIONS } from './i18n/translations';

export default function App() {
  const location = useLocation();

  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('cabrera_lang');
      return (saved === 'en' || saved === 'es') ? saved : 'es';
    } catch {
      return 'es';
    }
  });

  const [theme, setTheme] = useState<'luxury-clean' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('cabrera_theme');
      return (saved === 'luxury-clean' || saved === 'dark') ? saved : 'luxury-clean';
    } catch {
      return 'luxury-clean';
    }
  });

  const [orderType, setOrderType] = useState<OrderType>('dine_in');
  const [tableNumber, setTableNumber] = useState<string>('4');
  
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cabrera_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutFinancials, setCheckoutFinancials] = useState({
    subtotal: 0,
    tax: 0,
    tip: 0,
    total: 0,
  });

  // Recent active order for live tracking
  const [activeOrder, setActiveOrder] = useState<Order | null>(() => {
    try {
      const saved = localStorage.getItem('cabrera_active_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const t = TRANSLATIONS[lang];

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Sync lang to localStorage & document lang
  useEffect(() => {
    try {
      localStorage.setItem('cabrera_lang', lang);
      document.documentElement.lang = lang;
    } catch {}
  }, [lang]);

  // Sync theme to localStorage & document root class
  useEffect(() => {
    try {
      localStorage.setItem('cabrera_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('theme-dark');
      } else {
        document.documentElement.classList.remove('theme-dark');
      }
    } catch {}
  }, [theme]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cabrera_cart', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  // Sync active order to localStorage
  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem('cabrera_active_order', JSON.stringify(activeOrder));
      }
    } catch {}
  }, [activeOrder]);

  const cartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) =>
          it.item.id === newItem.item.id &&
          it.size === newItem.size &&
          it.selectedMilk === newItem.selectedMilk &&
          it.selectedSyrup === newItem.selectedSyrup &&
          it.selectedTemperature === newItem.selectedTemperature &&
          (it.notes || '') === (newItem.notes || '')
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
    } else {
      setCartItems((prev) =>
        prev.map((it) => (it.cartItemId === cartItemId ? { ...it, quantity: newQty } : it))
      );
    }
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleProceedToCheckout = (
    subtotal: number,
    tax: number,
    tip: number,
    total: number
  ) => {
    setCheckoutFinancials({ subtotal, tax, tip, total });
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = (order: Order) => {
    setActiveOrder(order);
    setCartItems([]);
  };

  const isLight = theme === 'luxury-clean';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isLight ? 'bg-[#fcfbf9] text-[#181513]' : 'bg-[#12100e] text-[#f7f5f0]'
    } selection:bg-[#b58548] selection:text-white`}>
      
      {/* 
        ==================================================
        PAGE TRANSITIONS: ARTISANAL COFFEE DRIP SLIDE
        ==================================================
      */}
      <EspressoTransition pathname={location.pathname} lang={lang} />

      {/* 
        ==================================================
        CONSISTENT NAVIGATION ACROSS ALL PAGES
        ==================================================
      */}
      <Navbar
        orderType={orderType}
        setOrderType={setOrderType}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Live Active Order Notification Ribbon */}
      {activeOrder && (
        <div className={`border-y py-3 px-4 text-xs transition-colors ${
          isLight
            ? 'bg-[#f4ede1] border-[#ded5c5] text-[#332a21]'
            : 'bg-[#1f1914] border-[#3d3126] text-[#c7baa8]'
        }`}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold">
                {t.activeOrderTitle} #{activeOrder.orderNumber}:
              </span>
              <span>
                {activeOrder.orderType === 'dine_in'
                  ? `${t.dineIn} (${t.tableNumLabel} ${activeOrder.tableNumber})`
                  : `${t.takeout} (${activeOrder.pickupTime})`}
              </span>
              <span className="text-[#b58548] font-mono font-semibold">
                · {t.inPreparation} ({activeOrder.items.length} {t.cartItemsLabel})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(true)}
                className="px-3 py-1 bg-[#b58548] text-white rounded font-semibold transition-colors hover:bg-[#9c6e33]"
              >
                {t.viewReceipt}
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveOrder(null);
                  localStorage.removeItem('cabrera_active_order');
                }}
                className="opacity-60 hover:opacity-100"
                aria-label="Cerrar notificación"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 
        ==================================================
        REAL MULTI-PAGE ROUTED CONTENT
        /, /menu, /our-story, /gallery, /visit
        ==================================================
      */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <HomePage
                  orderType={orderType}
                  setOrderType={setOrderType}
                  lang={lang}
                  theme={theme}
                />
              }
            />

            <Route
              path="/menu"
              element={
                <MenuPage
                  orderType={orderType}
                  setOrderType={setOrderType}
                  onAddToCart={handleAddToCart}
                  tableNumber={tableNumber}
                  setTableNumber={setTableNumber}
                  lang={lang}
                  theme={theme}
                />
              }
            />

            <Route
              path="/our-story"
              element={
                <OurStoryPage
                  lang={lang}
                  theme={theme}
                />
              }
            />

            <Route
              path="/gallery"
              element={
                <GalleryPage
                  lang={lang}
                  theme={theme}
                />
              }
            />

            <Route
              path="/visit"
              element={
                <VisitPage
                  lang={lang}
                  theme={theme}
                />
              }
            />

            {/* Fallback to Home for unknown URLs */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        orderType={orderType}
        setOrderType={setOrderType}
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
        onProceedToCheckout={handleProceedToCheckout}
        lang={lang}
        theme={theme}
      />

      {/* Checkout & Secure Payment Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        orderType={orderType}
        tableNumber={tableNumber}
        subtotal={checkoutFinancials.subtotal}
        tax={checkoutFinancials.tax}
        tip={checkoutFinancials.tip}
        total={checkoutFinancials.total}
        onOrderCompleted={handleOrderCompleted}
        lang={lang}
        theme={theme}
      />

      {/* 
        ==================================================
        CONSISTENT FOOTER ACROSS ALL PAGES
        ==================================================
      */}
      <Footer
        lang={lang}
        theme={theme}
      />
    </div>
  );
}
