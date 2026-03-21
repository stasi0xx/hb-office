'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Leaf, ChefHat, Package, Truck, LucideIcon } from 'lucide-react';

const steps: {
  number: string;
  titleKey: 'step1Title' | 'step2Title' | 'step3Title' | 'step4Title' | 'step5Title';
  descKey: 'step1Desc' | 'step2Desc' | 'step3Desc' | 'step4Desc' | 'step5Desc';
  Icon: LucideIcon;
  rotation: number;
  tapeColor: string;
}[] = [
  {
    number: '01',
    titleKey: 'step1Title',
    descKey: 'step1Desc',
    Icon: ShoppingCart,
    rotation: -2,
    tapeColor: '#E8927C',
  },
  {
    number: '02',
    titleKey: 'step2Title',
    descKey: 'step2Desc',
    Icon: Leaf,
    rotation: 1.5,
    tapeColor: '#52B788',
  },
  {
    number: '03',
    titleKey: 'step3Title',
    descKey: 'step3Desc',
    Icon: ChefHat,
    rotation: -1,
    tapeColor: '#E8927C',
  },
  {
    number: '04',
    titleKey: 'step4Title',
    descKey: 'step4Desc',
    Icon: Package,
    rotation: 2,
    tapeColor: '#D4A017',
  },
  {
    number: '05',
    titleKey: 'step5Title',
    descKey: 'step5Desc',
    Icon: Truck,
    rotation: -1.5,
    tapeColor: '#52B788',
  },
];

// px of scroll between each new card starting to slide in
const SCROLL_PER_CARD = 300;
// px of scroll to complete one card's slide-in
const SLIDE_DURATION = 200;
// px of previous card still visible under the new one
const CARD_PEEK = 16;
// px of rest at the end so all cards are visible before leaving the section
const END_BUFFER = 600;

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!section || !cards.length) return;

    // Cards 1–4 start below the visible area — hidden by overflow:hidden on the container
    gsap.set(cards.slice(1), { y: '100vh' });

    // Each card slides up and stays permanently — no unsticking
    cards.slice(1).forEach((card, idx) => {
      gsap.to(card, {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: `top+=${idx * SCROLL_PER_CARD} top`,
          end: `top+=${idx * SCROLL_PER_CARD + SLIDE_DURATION} top`,
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const sectionHeight = (steps.length - 1) * SCROLL_PER_CARD + SLIDE_DURATION + END_BUFFER;

  return (
    <section
      ref={sectionRef}
      className="bg-[#1B4332]"
      style={{ height: `${sectionHeight}px` }}
    >
      {/* Single sticky container — stays on screen for the entire section scroll */}
      <div className="sticky top-0 h-screen flex flex-col">

        {/* Section header */}
        <div className="flex-shrink-0 px-6 pt-16 pb-6 text-center text-[#FDF6EC]">
          <p className="mb-2 mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#E8927C]">
            <img src="/images/logo.webp" alt="" className="inline-block h-4 w-auto mr-1 align-middle" /> {t('eyebrow')}
          </p>
          <h2 className="font-heading font-black text-4xl md:text-5xl mb-2">
            {t('title')}
          </h2>
          <p className="text-[#FDF6EC]/50 text-sm">{t('subtitle')}</p>
        </div>

        {/* Card stack — overflow:hidden hides cards at y:100vh before they animate in */}
        <div className="relative flex-1 overflow-hidden">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el; }}
              className="absolute inset-x-0 top-0 flex justify-center px-6"
              style={{
                zIndex: i + 1,
                paddingTop: `${i * CARD_PEEK}px`,
              }}
            >
              {/* Rotated note */}
              <div
                className="w-full max-w-sm"
                style={{ transform: `rotate(${step.rotation}deg)`, transformOrigin: 'top center' }}
              >
                {/* Tape strip */}
                <div
                  className="mx-auto w-14 h-5 rounded-[2px]"
                  style={{
                    backgroundColor: step.tapeColor,
                    opacity: 0.85,
                    position: 'relative',
                    zIndex: 1,
                    marginBottom: '-10px',
                  }}
                />

                {/* Note card */}
                <div
                  className="rounded-sm bg-[#FDF6EC] px-7 pt-6 pb-6"
                  style={{ boxShadow: '0 25px 70px rgba(0,0,0,0.45)' }}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span
                      className="font-heading font-black leading-none select-none"
                      style={{ fontSize: '4.5rem', color: '#1B4332', opacity: 0.07 }}
                    >
                      {step.number}
                    </span>
                    <step.Icon size={32} className="mt-2 text-[#1B4332]" />
                  </div>

                  <h3 className="font-heading font-black text-xl text-[#1B4332] mb-2 -mt-6">
                    {t(step.titleKey)}
                  </h3>

                  <p className="text-[#1B4332]/65 text-sm leading-relaxed">
                    {t(step.descKey)}
                  </p>

                  <div className="mt-4 flex justify-end">
                    <img src="/images/logo.webp" alt="" className="h-10 w-auto" style={{ opacity: 0.15, filter: 'saturate(0)' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
