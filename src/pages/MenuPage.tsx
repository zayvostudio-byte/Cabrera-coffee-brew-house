import React from 'react';
import { OrderingSystem } from '../components/OrderingSystem';
import { OrderType, CartItem } from '../types';
import { Language } from '../i18n/translations';

interface MenuPageProps {
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  onAddToCart: (cartItem: CartItem) => void;
  tableNumber: string;
  setTableNumber: (val: string) => void;
  lang: Language;
  theme: 'luxury-clean' | 'dark';
}

export const MenuPage: React.FC<MenuPageProps> = ({
  orderType,
  setOrderType,
  onAddToCart,
  tableNumber,
  setTableNumber,
  lang,
  theme,
}) => {
  return (
    <div className="min-h-screen opacity-100">
      <OrderingSystem
        orderType={orderType}
        setOrderType={setOrderType}
        onAddToCart={onAddToCart}
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
        lang={lang}
        theme={theme}
      />
    </div>
  );
};
