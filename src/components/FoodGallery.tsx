'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCartStore } from '@/store/cart';

gsap.registerPlugin(ScrollTrigger);

// ← Podmień na swoje zdjęcia (8 = optymalna liczba kart)
const PHOTOS = [
  { src: '/images/food-1.webp', i: 0, tags: ['daily', 'meat'] as const },
  { src: '/images/food-2.webp', i: 1, tags: ['daily', 'meat'] as const },
  { src: '/images/food-3.webp', i: 2, tags: ['daily', 'veg'] as const },
  { src: '/images/food-4.webp', i: 3, tags: ['daily', 'meat'] as const },
  { src: '/images/food-5.webp', i: 4, tags: ['daily', 'veg'] as const },
  { src: '/images/food-6.webp', i: 5, tags: ['daily', 'veg'] as const },
  { src: '/images/food-7.webp', i: 6, tags: ['daily', 'veg'] as const },
  { src: '/images/food-8.webp', i: 7, tags: ['daily', 'veg'] as const },
];

// Finalne obroty i przesunięcia każdej karty — "rozrzucone na stole"
const CARD_PROPS = [
  { rotation: -6, y: 8 },
  { rotation: 4, y: -12 },
  { rotation: -2, y: 5 },
  { rotation: 7, y: -8 },
  { rotation: -4, y: 15 },
  { rotation: 5, y: -5 },
  { rotation: -8, y: 10 },
  { rotation: 3, y: -10 },
];

type Photo = (typeof PHOTOS)[number];
const TAG_KEYS = { daily: 'tagDaily', meat: 'tagMeat', veg: 'tagVeg' } as const;

