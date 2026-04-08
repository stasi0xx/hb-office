'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ShoppingBag, Check, Package, Clock } from 'lucide-react';
import { filterMigrantMenu, formatWindowDeadline } from '@/lib/migrant-delivery';
import { slugify } from '@/lib/utils';
import CategoryIcon from '@/components/CategoryIcon';
import { parsePrice } from '@/store/cart';
import MigrantDishCard from './MigrantDishCard';

type CategoryData = { nazwa: string; name_translations?: Record<string, string>; cena: string; is_vege?: boolean; is_spicy?: boolean }[];
type MenuData = Record<string, Record<string, CategoryData>>;

export interface SelectedMeal {
  id: string;
  name: string;
  category: string;
  originalPrice: number;
  date: string;
  quantity: number;
}

interface MigrantPackageBuilderProps {
  menuData: MenuData;
  packageSize: 3 | 6;
  slotLabel: string;
  slotDeadline?: Date;
  onChangeSlot: () => void;
  onConfirm: (selectedMeals: SelectedMeal[]) => void;
  onCancel: () => void;
}

const ALLOWED_CATEGORIES = ['obiady', 'zupy']; // lowercase match

const isSoupCategory = (catName: string) => catName.toLowerCase().includes('zupy');

export default function MigrantPackageBuilder({
  menuData,
  packageSize,
  slotLabel,
  slotDeadline,
  onChangeSlot,
  onConfirm,
  onCancel,
}: MigrantPackageBuilderProps) {
  const tCat = useTranslations('categories');
  const tm = useTranslations('migrant');
  const locale = useLocale();

  const filteredMenu = useMemo(() => filterMigrantMenu(menuData), [menuData]);

  // Flatten into unique dishes per allowed category only
  const flatCategories = useMemo(() => {
    const cats: Record<string, SelectedMeal[]> = {};
    for (const [date, categoriesObj] of Object.entries(filteredMenu)) {
      for (const [catName, dishes] of Object.entries(categoriesObj)) {
        if (!ALLOWED_CATEGORIES.some(a => catName.toLowerCase().includes(a))) continue;
        if (!cats[catName]) cats[catName] = [];
        for (const dish of dishes) {
          const localizedName = dish.name_translations?.[locale] || dish.name_translations?.['en'] || dish.nazwa;
          if (!cats[catName].find(d => d.name === localizedName)) {
            cats[catName].push({
              id: `${slugify(date)}-${slugify(catName)}-${slugify(dish.nazwa)}`,
              name: localizedName,
              category: catName,
              originalPrice: parsePrice(dish.cena),
              date,
              quantity: 0,
            });
          }
        }
      }
    }
    return cats;
  }, [filteredMenu]);

  const categoryKeys = Object.keys(flatCategories);

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(categoryKeys.map(k => [k, true]))
  );
  const [selections, setSelections] = useState<Record<string, SelectedMeal>>({});

  const soupSelected = Object.values(selections)
    .filter(m => isSoupCategory(m.category))
    .reduce((acc, m) => acc + m.quantity, 0);
  const mainSelected = Object.values(selections)
    .filter(m => !isSoupCategory(m.category))
    .reduce((acc, m) => acc + m.quantity, 0);
  const isComplete = soupSelected === packageSize && mainSelected === packageSize;

  useEffect(() => {
    if (soupSelected >= packageSize) {
      setOpenCategories(prev => {
        const next = { ...prev };
        for (const k of Object.keys(next)) {
          if (isSoupCategory(k)) next[k] = false;
        }
        return next;
      });
    }
  }, [soupSelected, packageSize]);

  useEffect(() => {
    if (mainSelected >= packageSize) {
      setOpenCategories(prev => {
        const next = { ...prev };
        for (const k of Object.keys(next)) {
          if (!isSoupCategory(k)) next[k] = false;
        }
        return next;
      });
    }
  }, [mainSelected, packageSize]);

  const handleAdd = (dish: SelectedMeal) => {
    const categoryCount = isSoupCategory(dish.category) ? soupSelected : mainSelected;
    if (categoryCount >= packageSize) return;
    setSelections(prev => {
      const existing = prev[dish.id];
      if (existing) return { ...prev, [dish.id]: { ...existing, quantity: existing.quantity + 1 } };
      return { ...prev, [dish.id]: { ...dish, quantity: 1 } };
    });
  };

  const handleRemove = (dishId: string) => {
    setSelections(prev => {
      const existing = prev[dishId];
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        const next = { ...prev };
        delete next[dishId];
        return next;
      }
      return { ...prev, [dishId]: { ...existing, quantity: existing.quantity - 1 } };
    });
  };

  const handleConfirm = () => {
    if (isComplete) onConfirm(Object.values(selections));
  };

  return (
    <div className="bg-[#FDF6EC] min-h-[50vh] pb-32">
      {/* Sticky Progress Bar */}
      <div className="sticky top-16 z-30 bg-[#1B4332] shadow-md">
        <div className="px-4 py-4 md:px-8 grid grid-cols-2 md:grid-cols-3 items-center">
          {/* Left: counters */}
          <div className="flex items-center gap-5">
            <div className="flex flex-col">
              <span className="text-[#E8927C] text-[10px] font-bold uppercase tracking-widest">
                {tCat('Zupy')}
              </span>
              <span className="text-white font-heading font-black text-xl leading-none mt-0.5">
                {soupSelected} <span className="text-white/40 font-semibold text-sm">/ {packageSize}</span>
              </span>
              <div className="flex gap-1 mt-1.5">
                {Array.from({ length: packageSize }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-3 rounded-full transition-colors ${i < soupSelected ? 'bg-[#E8927C]' : 'bg-white/25'}`}
                  />
                ))}
              </div>
            </div>

            <div className="w-px h-10 bg-white/20" />

            <div className="flex flex-col">
              <span className="text-[#E8927C] text-[10px] font-bold uppercase tracking-widest">
                {tCat('Obiady')}
              </span>
              <span className="text-white font-heading font-black text-xl leading-none mt-0.5">
                {mainSelected} <span className="text-white/40 font-semibold text-sm">/ {packageSize}</span>
              </span>
              <div className="flex gap-1 mt-1.5">
                {Array.from({ length: packageSize }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-3 rounded-full transition-colors ${i < mainSelected ? 'bg-[#E8927C]' : 'bg-white/25'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Center: box summary (desktop only) */}
          <div className="hidden md:flex flex-col items-center gap-1 text-center">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-[#E8927C] flex-shrink-0" />
              <span className="text-white font-bold text-sm leading-tight">
                {packageSize === 3 ? tm('package3days') : tm('package6days')}
                {' · '}
                {slotLabel}
              </span>
            </div>
            {slotDeadline && (
              <div className="flex items-center gap-1 text-[#E8927C]">
                <Clock className="h-3 w-3 flex-shrink-0" />
                <span className="text-[10px] font-semibold">
                  {tm('deadlineLabel')}: {formatWindowDeadline(slotDeadline)}
                </span>
              </div>
            )}
            <button
              onClick={onChangeSlot}
              className="text-[10px] text-white/40 hover:text-white/80 transition-colors"
            >
              {tm('changePackage')}
            </button>
          </div>

          {/* Right: buttons */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex md:flex-row md:gap-3 flex-col-reverse items-end gap-1">
              <button
                onClick={onCancel}
                className="text-xs font-semibold text-white/50 hover:text-white transition-colors md:px-4 md:py-2 md:text-sm"
              >
                {tm('cancel')}
              </button>
              <button
                onClick={handleConfirm}
                disabled={!isComplete}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-bold transition-all ${
                  isComplete
                    ? 'bg-[#E8967A] text-white shadow-lg hover:scale-105 active:scale-95'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                }`}
              >
                {isComplete ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
                {tm('confirmPackage')}
              </button>
            </div>
          </div>
        </div>

      </div>

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8 pt-4">
        <div className="flex flex-col gap-3">
          {categoryKeys.map(category => {
            const dishes = flatCategories[category];
            const localizedCategory = tCat(category as Parameters<typeof tCat>[0]);
            const isOpen = openCategories[category] ?? true;

            return (
              <div
                id={`migrant-cat-${category}`}
                key={category}
                className="rounded-2xl bg-[#FDF6EC] overflow-hidden border border-[#1C3D1C]/10"
              >
                {/* Category Header */}
                <button
                  onClick={() => setOpenCategories(prev => ({ ...prev, [category]: !isOpen }))}
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-[#1C3D1C]/5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1C3D1C] text-[#E8967A]">
                      <CategoryIcon category={category} className="h-4 w-4" />
                    </span>
                    <span className="font-heading font-bold text-lg text-[#1C3D1C]">{localizedCategory}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#1C3D1C]/50">{dishes.length}</span>
                    <svg
                      className={`h-5 w-5 text-[#1C3D1C]/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Dish Grid */}
                {isOpen && (
                  <div className="px-3 md:px-4 pb-3 md:pb-4 pt-1 grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                    {dishes.map(dish => (
                      <MigrantDishCard
                        key={dish.id}
                        name={dish.name}
                        category={dish.category}
                        quantity={selections[dish.id]?.quantity ?? 0}
                        canAdd={isSoupCategory(dish.category) ? soupSelected < packageSize : mainSelected < packageSize}
                        onAdd={() => handleAdd(dish)}
                        onRemove={() => handleRemove(dish.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
