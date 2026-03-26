'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useCartStore } from '@/store/cart';
import { parseMenuDate } from '@/lib/utils';

const POLISH_CITIES = [
  'Warszawa',
  'Kraków',
  'Wrocław',
  'Poznań',
  'Gdańsk',
  'Łódź',
  'Katowice',
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  street: string;
  city: string;
  floorRoom: string;
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CheckoutForm() {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const { items, total, clearCart } = useCartStore();

  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    street: '',
    city: '',
    floorRoom: '',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const totalAmount = total();

  const deliveryDates = [...new Set(items.map((i) => i.date))].sort((a, b) => {
    const da = parseMenuDate(a).getTime();
    const db = parseMenuDate(b).getTime();
    return da - db;
  });

  const formatDate = (dateStr: string) => {
    const d = parseMenuDate(dateStr);
    return d.toLocaleDateString(locale === 'pl' ? 'pl-PL' : 'en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = t('requiredField');
    if (!form.lastName.trim()) newErrors.lastName = t('requiredField');
    if (!form.email.trim()) {
      newErrors.email = t('requiredField');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t('invalidEmail');
    }
    if (!form.phone.trim()) {
      newErrors.phone = t('requiredField');
    } else if (!/^[\d\s\+\-\(\)]{7,}$/.test(form.phone)) {
      newErrors.phone = t('invalidPhone');
    }
    if (!form.companyName.trim()) newErrors.companyName = t('requiredField');
    if (!form.street.trim()) newErrors.street = t('requiredField');
    if (!form.city.trim()) newErrors.city = t('requiredField');
    if (form.floorRoom.trim() && /\d{2}-\d{3}/.test(form.floorRoom.trim())) {
      newErrors.floorRoom = t('invalidFloorRoom') || 'Wpisz piętro/pokój, nie kod pocztowy';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    try {
      // Validate address with Nominatim OpenStreetMap (safe try-catch)
      try {
        const cleanStreet = form.street
          .replace(/^(ul\.|ulica|ul|al\.|aleja|al|pl\.|plac|pl)\s+/i, '')
          .replace(/\s*\d+.*$/, '')
          .trim();

        const nomRes = await fetch(
          `https://nominatim.openstreetmap.org/search?street=${encodeURIComponent(
            cleanStreet
          )}&city=${encodeURIComponent(form.city)}&format=json&addressdetails=1&countrycodes=pl`,
          { headers: { 'User-Agent': 'Glodny-Niedzwiedz-App/1.0' } }
        );
        
        if (nomRes.ok) {
          const nomData = await nomRes.json();
          if (!nomData || nomData.length === 0) {
            setErrors((prev) => ({ ...prev, street: t('invalidStreetForCity') }));
            setIsLoading(false);
            return; // Block submission
          }
        }
      } catch (err) {
        console.error('Address validation failed:', err);
        // Proceed with order if validation API fails
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            category: item.category,
            price: item.price,
            date: item.date,
            quantity: item.quantity,
          })),
          customer: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            companyName: form.companyName,
            address: form.street,
            city: form.city,
            floorRoom: form.floorRoom,
            notes: form.notes,
          },
          paymentMethod: 'stripe',
          deliveryDates,
          locale,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (data.url) {
        clearCart();
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Error processing order');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border-2 px-4 py-3 text-sm font-600 text-[#1C3D1C] placeholder-[#1C3D1C]/30 outline-none transition-all focus:border-[#1C3D1C] bg-white ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-[#1C3D1C]/20'
    }`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLElement;
    
    if (e.key === 'Enter') {
      if (target.tagName === 'TEXTAREA' || target.tagName === 'BUTTON' || target.tagName === 'SELECT') {
        return;
      }
      
      e.preventDefault();
      
      const form = e.currentTarget;
      const elements = Array.from(form.elements) as HTMLElement[];
      const focusable = elements.filter(
        (el) =>
          (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') &&
          !el.hasAttribute('disabled') &&
          (el as HTMLInputElement).type !== 'hidden'
      );
      
      const index = focusable.indexOf(target);
      if (index > -1 && index < focusable.length - 1) {
        focusable[index + 1].focus();
      } else {
        target.blur();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="flex flex-col gap-4">
      {/* Delivery section */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="font-heading text-xl text-[#1C3D1C] mb-4">{t('deliveryDetails')}</h2>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-700 text-[#1C3D1C]/70 uppercase tracking-wide">{t('firstName')}</label>
            <input
              type="text"
              className={inputClass('firstName')}
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              enterKeyHint="next"
              placeholder="Jan"
            />
            {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
          </div>
          <div>
            <label className="mb-1 block text-xs font-700 text-[#1C3D1C]/70 uppercase tracking-wide">{t('lastName')}</label>
            <input
              type="text"
              className={inputClass('lastName')}
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              enterKeyHint="next"
              placeholder="Kowalski"
            />
            {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
          </div>
        </div>

        <div className="mt-3">
          <label className="mb-1 block text-xs font-700 text-[#1C3D1C]/70 uppercase tracking-wide">{t('email')}</label>
          <input
            type="email"
            className={inputClass('email')}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            enterKeyHint="next"
            placeholder="jan@firma.pl"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div className="mt-3">
          <label className="mb-1 block text-xs font-700 text-[#1C3D1C]/70 uppercase tracking-wide">{t('phone')}</label>
          <input
            type="tel"
            className={inputClass('phone')}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            enterKeyHint="next"
            placeholder="+48 500 123 456"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>

        <div className="mt-3">
          <label className="mb-1 block text-xs font-700 text-[#1C3D1C]/70 uppercase tracking-wide">{t('companyName')}</label>
          <input
            type="text"
            className={inputClass('companyName')}
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            enterKeyHint="next"
            placeholder="Nazwa firmy sp. z o.o."
          />
          {errors.companyName && <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>}
        </div>

        <div className="mt-3">
          <label className="mb-1 block text-xs font-700 text-[#1C3D1C]/70 uppercase tracking-wide">{t('street')}</label>
          <input
            type="text"
            className={inputClass('street')}
            value={form.street}
            onChange={(e) => setForm({ ...form, street: e.target.value })}
            enterKeyHint="next"
            placeholder="ul. Marszałkowska 1/10"
          />
          {errors.street && <p className="mt-1 text-xs text-red-500">{errors.street}</p>}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="relative">
            <label className="mb-1 block text-xs font-700 text-[#1C3D1C]/70 uppercase tracking-wide">{t('city')}</label>
            <input
              type="text"
              className={inputClass('city')}
              value={form.city}
              onChange={(e) => {
                setForm({ ...form, city: e.target.value });
                setIsCityDropdownOpen(true);
              }}
              onFocus={() => setIsCityDropdownOpen(true)}
              onBlur={() => setTimeout(() => setIsCityDropdownOpen(false), 200)}
              enterKeyHint="next"
              autoComplete="address-level2"
              placeholder={locale === 'pl' ? 'Wpisz miasto' : 'Enter city'}
            />
            {isCityDropdownOpen && form.city.length > 0 && (
              <div className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border-2 border-[#1C3D1C]/20 bg-white shadow-xl">
                {POLISH_CITIES.filter((city) =>
                  city.toLowerCase().includes(form.city.toLowerCase())
                ).length > 0 ? (
                  POLISH_CITIES.filter((city) =>
                    city.toLowerCase().includes(form.city.toLowerCase())
                  ).map((city) => (
                    <div
                      key={city}
                      className="cursor-pointer px-4 py-3 text-sm font-600 text-[#1C3D1C] transition-all hover:bg-[#E8967A] hover:text-white"
                      onClick={() => {
                        setForm({ ...form, city });
                        setIsCityDropdownOpen(false);
                      }}
                    >
                      {city}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm font-600 text-[#1C3D1C]/50">
                    {locale === 'pl' ? 'Brak wyników' : 'No results'}
                  </div>
                )}
              </div>
            )}
            {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
          </div>
          <div>
            <label className="mb-1 block text-xs font-700 text-[#1C3D1C]/70 uppercase tracking-wide">{t('floorRoom')}</label>
            <input
              type="text"
              className={inputClass('floorRoom')}
              value={form.floorRoom}
              onChange={(e) => setForm({ ...form, floorRoom: e.target.value })}
              enterKeyHint="next"
              autoComplete="off"
              placeholder="5 piętro, p. 512"
            />
            {errors.floorRoom && <p className="mt-1 text-xs text-red-500">{errors.floorRoom}</p>}
          </div>
        </div>

        <div className="mt-3">
          <label className="mb-1 block text-xs font-700 text-[#1C3D1C]/70 uppercase tracking-wide">{t('notes')}</label>
          <textarea
            className={inputClass('notes') + ' resize-none'}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder={locale === 'pl' ? 'Np. zadzwoń przed dostawą...' : 'E.g. call before delivery...'}
            rows={2}
          />
        </div>
      </div>

      {/* Delivery dates */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="font-heading text-xl text-[#1C3D1C] mb-3">{t('deliveryDates')}</h2>
        <div className="flex flex-col gap-2">
          {deliveryDates.map((date) => (
            <div
              key={date}
              className="flex items-center gap-3 rounded-xl bg-[#FDF6EC] px-4 py-3"
            >
              <svg className="h-5 w-5 flex-shrink-0 text-[#E8967A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <div>
                <p className="text-sm font-700 text-[#1C3D1C] capitalize">{formatDate(date)}</p>
                <p className="text-xs text-[#1C3D1C]/60">{t('deliveryWindow')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order summary */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="font-heading text-xl text-[#1C3D1C] mb-3">{t('orderSummary')}</h2>
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
          {items.map((item) => (
            <div key={`${item.id}-${item.date}`} className="flex items-center justify-between text-sm">
              <span className="text-[#1C3D1C]/80 flex-1 pr-2 leading-snug">{item.name}</span>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[#1C3D1C]/50">×{item.quantity}</span>
                <span className="font-700 text-[#1C3D1C]">
                  {(item.price * item.quantity).toFixed(2).replace('.', ',')} zł
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-[#1C3D1C]/10 pt-3">
          <span className="font-700 text-[#1C3D1C]">{t('total')}</span>
          <span className="font-heading text-2xl text-[#1C3D1C]">
            {totalAmount.toFixed(2).replace('.', ',')} zł
          </span>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading || items.length === 0}
        className="w-full rounded-2xl bg-[#E8967A] py-5 font-heading text-2xl text-white shadow-lg transition-all hover:bg-[#d4755a] active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {t('processing')}
          </span>
        ) : (
          `${t('placeOrder')} →`
        )}
      </button>
    </form>
  );
}
