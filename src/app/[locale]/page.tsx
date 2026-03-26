'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import MenuDayTabs from '@/components/MenuDayTabs';
import MenuCategory from '@/components/MenuCategory';
import CategoryIcon from '@/components/CategoryIcon';
import CartBar from '@/components/CartBar';
import CartDrawer from '@/components/CartDrawer';
import HeroSection from '@/components/HeroSection';
import TrustBar from '@/components/TrustBar';
import FoodGallery from '@/components/FoodGallery';
import HowItWorks from '@/components/HowItWorks';
import Differentiators from '@/components/Differentiators';
import FaqSection from '@/components/FaqSection';
import FooterSection from '@/components/FooterSection';
import SocialProof from '@/components/SocialProof';
import MenuParallaxBackground from '@/components/MenuParallaxBackground';
import { getAvailableDates } from '@/lib/utils';
import menuData from '@/data/menu.json';

type MenuData = typeof menuData;
type CategoryData = { nazwa: string; cena: string }[];

const MENU_DATES = Object.keys(menuData) as (keyof MenuData)[];

export default function HomePage() {
  const t = useTranslations('menu');
  const tCat = useTranslations('categories');
  const availableDates = getAvailableDates(MENU_DATES);
  const [selectedDate, setSelectedDate] = useState<string>(
    availableDates.length > 0 ? availableDates[0] : MENU_DATES[0]
  );
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initial: Record<string, boolean> = {};
    const dayMenu = menuData[selectedDate as keyof MenuData] as Record<string, CategoryData> | undefined;
    if (dayMenu) Object.keys(dayMenu).forEach(c => { initial[c] = true; });
    setOpenCategories(initial);
  }, [selectedDate]);

  const scrollToCategory = (category: string) => {
    setOpenCategories(prev => ({ ...prev, [category]: true }));
    setTimeout(() => {
      const el = document.getElementById(`category-${category}`);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 160;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 50);
  };

  const vanRef = useRef<HTMLDivElement>(null);
  const [vanVisible, setVanVisible] = useState(false);

  useEffect(() => {
    const el = vanRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVanVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dayMenu = menuData[selectedDate as keyof MenuData] as Record<string, CategoryData> | undefined;
  const categories = dayMenu ? Object.keys(dayMenu) : [];

  const filteredCategories = categories;
  const getdishes = (cat: string) => dayMenu?.[cat] ?? [];

  return (
    <div className="min-h-screen bg-[#FDF6EC]">
      {/* Spacer pod fixed header */}
      <div className="h-16" />

      {/* Hero → TrustBar → Differentiators */}
      <HeroSection />
      <TrustBar />
      <FoodGallery />
      <Differentiators />

      {/* Menu section */}
      <div id="menu-section" className="relative w-full">
        <MenuParallaxBackground />

        {/* Decorative background gradients for large screens */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="hidden lg:block absolute top-40 -left-[15%] w-[600px] h-[600px] bg-[#ed8788]/20 rounded-full blur-[120px]" />
          <div className="hidden lg:block absolute top-[30%] -right-[10%] w-[500px] h-[500px] bg-[#1B4332]/10 rounded-full blur-[100px]" />
          <div className="hidden lg:block absolute bottom-[20%] -left-[10%] w-[700px] h-[700px] bg-[#E8967A]/15 rounded-full blur-[120px]" />
          <div className="hidden lg:block absolute bottom-[5%] -right-[15%] w-[600px] h-[600px] bg-[#EAF0CE]/40 rounded-full blur-[100px]" />
        </div>

        {/* Order info bar */}
        <div className="bg-[#1B4332] overflow-x-hidden relative z-10">
          <div className="mx-auto max-w-2xl">
            {/* Bear delivery van — slides in from right when scrolled into view */}
            <div
              ref={vanRef}
              className={`transition-all duration-700 ease-out ${vanVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}
            >
              <img
                src="/images/bear-delivery.webp"
                alt=""
                className="w-full h-auto object-contain"
              />
            </div>
            {/* Text below */}
            <div className="px-5 pb-6 md:pb-8 text-center">
              <p className="font-heading font-black text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight text-white drop-shadow-sm">
                {t('deliveryWindow')}
              </p>
              <p className="text-sm md:text-base lg:text-lg text-[#ed8788] mt-1 md:mt-2 font-medium">
                {t('orderDeadline')}
              </p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8 relative z-10">
          {/* Day tabs + category shortcuts */}
          <div className="sticky top-16 z-20 bg-[#FDF6EC] pt-3 md:pt-4 lg:pt-5 pb-2 md:pb-3 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 shadow-sm">
            <MenuDayTabs
              dates={MENU_DATES}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
            {categories.length > 0 && (
              <div className="flex gap-2 mt-2 w-max mx-auto max-w-full overflow-x-auto scrollbar-hide px-1 pb-1">
                {categories.map((category) => {
                  const label = tCat(category as Parameters<typeof tCat>[0]);
                  const firstWord = label.split(' ')[0];
                  return (
                    <button
                      key={category}
                      onClick={() => scrollToCategory(category)}
                      className="flex-shrink-0 flex items-center gap-1.5 rounded-full bg-white border border-[#1B4332]/20 px-3 py-1 text-[#1B4332] transition-all hover:border-[#1B4332]/50 hover:shadow-sm active:scale-95"
                    >
                      <CategoryIcon category={category} className="h-3.5 w-3.5 text-[#ed8788]" />
                      <span className="text-[11px] font-semibold whitespace-nowrap">{firstWord}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="pb-32 pt-4">
            {availableDates.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-6xl mb-4">🐻</span>
                <p className="font-heading font-black text-2xl text-[#1B4332]">{t('noAvailableDays')}</p>
              </div>
            ) : dayMenu ? (
              <div className="flex flex-col gap-3">
                {filteredCategories.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <span className="text-5xl mb-3">🐻</span>
                    <p className="font-heading font-black text-lg text-[#1B4332]">Brak wyników</p>
                    <p className="text-sm text-[#1B4332]/50 mt-1">Spróbuj innej nazwy</p>
                  </div>
                ) : (
                  filteredCategories.map((category) => (
                    <MenuCategory
                      key={category}
                      category={category}
                      dishes={getdishes(category)}
                      date={selectedDate}
                      isOpen={openCategories[category] ?? true}
                      onToggle={() => setOpenCategories(prev => ({ ...prev, [category]: !(prev[category] ?? true) }))}
                    />
                  ))
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Below-menu sections */}
      <HowItWorks />
      <SocialProof />
      <FaqSection />
      <FooterSection />

      {/* Cart components */}
      <CartBar />
      <CartDrawer />
    </div>
  );
}
