'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const REVIEW_AUTHORS = [
  'Joanna StMu',
  'Natalia Szeszko',
  'Aleksandra Ginalska',
  'Ania',
  'Tomasz Urbański',
  'Karolina Lipa',
  'Dominik Musialik',
  'Igor Rybicki',
];

const STACK_SIZE = 3;

function ReviewCard({
  author,
  text,
  onReadMore,
  readMoreLabel,
}: {
  author: string;
  text: string;
  onReadMore: () => void;
  readMoreLabel: string;
}) {
  return (
    <>
      <div className="text-[56px] leading-none text-[#E8927C] opacity-40 font-heading font-black mb-1">
        &ldquo;
      </div>
      <p className="font-heading font-black text-xl leading-snug tracking-tight text-[#1B4332] mb-5 line-clamp-3">
        {text}
      </p>
      <div className="flex justify-center gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <span key={s} className="text-[#D4A017] text-base">★</span>
        ))}
      </div>
      <p className="font-heading font-bold text-[#1B4332] text-sm mb-3">{author}</p>
      <button
        onClick={(e) => { e.stopPropagation(); onReadMore(); }}
        className="text-xs font-semibold text-[#E8927C] hover:text-[#d4765f] underline underline-offset-2 transition-colors cursor-pointer"
      >
        {readMoreLabel}
      </button>
    </>
  );
}

function Modal({
  author,
  text,
  onClose,
  closeLabel,
}: {
  author: string;
  text: string;
  onClose: () => void;
  closeLabel: string;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: 'backdropIn 0.25s ease forwards' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div
        className="relative z-10 bg-white rounded-3xl shadow-2xl px-8 py-10 max-w-lg w-full max-h-[85vh] overflow-y-auto"
        style={{ animation: 'modalIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-[#1B4332]/40 hover:text-[#1B4332] hover:bg-[#1B4332]/8 transition-all cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="text-[56px] leading-none text-[#E8927C] opacity-40 font-heading font-black mb-2">
          &ldquo;
        </div>
        <p className="font-heading font-black text-xl leading-snug tracking-tight text-[#1B4332] mb-6">
          {text}
        </p>
        <div className="flex gap-0.5 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <span key={s} className="text-[#D4A017] text-base">★</span>
          ))}
        </div>
        <p className="font-heading font-bold text-[#1B4332] text-sm">{author}</p>
      </div>
    </div>
  );
}

export default function SocialProof() {
  const t = useTranslations('socialProof');
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [exitingCard, setExitingCard] = useState<number | null>(null);
  const [exitDir, setExitDir] = useState<'left' | 'right'>('left');
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const touchStart = useRef<number | null>(null);

  const reviews = REVIEW_AUTHORS.map((author, i) => ({
    author,
    text: t(`review${i}` as Parameters<typeof t>[0]),
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSectionVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  function navigate(dir: 'next' | 'prev') {
    if (exitingCard !== null) return;
    const prev = current;
    setExitingCard(prev);
    setExitDir(dir === 'next' ? 'left' : 'right');
    setCurrent((c) =>
      dir === 'next'
        ? (c + 1) % reviews.length
        : (c - 1 + reviews.length) % reviews.length
    );
    setTimeout(() => setExitingCard(null), 420);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStart.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 'next' : 'prev');
    touchStart.current = null;
  }

  const stackPositions = [
    { translateY: 0,  scale: 1,    opacity: 1,    zIndex: 30 },
    { translateY: 12, scale: 0.96, opacity: 0.65, zIndex: 20 },
    { translateY: 24, scale: 0.92, opacity: 0.35, zIndex: 10 },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#FDF6EC] px-6 py-16">
      <style>{`
        @keyframes bearPeek {
          0%   { transform: translate(90%, -60%) rotate(140deg); opacity: 0; }
          55%  { transform: translate(-6px, 6px) rotate(186deg); opacity: 1; }
          75%  { transform: translate(4px, -4px) rotate(177deg); }
          90%  { transform: translate(-2px, 2px) rotate(181deg); }
          100% { transform: translate(0, 0) rotate(180deg); }
        }
        @keyframes cardExitLeft {
          from { transform: translateX(0) rotate(0deg); opacity: 1; }
          to   { transform: translateX(-120%) rotate(-10deg); opacity: 0; }
        }
        @keyframes cardExitRight {
          from { transform: translateX(0) rotate(0deg); opacity: 1; }
          to   { transform: translateX(120%) rotate(10deg); opacity: 0; }
        }
        @keyframes backdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Bear */}
      <div
        className="pointer-events-none absolute -top-4 -right-8 w-64 select-none z-0"
        style={
          sectionVisible
            ? { animation: 'bearPeek 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }
            : { opacity: 0 }
        }
      >
        <Image src="/images/bear-testimonial.webp" alt="" width={256} height={256} className="w-full h-auto" />
      </div>

      <div className="relative z-10 mx-auto max-w-xl text-center">
        {/* Heading */}
        <p className="font-heading font-bold text-sm uppercase tracking-widest text-[#E8927C] mb-8">
          {t('heading')}
        </p>

        {/* Card stack */}
        <div
          className="relative mx-auto mt-15"
          style={{ height: '330px' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {[STACK_SIZE - 1, STACK_SIZE - 2, 0].map((pos) => {
            const reviewIdx = (current + pos) % reviews.length;
            const { translateY, scale, opacity, zIndex } = stackPositions[pos];

            return (
              <div
                key={reviewIdx}
                className="absolute inset-x-0 top-0 bg-white rounded-3xl shadow-md px-8 py-7 text-center"
                style={{
                  zIndex,
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  opacity,
                  transition: 'transform 0.42s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.42s ease',
                  transformOrigin: 'center top',
                  pointerEvents: pos === 0 ? 'auto' : 'none',
                }}
              >
                <ReviewCard
                  author={reviews[reviewIdx].author}
                  text={reviews[reviewIdx].text}
                  onReadMore={() => setModalIdx(reviewIdx)}
                  readMoreLabel={t('readMore')}
                />
              </div>
            );
          })}

          {exitingCard !== null && (
            <div
              className="absolute inset-x-0 top-0 bg-white rounded-3xl shadow-md px-8 py-7 text-center"
              style={{
                zIndex: 40,
                animation: `${exitDir === 'left' ? 'cardExitLeft' : 'cardExitRight'} 0.42s cubic-bezier(0.4, 0, 1, 1) forwards`,
              }}
            >
              <ReviewCard
                author={reviews[exitingCard].author}
                text={reviews[exitingCard].text}
                onReadMore={() => setModalIdx(exitingCard)}
                readMoreLabel={t('readMore')}
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => navigate('prev')}
            className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1B4332] hover:bg-[#1B4332] hover:text-white transition-all duration-200 cursor-pointer group"
            aria-label="Poprzednia opinia"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="transition-transform duration-200 group-hover:-translate-x-0.5">
              <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="flex items-center gap-1.5">
            {reviews.map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '20px' : '6px',
                  backgroundColor: i === current ? '#E8927C' : '#1B4332',
                  opacity: i === current ? 1 : 0.2,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => navigate('next')}
            className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1B4332] hover:bg-[#1B4332] hover:text-white transition-all duration-200 cursor-pointer group"
            aria-label="Następna opinia"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
              <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalIdx !== null && (
        <Modal
          author={reviews[modalIdx].author}
          text={reviews[modalIdx].text}
          onClose={() => setModalIdx(null)}
          closeLabel={t('close')}
        />
      )}
    </section>
  );
}
