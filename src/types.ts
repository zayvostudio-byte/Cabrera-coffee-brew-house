export type MenuCategory = 'all' | 'brunch' | 'coffee' | 'pourover' | 'tea' | 'bakery' | 'beverages';

export type SubCategory = 
  | 'Toast' 
  | 'Eggs' 
  | 'Pancakes & Waffles' 
  | 'Burgers & Sandwiches' 
  | 'Bowls & Soups' 
  | 'Extras'
  | 'Café Espresso' 
  | 'Pour Over & Cold' 
  | 'Té & Infusiones' 
  | 'Otros Fríos' 
  | 'Bakery';

export interface CustomizationOption {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  nameEn?: string;
  category: MenuCategory;
  subcategory: SubCategory;
  subcategoryEn?: string;
  price: number;
  priceLarge?: number;
  description: string;
  descriptionEn?: string;
  image: string;
  isPopular?: boolean;
  isHouseSpecial?: boolean;
  dietary?: ('vegetarian' | 'vegan' | 'gluten-free' | 'chef-choice')[];
  availableSizes?: ('Regular' | 'Grande')[];
  allowsMilkChoice?: boolean;
  allowsSyrupChoice?: boolean;
  allowsDineOption?: boolean;
  prepTimeMinutes: number;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  size?: 'Regular' | 'Grande';
  unitPrice: number;
  quantity: number;
  selectedMilk?: string;
  selectedSyrup?: string;
  selectedTemperature?: 'Hot' | 'Iced';
  notes?: string;
}

export type OrderType = 'dine_in' | 'takeout';

export type PaymentMethod = 'credit_card' | 'yappy_ach' | 'apple_pay' | 'cash_counter';

export interface Order {
  id: string;
  orderNumber: string;
  orderType: OrderType;
  tableNumber?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupTime?: string;
  items: CartItem[];
  subtotal: number;
  tax: number; // 7% standard Panama ITBMS
  tip: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  orderStatus: 'received' | 'brewing' | 'ready' | 'completed';
  createdAt: string;
}

export type SeatingArea = 'lounge' | 'main' | 'roastery' | 'patio';

export interface Reservation {
  id: string;
  code: string;
  guestName: string;
  email: string;
  phone: string;
  partySize: number;
  date: string;
  timeSlot: string;
  seatingArea: SeatingArea;
  specialRequests?: string;
  status: 'confirmed' | 'seated' | 'cancelled';
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: 'interior' | 'roastery' | 'coffee' | 'food' | 'outdoor';
  image: string;
  relatedMenuItemId?: string;
}
