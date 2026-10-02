import React, { useState } from 'react';
import { CartItem, OrderType } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, Utensils, Coffee } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div 
        className={`w-full max-w-md h-full flex flex-col shadow-2xl border-l animate-in slide-in-from-right duration-300 text-left ${
          isLight ? 'bg-white border-[#ded7ca] text-[#181513]' : 'bg-[#161310] border-[#362b21] text-[#f7f5f0]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between ${
          isLight ? 'bg-[#fcfbf9] border-[#e8e2d6]' : 'bg-[#191512] border-[#2b221a]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#b58548]/15 flex items-center justify-center text-[#b58548] border border-[#b58548]/30">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">
                {t.cartTitle}
              </h3>
              <span className={`text-[11px] font-mono ${isLight ? 'text-[#877869]' : 'text-[#9c8e7f]'}`}>
                {cartItems.length} {cartItems.length === 1 ? t.cartItemSingular : t.cartItemsLabel}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 opacity-60 hover:opacity-100 rounded-lg transition-opacity"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Mode Switcher */}
        <div className={`p-4 border-b space-y-3 ${
          isLight ? 'bg-[#f7f5f0] border-[#e8e2d6]' : 'bg-[#1b1713] border-[#292019]'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${isLight ? 'text-[#706456]' : 'text-[#a6998a]'}`}>
              {t.serviceMode}
            </span>
            <div className={`flex p-1 rounded-lg border ${
              isLight ? 'bg-white border-[#ded7ca]' : 'bg-[#120f0d] border-[#30261e]'
            }`}>
              <button
                type="button"
                onClick={() => setOrderType('dine_in')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded transition-all ${
                  orderType === 'dine_in'
                    ? 'bg-[#b58548] text-white shadow-sm'
                    : isLight ? 'text-[#706456]' : 'text-[#9c8f80]'
                }`}
              >
                <Utensils className="w-3 h-3" />
                <span>{t.dineIn}</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('takeout')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded transition-all ${
                  orderType === 'takeout'
                    ? 'bg-[#b58548] text-white shadow-sm'
                    : isLight ? 'text-[#706456]' : 'text-[#9c8f80]'
                }`}
              >
                <Coffee className="w-3 h-3" />
                <span>{t.takeout}</span>
              </button>
            </div>
          </div>

          {orderType === 'dine_in' && (
            <div className="flex items-center justify-between pt-1">
              <label className="text-xs">{t.tableNumLabel}</label>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="4"
                className={`w-24 border rounded px-3 py-1 text-xs text-center font-mono focus:outline-none focus:border-[#b58548] ${
                  isLight ? 'bg-white border-[#ded7ca]' : 'bg-[#120f0d] border-[#362b21] text-white'
                }`}
              />
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <ShoppingBag className="w-12 h-12 opacity-30 stroke-1" />
              <h4 className="font-serif text-lg">{t.cartEmptyTitle}</h4>
              <p className={`text-xs max-w-xs ${isLight ? 'text-[#706456]' : 'text-[#8e8071]'}`}>
                {t.cartEmptyDesc}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-5 py-2 bg-[#b58548] text-white text-xs font-semibold rounded-lg shadow-sm"
              >
                {t.viewMenuBtn}
              </button>
            </div>
          ) : (
            cartItems.map((cartItem) => {
              const itemName = lang === 'en' && cartItem.item.nameEn ? cartItem.item.nameEn : cartItem.item.name;
              return (
                <div
                  key={cartItem.cartItemId}
                  className={`p-3 border rounded-xl flex items-start gap-3 relative ${
                    isLight ? 'bg-[#faf8f5] border-[#e6dfd3]' : 'bg-[#1c1814] border-[#2e241c]'
                  }`}
                >
                  <img
                    src={cartItem.item.image}
                    alt={itemName}
                    className="w-16 h-16 rounded-lg object-cover shrink-0 bg-black/10"
                  />

                  <div className="flex-1 min-w-0 pr-6">
                    <h4 className="text-xs font-bold truncate">
                      {itemName}
                    </h4>
                    
                    <div className={`text-[11px] space-y-0.5 mt-0.5 ${isLight ? 'text-[#7a6d5f]' : 'text-[#9e9081]'}`}>
                      {cartItem.size && <div>{t.beverageSize}: {cartItem.size}</div>}
                      {cartItem.selectedTemperature && <div>Temp: {cartItem.selectedTemperature === 'Hot' ? 'Hot' : 'Iced'}</div>}
                      {cartItem.selectedMilk && <div>{t.milkType}: {cartItem.selectedMilk}</div>}
                      {cartItem.selectedSyrup && <div>{t.extraSyrup}: {cartItem.selectedSyrup}</div>}
                      {cartItem.notes && <div className="italic">"{cartItem.notes}"</div>}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className={`flex items-center border rounded-md ${
                        isLight ? 'bg-white border-[#ded7ca]' : 'bg-[#13100d] border-[#382d23]'
                      }`}>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                          className="px-2 py-0.5 text-xs opacity-60 hover:opacity-100"
                        >
                          -
                        </button>
                        <span className="font-mono text-xs px-2 font-bold">
                          {cartItem.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                          className="px-2 py-0.5 text-xs opacity-60 hover:opacity-100"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono font-bold text-xs text-[#b58548]">
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
            isLight ? 'bg-[#fcfbf9] border-[#e8e2d6]' : 'bg-[#14100e] border-[#2d231a]'
          }`}>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className={isLight ? 'text-[#706456]' : 'text-[#a6998a]'}>{t.teamTip}</span>
                <span className="font-mono text-[#b58548] font-bold">
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
                    className={`py-1 text-[11px] font-semibold rounded border transition-all ${
                      customTip === '' && tipPercentage === pct
                        ? 'border-[#b58548] bg-[#b58548] text-white shadow-sm'
                        : isLight ? 'border-[#ded7ca] bg-white text-[#706456]' : 'border-[#30261e] bg-[#1a1512] text-[#8e8172]'
                    }`}
                  >
                    {pct === 0 ? t.noTip : `${pct}%`}
                  </button>
                ))}
              </div>
            </div>

            <div className={`space-y-1.5 text-xs border-t pt-2 ${
              isLight ? 'border-[#eee7db] text-[#6e6153]' : 'border-[#261e17] text-[#a6998a]'
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
                isLight ? 'border-[#eee7db]' : 'border-[#2c2219]'
              }`}>
                <span>{t.totalPay}</span>
                <span className="font-mono text-[#b58548] text-base">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onProceedToCheckout(subtotal, tax, calculatedTip, total)}
              className="w-full py-3.5 bg-[#b58548] hover:bg-[#9c6e33] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
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
