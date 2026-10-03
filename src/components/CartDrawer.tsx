import React, { useState } from 'react';
import { CartItem, OrderType } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  tableNumber: string;
  setTableNumber: (val: string) => void;
  onProceedToCheckout: (subtotal: number, tax: number, tip: number, total: number) => void;
  lang: Language;
  theme: 'luxury-clean' | 'dark';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  orderType,
  setOrderType,
  tableNumber,
  setTableNumber,
  onProceedToCheckout,
  lang,
  theme,
}) => {
  const [tipPercentage, setTipPercentage] = useState<number>(10);
  const [customTip, setCustomTip] = useState<string>('');

  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];
  const isLight = theme === 'luxury-clean';

  const subtotal = cartItems.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);
  const tax = subtotal * 0.07;

  const calculatedTip = customTip !== '' 
    ? Math.max(0, parseFloat(customTip) || 0) 
    : (subtotal * tipPercentage) / 100;

  const total = subtotal + tax + calculatedTip;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end">
      <div 
        className={`w-full max-w-md h-full flex flex-col shadow-2xl border-l animate-in slide-in-from-right duration-200 text-left ${
          isLight ? 'bg-[#faf6ee] border-[#e0d3c0] text-[#24140b]' : 'bg-[#1c110a] border-[#3f271a] text-[#fcf9f4]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          isLight ? 'border-[#e4d8c7] bg-white' : 'border-[#382215] bg-[#24150d]'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#c85a17]/15 flex items-center justify-center text-[#c85a17]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base">
                {t.myOrder}
              </h3>
              <span className="text-[11px] font-mono text-[#c85a17] font-bold">
                {cartItems.length} {cartItems.length === 1 ? t.cartItemSingular : t.cartItemsLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="text-xs text-[#a39080] hover:text-rose-500 transition-colors p-1"
                aria-label="Vaciar carrito"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className={`p-1.5 rounded-lg border transition-colors ${
                isLight ? 'border-[#e0d3c0] hover:bg-[#faf6ee]' : 'border-[#3f271a] hover:bg-[#281810]'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Order Mode Pill in Cart */}
        <div className={`p-3 border-b flex items-center justify-between gap-3 text-xs ${
          isLight ? 'bg-white/80 border-[#e4d8c7]' : 'bg-[#22150d] border-[#382215]'
        }`}>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#c85a17]">{t.serviceMode}:</span>
            <div className="flex p-0.5 rounded-lg border border-[#e0d3c0] dark:border-[#3f271a]">
              <button
                type="button"
                onClick={() => setOrderType('dine_in')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  orderType === 'dine_in'
                    ? 'bg-[#c85a17] text-white shadow-sm'
                    : isLight ? 'text-[#5c4536]' : 'text-[#cfc1b4]'
                }`}
              >
                {t.dineIn}
              </button>
              <button
                type="button"
                onClick={() => setOrderType('takeout')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  orderType === 'takeout'
                    ? 'bg-[#c85a17] text-white shadow-sm'
                    : isLight ? 'text-[#5c4536]' : 'text-[#cfc1b4]'
                }`}
              >
                {t.takeout}
              </button>
            </div>
          </div>

          {orderType === 'dine_in' && (
            <div className="flex items-center gap-1 font-mono text-xs">
              <span className="font-semibold text-[#5c4536] dark:text-[#cfc1b4]">{t.tableNumLabel}:</span>
              <input
                type="text"
                placeholder="4"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className={`w-12 border rounded px-1.5 py-0.5 text-center font-bold font-mono text-xs focus:border-[#c85a17] ${
                  isLight ? 'bg-white border-[#e0d3c0] text-[#24140b]' : 'bg-[#1c110a] border-[#3f271a] text-white'
                }`}
              />
            </div>
          )}
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#c85a17]/50 mx-auto" />
              <h4 className="font-serif font-bold text-lg">
                {t.cartEmptyTitle}
              </h4>
              <p className="text-xs text-[#856e5f] max-w-xs mx-auto">
                {t.cartEmptyDesc}
              </p>
            </div>
          ) : (
            cartItems.map((cartItem) => {
              const itemName = lang === 'en' && cartItem.item.nameEn ? cartItem.item.nameEn : cartItem.item.name;

              return (
                <div
                  key={cartItem.cartItemId}
                  className={`p-3.5 rounded-xl border flex gap-3 relative transition-all ${
                    isLight ? 'bg-white border-[#e0d3c0]' : 'bg-[#26170f] border-[#3f271a]'
                  }`}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-black/10">
                    <img
                      src={cartItem.item.image}
                      alt={itemName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 pr-6 space-y-1">
                    <h5 className="font-serif font-bold text-sm truncate">
                      {itemName}
                    </h5>

                    {/* Customizations tags */}
                    <div className="text-[11px] text-[#856e5f] dark:text-[#a39080] space-y-0.5">
                      {cartItem.size && (
                        <div>• Tamaño: {cartItem.size}</div>
                      )}
                      {cartItem.selectedMilk && (
                        <div>• Leche: {cartItem.selectedMilk}</div>
                      )}
                      {cartItem.selectedSyrup && (
                        <div>• Sirope: {cartItem.selectedSyrup}</div>
                      )}
                      {cartItem.selectedTemperature && (
                        <div>• {cartItem.selectedTemperature}</div>
                      )}
                      {cartItem.notes && (
                        <div className="italic text-[10px]">"{cartItem.notes}"</div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {/* Quantity stepper */}
                      <div className={`flex items-center border rounded-lg text-xs ${
                        isLight ? 'border-[#e0d3c0] bg-[#faf6ee]' : 'border-[#3f271a] bg-[#1c110a]'
                      }`}>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(cartItem.cartItemId, Math.max(1, cartItem.quantity - 1))}
                          className="px-2 py-0.5 text-xs opacity-70 hover:opacity-100 font-bold"
                        >
                          -
                        </button>
                        <span className="font-mono text-xs px-2 font-bold">
                          {cartItem.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                          className="px-2 py-0.5 text-xs opacity-70 hover:opacity-100 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono font-bold text-xs text-[#c85a17]">
                        ${(cartItem.unitPrice * cartItem.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(cartItem.cartItemId)}
                    className="absolute top-2.5 right-2.5 opacity-50 hover:opacity-100 hover:text-rose-500 p-1 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Financial Breakdown */}
        {cartItems.length > 0 && (
          <div className={`p-4 border-t space-y-4 ${
            isLight ? 'bg-white border-[#e0d3c0]' : 'bg-[#1c110a] border-[#382215]'
          }`}>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className={isLight ? 'text-[#5c4536]' : 'text-[#cfc1b4]'}>{t.teamTip}</span>
                <span className="font-mono text-[#c85a17] font-bold">
                  ${calculatedTip.toFixed(2)}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 10, 15, 18].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => {
                      setTipPercentage(pct);
                      setCustomTip('');
                    }}
                    className={`py-1 text-[11px] font-bold rounded-lg border transition-all ${
                      customTip === '' && tipPercentage === pct
                        ? 'border-[#c85a17] bg-[#c85a17] text-white shadow-sm'
                        : isLight ? 'border-[#e0d3c0] bg-white text-[#5c4536]' : 'border-[#3f271a] bg-[#26170f] text-[#cfc1b4]'
                    }`}
                  >
                    {pct === 0 ? t.noTip : `${pct}%`}
                  </button>
                ))}
              </div>
            </div>

            <div className={`space-y-1.5 text-xs border-t pt-2 ${
              isLight ? 'border-[#f2ece2] text-[#5c4536]' : 'border-[#331f14] text-[#cfc1b4]'
            }`}>
              <div className="flex justify-between">
                <span>{t.subtotal}</span>
                <span className="font-mono font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.taxPanama}</span>
                <span className="font-mono font-bold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.tip}</span>
                <span className="font-mono font-bold">${calculatedTip.toFixed(2)}</span>
              </div>
              <div className={`flex justify-between text-sm font-bold pt-1 border-t ${
                isLight ? 'border-[#e4d8c7]' : 'border-[#3f271a]'
              }`}>
                <span>{t.totalPay}</span>
                <span className="font-mono text-[#c85a17] text-base font-black">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onProceedToCheckout(subtotal, tax, calculatedTip, total)}
              className="w-full py-3.5 bg-[#c85a17] hover:bg-[#b54d0f] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{t.proceedCheckout}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
