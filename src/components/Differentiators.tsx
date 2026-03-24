'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

// Dodaj zdjęcia niedźwiedzi do public/images/:
//   bear-fresh.webp    — miś w kucharskiej czapce / z garnkiem
//   bear-inao.webp     — miś jako inspektor jakości / z lupą / w berecie
//   bear-choice.webp   — miś jako kelner / z tacą pełną różnych dań
const cards = [
  {
    image: '/images/bear-fresh.webp',
    titleKey: 'freshTitle' as const,
    descKey: 'freshDesc' as const,
    statKey: 'freshStat' as const,
    statLabelKey: 'freshStatLabel' as const,
    statColor: '#D4A017',
  },
  {
    image: '/images/bear-inao.webp',
    titleKey: 'inaoTitle' as const,
    descKey: 'inaoDesc' as const,
    statKey: 'inaoStat' as const,
    statLabelKey: 'inaoStatLabel' as const,
    statColor: '#2D6A4F',
    imageRight: true,
  },
  {
    image: '/images/bear-choices.webp',
    titleKey: 'noFakeTitle' as const,
    descKey: 'noFakeDesc' as const,
    statKey: 'noFakeStat' as const,
    statLabelKey: 'noFakeStatLabel' as const,
    statColor: '#ed8788',
  },
];

function AnimatedCard({
  card,
  index,
  t,
}: {
  card: (typeof cards)[number];
  index: number;
  t: ReturnType<typeof useTranslations<'differentiators'>>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 120}ms` }}
      className={`bg-[#FDF6EC] rounded-3xl px-6 sm:px-8 xl:px-10 pt-6 sm:pt-8 xl:pt-10 pb-0 shadow-sm hover:shadow-md overflow-hidden flex flex-col h-full transition-all duration-700 ease-out ${visible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-16'
        }`}
    >
      <div className="mb-4 lg:mb-6 flex-grow">
        <h3 className="font-heading font-black text-xl sm:text-2xl lg:text-[28px] text-[#1B4332] mb-2 sm:mb-3 leading-tight">
          {t(card.titleKey)}
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-[#1B4332]/70 leading-relaxed">
          {t(card.descKey)}
        </p>
      </div>
      <div className={`flex items-end mt-auto ${'imageRight' in card && card.imageRight ? 'flex-row-reverse' : ''}`}>
        <div className="relative w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] lg:w-[180px] lg:h-[180px] flex-shrink-0">
          <Image
            src={card.image}
            alt={t(card.titleKey)}
            fill
            className="object-contain object-bottom drop-shadow-md"
            sizes="(max-width: 640px) 130px, (max-width: 1024px) 150px, 180px"
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center pb-4 lg:pb-6 px-1 lg:px-2">
          <span
            style={{ color: card.statColor }}
            className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl leading-none"
          >
            {t(card.statKey)}
          </span>
          <span className="text-[#1B4332]/40 text-[11px] sm:text-xs lg:text-[13px] font-bold text-center leading-tight mt-1 lg:mt-2 uppercase tracking-wide">
            {t(card.statLabelKey)}
          </span>
        </div>
      </div>
    </div >
  );
}

function AnimatedHeading({ t }: { t: ReturnType<typeof useTranslations<'differentiators'>> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`text-center mb-10 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[#ed8788]/40 text-[#ed8788] text-xs font-bold uppercase tracking-widest">
        {t('eyebrow')}
      </span>
      <h2 className="font-heading font-black text-4xl leading-[1.1] text-[#FDF6EC]">
        {t('titleStart')}{' '}
        <span className="text-[#ed8788] italic">{t('titleHighlight')}</span>
      </h2>
      <p className="mt-4 text-[#FDF6EC]/50 text-base font-medium">
        {t('subtitle')}
      </p>
    </div>
  );
}

export default function Differentiators() {
  const t = useTranslations('differentiators');
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

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

  return (
    <>
      <section ref={sectionRef} className="bg-[#1B4332] px-6 sm:px-8 py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1400px]">
          <AnimatedHeading t={t} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {cards.map((card, i) => (
              <AnimatedCard key={i} card={card} index={i} t={t} />
            ))}
          </div>
        </div>
      </section>

      <div
        className={`fixed bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
      >
        <a
          href="#menu-section"
          className="group flex items-center justify-center gap-2 sm:gap-3 bg-[#ed8788] hover:bg-[#e07d65] text-white font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.3)] md:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all"
        >
          {t('cta')}
          <span className="text-base sm:text-lg md:text-xl transition-transform group-hover:translate-x-1 duration-300">→</span>
        </a>
      </div>
    </>
  );
}
