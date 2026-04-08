'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getSiteConfig } from '../config/sites';

export const ONLINE_DISCOUNT = getSiteConfig().onlineDiscount;

/**
 * Package-level metadata set by the migrant ordering flow.
 * Stores actual Trunkrs delivery event dates (not eating days).
 */
export interface PackageMeta {
  /** ISO strings of the physical Trunkrs delivery event Date objects */
  deliveryEventDates: string[];
  /** Package size: 3 or 6 eating days */
  eatingDays: number;
}

export interface CartItem {
  id: string;
  name: string;
  category: string;
  originalPrice: number;
  price: number; // after discount
  date: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  /** Set by migrant flow — stores actual Trunkrs delivery event dates */
  packageMeta: PackageMeta | null;
  setPackageMeta: (meta: PackageMeta | null) => void;
  addItem: (item: Omit<CartItem, 'quantity' | 'price'>) => void;
  removeItem: (id: string, date: string) => void;
  updateQuantity: (id: string, date: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: () => number;
  originalTotal: () => number;
  savings: () => number;
  itemCount: () => number;
  hasDrink: () => boolean;
  /** Delivery cost based on site config (0 for free delivery). */
  deliveryCost: () => number;
  /** Items total + delivery cost. */
  grandTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      packageMeta: null,

      setPackageMeta: (meta) => set({ packageMeta: meta }),

      addItem: (newItem) => {
        const discountedPrice = parseFloat(
          (newItem.originalPrice * (1 - ONLINE_DISCOUNT)).toFixed(2)
        );
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === newItem.id && i.date === newItem.date
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === newItem.id && i.date === newItem.date
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, { ...newItem, price: discountedPrice, quantity: 1 }],
          };
        });
      },

      removeItem: (id, date) => {
        set((state) => ({
          items: state.items.filter((i) => !(i.id === id && i.date === date)),
        }));
      },

      updateQuantity: (id, date, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, date);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.date === date ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [], packageMeta: null }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      total: () => {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      },

      originalTotal: () => {
        return get().items.reduce((sum, i) => sum + i.originalPrice * i.quantity, 0);
      },

      savings: () => {
        return get().items.reduce(
          (sum, i) => sum + (i.originalPrice - i.price) * i.quantity,
          0
        );
      },

      itemCount: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },

      hasDrink: () => {
        const drinkKeywords = ['smoothie', 'sok', 'napój', 'drink', 'juice'];
        return get().items.some((i) => {
          const nameLower = i.name.toLowerCase();
          const catLower = i.category.toLowerCase();
          return (
            catLower.includes('napoje') ||
            catLower.includes('desery') ||
            drinkKeywords.some((kw) => nameLower.includes(kw))
          );
        });
      },

      deliveryCost: () => {
        const items = get().items;
        if (items.length === 0) return 0;
        const { delivery } = getSiteConfig();
        if (delivery.type === 'free') return 0;
        if (delivery.type === 'per-order') return delivery.costPerOrder ?? 0;
        if (delivery.type === 'per-day') {
          const uniqueDates = new Set(items.map((i) => i.date)).size;
          return uniqueDates * (delivery.costPerDay ?? 0);
        }
        return 0;
      },

      grandTotal: () => get().total() + get().deliveryCost(),
    }),
    {
      name: 'gn-cart',
    }
  )
);

export function parsePrice(priceStr: string): number {
  const cleaned = priceStr
    .replace(/\s*zł/g, '')
    .replace(/\s/g, '')
    .replace(',', '.');
  return parseFloat(cleaned) || 0;
}
