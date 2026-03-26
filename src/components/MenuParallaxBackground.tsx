'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

export default function MenuParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Elementy parallax
  const item1Ref = useRef<HTMLDivElement>(null);
  const item2Ref = useRef<HTMLDivElement>(null);
  const item3Ref = useRef<HTMLDivElement>(null);
  const bearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    // Pobieramy wysokość sekcji by wiedzieć, na jakim odcinku działać
    const ctx = gsap.context(() => {
      // Lewy górny obraz - płynie trochę wolniej w górę
      gsap.to(item1Ref.current, {
        yPercent: -100, // przesuwa się lekko do góry względem naturalnego scrolla
        rotation: 15, // powolny obrót
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1, // gładkie śledzenie scrolla
        },
      });

      // Prawy środkowy obraz - szybciej płynie do góry
      gsap.to(item2Ref.current, {
        yPercent: -200,
        rotation: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Lewy dolny obraz - powolny parallax
      gsap.to(item3Ref.current, {
        yPercent: -80,
        rotation: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'center bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });

      // Misiek po prawej stronie wyłania się i chowa
      gsap.fromTo(
        bearRef.current,
        { x: '100%', yPercent: 50, rotation: 10, opacity: 0 },
        {
          x: '30%', // misiek nie musi wchodzić cały
          yPercent: -20,
          rotation: -5,
          opacity: 1,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: container,
            start: 'top center', // zaczyna gdy góra menu mija środek okna
            end: 'bottom center', // kończy na końcu menu
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert(); // sprzątanie GSAP
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden lg:block"
    >
      {/* 
        Tymczasowe obrazy (food-X.webp, z nałożonym zaokrągleniem, żeby symulować talerz).
        Docelowo podmienimy te pliki na odpowiednio wycięte PNG/WEBP bez tła.
      */}

      {/* Lewa strona - góra */}
      <div
        ref={item1Ref}
        className="absolute top-[15%] -left-[5%] w-[350px] aspect-square rounded-full overflow-hidden opacity-20 filter blur-[8px]"
      >
        <Image src="/images/food-1.webp" alt="" fill className="object-cover" />
      </div>

      {/* Prawa strona - środek (bardziej widoczna głębia bokehu) */}
      <div
        ref={item2Ref}
        className="absolute top-[45%] -right-[8%] w-[450px] aspect-square rounded-full overflow-hidden opacity-[0.15] filter blur-[12px]"
      >
        <Image src="/images/food-2.webp" alt="" fill className="object-cover" />
      </div>

      {/* Lewa strona - dół */}
      <div
        ref={item3Ref}
        className="absolute bottom-[20%] -left-[10%] w-[500px] aspect-square rounded-full overflow-hidden opacity-[0.12] filter blur-[6px]"
      >
        <Image src="/images/food-3.webp" alt="" fill className="object-cover" />
      </div>

      {/* Wychylający się Misiek */}
      <div
        ref={bearRef}
        className="absolute top-[60%] -right-0 w-[400px] aspect-square filter drop-shadow-2xl opacity-60"
      >
        <Image
          src="/images/bear-pop.webp"
          alt=""
          fill
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}
