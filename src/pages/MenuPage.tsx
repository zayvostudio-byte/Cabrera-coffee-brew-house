import React from 'react';
import { motion } from 'motion/react';
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
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen"
    >
      <OrderingSystem
        orderType={orderType}
        setOrderType={setOrderType}
        onAddToCart={onAddToCart}
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
        lang={lang}
        theme={theme}
      />
    </motion.div>
  );
};
