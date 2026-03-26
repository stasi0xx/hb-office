'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

interface Props {
  bearImage?: string;
  foodImages?: [string, string, string];
}

export default function LeftBearParallaxBackground({
  bearImage = '/images/bear-left.webp',
  foodImages = ['/images/food-4.webp', '/images/food-5.webp', '/images/food-6.webp'],
}: Props) {
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

    const ctx = gsap.context(() => {
      // Prawy górny obraz - płynie wolniej w górę
      gsap.to(item1Ref.current, {
        yPercent: -120,
        rotation: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Lewy środkowy obraz - najszybszy
      gsap.to(item2Ref.current, {
        yPercent: -180,
        rotation: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Prawy dolny obraz - powolny
      gsap.to(item3Ref.current, {
        yPercent: -60,
        rotation: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'center bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });

      // Misiek po LEWEJ stronie wyłania się i chowa
      gsap.fromTo(
        bearRef.current,
        { x: '-100%', yPercent: 40, rotation: -15, opacity: 0 },
        {
          x: '-20%', // misiek nie musi wchodzić cały, zaledwie wschodzi
          yPercent: -10,
          rotation: 5,
          opacity: 1,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden lg:block"
    >
      {/* Prawa strona - góra */}
      <div
        ref={item1Ref}
        className="absolute top-[5%] -right-[6%] w-[350px] aspect-square rounded-full overflow-hidden opacity-[0.15] filter blur-[10px]"
      >
        <Image src={foodImages[0]} alt="" fill className="object-cover" />
      </div>

      {/* Lewa strona - środek */}
      <div
        ref={item2Ref}
        className="absolute top-[35%] -left-[10%] w-[450px] aspect-square rounded-full overflow-hidden opacity-[0.12] filter blur-[14px]"
      >
        <Image src={foodImages[1]} alt="" fill className="object-cover" />
      </div>

      {/* Prawa strona - dół */}
      <div
        ref={item3Ref}
        className="absolute bottom-[20%] -right-[8%] w-[500px] aspect-square rounded-full overflow-hidden opacity-[0.18] filter blur-[8px]"
      >
        <Image src={foodImages[2]} alt="" fill className="object-cover" />
      </div>

      {/* Wychylający się misiek z LEWEJ strony */}
      <div
        ref={bearRef}
        className="absolute top-[50%] -left-0 w-[400px] aspect-square filter drop-shadow-2xl opacity-60"
      >
        <Image
          src={bearImage}
          alt=""
          fill
          className="object-contain object-bottom "
        />
      </div>
    </div>
  );
}
