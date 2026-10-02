import React, { useState } from 'react';
import { MenuItem, CartItem } from '../types';
import { MILK_OPTIONS, SYRUP_OPTIONS } from '../data/menuData';
import { X, Plus, Minus, Check } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
  lang: Language;
  theme: 'luxury-clean' | 'dark';
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart,
  lang,
  theme,
}) => {
  if (!item) return null;

  const t = TRANSLATIONS[lang];
  const isLight = theme === 'luxury-clean';

  const [selectedSize, setSelectedSize] = useState<'Regular' | 'Grande'>('Regular');
  const [selectedMilk, setSelectedMilk] = useState<string>(
    item.allowsMilkChoice ? MILK_OPTIONS[0].name : ''
  );
  const [selectedSyrup, setSelectedSyrup] = useState<string>(
    item.allowsSyrupChoice ? SYRUP_OPTIONS[0].name : ''
  );
  const [selectedTemp, setSelectedTemp] = useState<'Hot' | 'Iced'>('Hot');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  // Calculate unit price
  const basePrice = (selectedSize === 'Grande' && item.priceLarge) ? item.priceLarge : item.price;
  
  const milkExtra = item.allowsMilkChoice 
    ? (MILK_OPTIONS.find((m) => m.name === selectedMilk)?.price || 0) 
    : 0;

  const syrupExtra = item.allowsSyrupChoice 
    ? (SYRUP_OPTIONS.find((s) => s.name === selectedSyrup)?.price || 0) 
    : 0;

  const unitPrice = basePrice + milkExtra + syrupExtra;
  const totalPrice = unitPrice * quantity;

  const itemName = lang === 'en' && item.nameEn ? item.nameEn : item.name;
  const itemDesc = lang === 'en' && item.descriptionEn ? item.descriptionEn : item.description;

  const handleConfirm = () => {
    const cartItemId = `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    onAddToCart({
      cartItemId,
      item,
      size: item.availableSizes ? selectedSize : undefined,
      unitPrice,
      quantity,
      selectedMilk: item.allowsMilkChoice ? selectedMilk : undefined,
      selectedSyrup: item.allowsSyrupChoice && selectedSyrup !== 'Sin Sirope Adicional' ? selectedSyrup : undefined,
      selectedTemperature: (item.category === 'coffee' || item.category === 'tea') ? selectedTemp : undefined,
      notes: notes.trim() ? notes.trim() : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className={`relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border text-left ${
          isLight ? 'bg-white border-[#ded7ca] text-[#181513]' : 'bg-[#161310] border-[#3b3026] text-[#f7f5f0]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black/20">
          <img
            src={item.image}
            alt={itemName}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Subcategory & prep time */}
          <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between text-white">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#ffd280]">
              {lang === 'en' && item.subcategoryEn ? item.subcategoryEn : item.subcategory}
            </span>
            <span className="text-xs font-mono">
              ~{item.prepTimeMinutes} {t.prepTime}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Title & Description */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-serif text-2xl font-bold">
                {itemName}
              </h2>
              <span className="font-mono text-xl font-bold text-[#b58548] shrink-0">
                ${basePrice.toFixed(2)}
              </span>
            </div>
            <p className={`text-sm mt-2 leading-relaxed ${isLight ? 'text-[#695d51]' : 'text-[#b8aca0]'}`}>
              {itemDesc}
            </p>
          </div>

          {/* Size Choice */}
          {item.availableSizes && item.availableSizes.length > 1 && (
            <div className={`space-y-2 pt-2 border-t ${isLight ? 'border-[#eee7db]' : 'border-[#29221b]'}`}>
              <label className="block text-xs uppercase font-bold tracking-wider">
                {t.beverageSize}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {item.availableSizes.map((size) => {
                  const sizePrice = size === 'Grande' && item.priceLarge ? item.priceLarge : item.price;
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all ${
                        isSelected
                          ? 'border-[#b58548] bg-[#b58548]/10 font-bold'
                          : isLight ? 'border-[#ded7ca] bg-[#fcfbf9] text-[#706456]' : 'border-[#332a22] bg-[#1a1613] text-[#a89d91]'
                      }`}
                    >
                      <span>{size}</span>
                      <span className="font-mono text-xs text-[#b58548] font-bold">${sizePrice.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Temperature Choice */}
          {(item.category === 'coffee' || item.category === 'tea') && (
            <div className={`space-y-2 pt-2 border-t ${isLight ? 'border-[#eee7db]' : 'border-[#29221b]'}`}>
              <label className="block text-xs uppercase font-bold tracking-wider">
                {t.temperature}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedTemp('Hot')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    selectedTemp === 'Hot'
                      ? 'border-[#b58548] bg-[#b58548]/10'
                      : isLight ? 'border-[#ded7ca] bg-[#fcfbf9] text-[#706456]' : 'border-[#332a22] bg-[#1a1613] text-[#a89d91]'
                  }`}
                >
                  {t.tempHot}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTemp('Iced')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    selectedTemp === 'Iced'
                      ? 'border-[#b58548] bg-[#b58548]/10'
                      : isLight ? 'border-[#ded7ca] bg-[#fcfbf9] text-[#706456]' : 'border-[#332a22] bg-[#1a1613] text-[#a89d91]'
                  }`}
                >
                  {t.tempIced}
                </button>
              </div>
            </div>
          )}

          {/* Milk Options */}
          {item.allowsMilkChoice && (
            <div className={`space-y-2 pt-2 border-t ${isLight ? 'border-[#eee7db]' : 'border-[#29221b]'}`}>
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase font-bold tracking-wider">
                  {t.milkType}
                </label>
                <span className={`text-[11px] ${isLight ? 'text-[#877869]' : 'text-[#938779]'}`}>
                  {t.plantMilksExtra}
                </span>
              </div>
              <div className="space-y-2">
                {MILK_OPTIONS.map((milk) => {
                  const isSelected = selectedMilk === milk.name;
                  const milkLabel = lang === 'en' ? milk.nameEn : milk.name;
                  return (
                    <button
                      key={milk.name}
                      type="button"
                      onClick={() => setSelectedMilk(milk.name)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs font-medium transition-all ${
                        isSelected
                          ? 'border-[#b58548] bg-[#b58548]/10'
                          : isLight ? 'border-[#e4ded3] bg-[#faf8f5] text-[#695d51]' : 'border-[#2d241d] bg-[#1a1613] text-[#a89d91]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#b58548] bg-[#b58548]' : 'border-gray-400'}`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span>{milkLabel}</span>
                      </div>
                      <span className="font-mono text-[11px] text-[#b58548] font-bold">
                        {milk.price > 0 ? `+$${milk.price.toFixed(2)}` : t.milkIncluded}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Syrups Options */}
          {item.allowsSyrupChoice && (
            <div className={`space-y-2 pt-2 border-t ${isLight ? 'border-[#eee7db]' : 'border-[#29221b]'}`}>
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase font-bold tracking-wider">
                  {t.extraSyrup}
                </label>
                <span className="text-[11px] text-[#b58548] font-semibold">+$0.75</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SYRUP_OPTIONS.map((syrup) => {
                  const isSelected = selectedSyrup === syrup.name;
                  const syrupLabel = lang === 'en' ? syrup.nameEn : syrup.name;
                  return (
                    <button
                      key={syrup.name}
                      type="button"
                      onClick={() => setSelectedSyrup(syrup.name)}
                      className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all ${
                        isSelected
                          ? 'border-[#b58548] bg-[#b58548]/10 font-bold'
                          : isLight ? 'border-[#e4ded3] bg-[#faf8f5] text-[#695d51]' : 'border-[#2d241d] bg-[#1a1613] text-[#a89d91]'
                      }`}
                    >
                      <span className="truncate">{syrupLabel}</span>
                      {syrup.price > 0 && (
                        <span className="font-mono text-[11px] text-[#b58548] ml-1 shrink-0">
                          +$0.75
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className={`space-y-2 pt-2 border-t ${isLight ? 'border-[#eee7db]' : 'border-[#29221b]'}`}>
            <label className="block text-xs uppercase font-bold tracking-wider">
              {t.notesKitchenLabel}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.notesPlaceholder}
              className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#b58548] ${
                isLight ? 'bg-[#faf8f5] border-[#ded7ca] text-black' : 'bg-[#1a1613] border-[#332920] text-white'
              }`}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className={`p-4 border-t flex items-center justify-between gap-4 ${
          isLight ? 'bg-[#f7f4ed] border-[#e2dad0]' : 'bg-[#120f0d] border-[#29211b]'
        }`}>
          {/* Quantity Controls */}
          <div className={`flex items-center border rounded-xl p-1 ${
            isLight ? 'bg-white border-[#ded7ca]' : 'bg-[#1e1915] border-[#382f25]'
          }`}>
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-2 opacity-60 hover:opacity-100 disabled:opacity-30 transition-opacity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-sm px-3">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 opacity-60 hover:opacity-100 transition-opacity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to order button */}
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-3 px-5 bg-[#b58548] hover:bg-[#9c6e33] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-between"
          >
            <span>{t.addToOrder}</span>
            <span className="font-mono font-bold text-sm">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