export default function FoodGallery() {
  const t = useTranslations('gallery');
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const { itemCount } = useCartStore();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const cartItemCount = hasMounted ? itemCount() : 0;

  // --- Section visibility (floating button) ---
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // --- Scroll animations ---
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 28, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
          }
        );
      }

      gsap.set(cards, {
        y: 90, opacity: 0, scale: 0.72,
        rotation: (i) => CARD_PROPS[i % CARD_PROPS.length].rotation * 2.8,
      });

      gsap.to(cards, {
        y: (i) => CARD_PROPS[i % CARD_PROPS.length].y,
        opacity: 1, scale: 1,
        rotation: (i) => CARD_PROPS[i % CARD_PROPS.length].rotation,
        stagger: 0.09, duration: 0.7, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
      });

      cards.forEach((card, i) => {
        const { rotation: origRotation, y: origY } = CARD_PROPS[i % CARD_PROPS.length];
        card.addEventListener('mouseenter', () => {
          gsap.killTweensOf(card, 'zIndex');
          gsap.to(card, { rotation: 0, scale: 1.09, y: origY - 16, zIndex: 20, duration: 0.28, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotation: origRotation, scale: 1, y: origY, duration: 0.55, ease: 'elastic.out(1, 0.65)' });
          gsap.set(card, { zIndex: 1, delay: 0.55 });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // --- Modal open animation ---
  useEffect(() => {
    if (!isModalVisible) return;
    document.body.style.overflow = 'hidden';

    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: 'power2.out' });
    }
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.86, opacity: 0, y: 28 },
        { scale: 1, opacity: 1, y: 0, duration: 0.46, ease: 'back.out(1.25)' }
      );
    }

    return () => { document.body.style.overflow = ''; };
  }, [isModalVisible]);

  // --- Escape key ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    if (!modalRef.current || !overlayRef.current) return;
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' });
    gsap.to(modalRef.current, {
      scale: 0.88, opacity: 0, y: 18, duration: 0.22, ease: 'power2.in',
      onComplete: () => {
        setIsModalVisible(false);
        setSelectedPhoto(null);
      },
    });
  };

  const scrollToMenu = () => {
    closeModal();
    setTimeout(() => {
      const el = document.getElementById('menu-section');
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
    }, 280);
  };

  return (
    <>
      <section ref={sectionRef} className="bg-[#1B4332] px-5 py-16 sm:py-20 overflow-hidden">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 sm:mb-16 opacity-0">
          <span className="inline-block mb-3 px-4 py-1.5 rounded-full border border-[#ed8788]/40 text-[#ed8788] text-xs font-bold uppercase tracking-widest">
            {t('eyebrow')}
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl leading-[1.1] text-[#FDF6EC]">
            {t('titleStart')}{' '}
            <span className="text-[#ed8788] italic">{t('titleHighlight')}</span>
          </h2>
          <p className="mt-3 text-[#FDF6EC]/50 text-sm sm:text-base font-medium max-w-sm mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Siatka kart */}
        <div className="mx-auto w-full max-w-[1600px] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 relative px-2 sm:px-4 lg:px-8">
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="relative cursor-pointer"
              style={{ willChange: 'transform' }}
              onClick={() => openModal(photo)}
            >
              <div className="bg-white p-2.5 sm:p-3 md:p-4 lg:p-5 pb-9 sm:pb-12 md:pb-14 lg:pb-16 xl:pb-20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] select-none">
                <div className="aspect-square relative overflow-hidden bg-[#e8e0d5]">
                  <Image
                    src={photo.src}
                    alt={t(`photo${photo.i}Label`)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 20vw"
                  />
                </div>
                <p className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-5 left-0 right-0 text-center text-[11px] sm:text-xs md:text-sm lg:text-base font-bold text-[#1B4332]/70 tracking-wide px-2 truncate">
                  {t(`photo${photo.i}Label`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating CTA */}
      <div
        className={`fixed bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ease-out ${sectionVisible && !isModalVisible && cartItemCount === 0
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
      >
        <a
          href="#menu-section"
          className="group flex items-center justify-center gap-2 sm:gap-3 bg-[#ed8788] hover:bg-[#e07d65] text-white font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.3)] md:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all"
        >
          {t('modalCta')}
          <span className="text-base sm:text-lg md:text-xl transition-transform group-hover:translate-x-1 duration-300">→</span>
        </a>
      </div>

      {/* Modal */}
      {isModalVisible && selectedPhoto && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: 'rgba(10, 28, 18, 0.85)', backdropFilter: 'blur(6px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            ref={modalRef}
            className="bg-white w-full max-w-sm sm:max-w-md relative overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
          >
            {/* Przycisk zamknij */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors rounded-full text-white text-lg leading-none"
              aria-label="Zamknij"
            >
              ×
            </button>

            {/* Zdjęcie */}
            <div className="aspect-[4/3] relative overflow-hidden bg-[#e8e0d5]">
              <Image
                src={selectedPhoto.src}
                alt={t(`photo${selectedPhoto.i}Label`)}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 90vw, 448px"
                priority
              />
            </div>

            {/* Treść */}
            <div className="px-6 pt-5 pb-6">
              {/* Tagi */}
              <div className="flex gap-1.5 mb-3 flex-wrap">
                {selectedPhoto.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#1B4332]/8 text-[#1B4332]/60 border border-[#1B4332]/12"
                  >
                    {t(TAG_KEYS[tag])}
                  </span>
                ))}
              </div>

              {/* Nazwa */}
              <h3 className="font-heading font-black text-2xl text-[#1B4332] leading-tight mb-2">
                {t(`photo${selectedPhoto.i}Label`)}
              </h3>

              {/* Opis */}
              <p className="text-sm text-[#1B4332]/65 leading-relaxed mb-5">
                {t(`photo${selectedPhoto.i}Desc`)}
              </p>

              {/* CTA */}
              <button
                onClick={scrollToMenu}
                className="w-full bg-[#ed8788] hover:bg-[#e07d65] active:scale-[0.98] transition-all text-white font-heading font-extrabold text-base py-3.5 rounded-none shadow-md"
              >
                {t('modalCta')} →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
