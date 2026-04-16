'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCartStore, parsePrice, ONLINE_DISCOUNT } from '@/store/cart';
import { getSiteConfig } from '@/config/sites';
import { useTranslations } from 'next-intl';

const { currency } = getSiteConfig();

function formatPrice(amount: number): string {
  if (currency === 'EUR') {
    return `€${amount.toFixed(2).replace('.', ',')}`;
  }
  return `${amount.toFixed(2).replace('.', ',')} zł`;
}

// — Testowe dane szczegółów dania — zastąpić prawdziwymi z menu.json
const TEST_DETAIL = {
  image: '/images/bear-fresh.webp',
  description:
    'Klasyczny schabowy smażony na maśle klarowanym, podawany z puszystymi kopytkami i zasmażaną kapustą z kminkiem. Tak jak u babci — bez żadnych skrótów ani półproduktów.',
  ingredients:
    'wieprzowina 93%, mąka pszenna, jajko, bułka tarta, masło klarowane, kapusta biała, cebula, kminek, sól, pieprz czarny',
  weight: '450 g',
  storage: 'Przechowywać w lodówce w temperaturze od 2°C do 6°C.',
  macros: [
    { label: 'Kcal', value: '680' },
    { label: 'Białko', value: '42 g' },
    { label: 'Węglowodany', value: '58 g' },
    { label: 'Tłuszcze', value: '28 g' },
  ],
  allergens: ['Gluten', 'Jaja', 'Mleko'],
  reheat:
    'Mikrofala: 3–4 min w 800W pod przykryciem, na końcu 30 sek bez przykrycia żeby kopytka trochę obeschły. Piekarnik: 180°C przez 12 min — schab wyjdzie chrupiący jak świeżo usmażony.',
};

interface DishModalProps {
  id: string;
  name: string;
  category: string;
  priceStr: string;
  date: string;
  onClose: () => void;
}

export default function DishModal({ id, name, category, priceStr, date, onClose }: DishModalProps) {
  const t = useTranslations('menu');
  const { items, addItem, updateQuantity } = useCartStore();

  const originalPrice = parsePrice(priceStr);
  const discountedPrice = parseFloat((originalPrice * (1 - ONLINE_DISCOUNT)).toFixed(2));
  const cartItem = items.find((i) => i.id === id && i.date === date);
  const inCart = !!cartItem;
  const [isClosing, setIsClosing] = useState(false);

  // Zablokuj scroll body gdy modal otwarty
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 320);
  };

  const handleAdd = () => {
    addItem({ id, name, category, originalPrice, date });
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
      />

      {/* Sheet */}
      <div className={`relative w-full max-w-2xl max-h-[92dvh] flex flex-col rounded-t-3xl bg-[#FDF6EC] overflow-hidden shadow-2xl ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}>

        {/* Image */}
        <div className="relative flex-shrink-0 h-52 bg-[#1B4332]/10">
          <img
            src={TEST_DETAIL.image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Drag handle */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/60" />
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-5">

          {/* Header */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#ed8788] mb-1">{category}</p>
            <h2 className="font-heading font-black text-2xl leading-tight text-[#1B4332]">{name}</h2>
            <div className="mt-2 flex items-center gap-2.5">
              <span className="text-xl font-extrabold text-[#ed8788]">
                {formatPrice(discountedPrice)}
              </span>

            </div>
          </div>

          {/* Opis */}
          <p className="text-sm leading-relaxed text-[#1B4332]/80">{TEST_DETAIL.description}</p>

          {/* Waga */}
          <section>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-[#1B4332] mb-1.5">
              {t('weight')}
            </h3>
            <p className="text-sm text-[#1B4332]/80 leading-relaxed font-semibold">{TEST_DETAIL.weight}</p>
          </section>

          {/* Skład */}
          <section>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-[#1B4332] mb-1.5">
              {t('ingredients')}
            </h3>
            <p className="text-sm text-[#1B4332]/70 leading-relaxed">{TEST_DETAIL.ingredients}</p>
          </section>

          {/* Makro */}
          <section>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-[#1B4332] mb-2">
              {t('nutrition')}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {TEST_DETAIL.macros.map((m) => (
                <div key={m.label} className="rounded-2xl bg-white border border-[#1B4332]/10 p-3 text-center">
                  <p className="font-extrabold text-base text-[#1B4332]">{m.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#1B4332]/50 mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Alergeny */}
          <section>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-[#1B4332] mb-2">
              {t('allergens')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {TEST_DETAIL.allergens.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-[#ed8788]/40 bg-[#ed8788]/10 px-3 py-1 text-xs font-semibold text-[#ed8788]"
                >
                  {a}
                </span>
              ))}
            </div>
          </section>

          {/* Podgrzanie */}
          <section>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-[#1B4332] mb-1.5">
              {t('reheat')}
            </h3>
            <div className="rounded-2xl bg-[#1B4332]/5 px-4 py-3">
              <p className="text-sm text-[#1B4332]/80 leading-relaxed">{TEST_DETAIL.reheat}</p>
            </div>
          </section>

          {/* Przechowywanie */}
          <section className="pb-2">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-[#1B4332] mb-1.5">
              {t('storage')}
            </h3>
            <div className="rounded-2xl bg-[#1B4332]/5 px-4 py-3">
              <p className="text-sm text-[#1B4332]/80 leading-relaxed">{TEST_DETAIL.storage}</p>
            </div>
          </section>
        </div>

        {/* Sticky bottom CTA */}
        <div className="flex-shrink-0 px-5 py-4 bg-[#FDF6EC] border-t border-[#1B4332]/10">
          {inCart ? (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(id, date, cartItem!.quantity - 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1B4332]/10 text-[#1B4332] text-xl font-bold transition-colors hover:bg-[#1B4332]/20 active:scale-95"
                >
                  −
                </button>
                <span className="min-w-[2ch] text-center text-xl font-extrabold text-[#1B4332]">
                  {cartItem!.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(id, date, cartItem!.quantity + 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1B4332] text-white text-xl font-bold transition-colors hover:bg-[#2d5a2d] active:scale-95"
                >
                  +
                </button>
              </div>
              <span className="font-extrabold text-lg text-[#1B4332]">
                {formatPrice(discountedPrice * cartItem!.quantity)}
              </span>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="w-full rounded-2xl py-3.5 font-bold text-base bg-[#1B4332] text-white hover:bg-[#2d5a2d] transition-all active:scale-[0.98]"
            >
              + {t('addToCart')} — {formatPrice(discountedPrice)}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
