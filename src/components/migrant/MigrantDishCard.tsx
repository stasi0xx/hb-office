'use client';

import Image from 'next/image';
import CategoryIcon from '@/components/CategoryIcon';

interface MigrantDishCardProps {
  name: string;
  category: string;
  quantity: number;
  canAdd: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

export default function MigrantDishCard({ name, category, quantity, canAdd, onAdd, onRemove }: MigrantDishCardProps) {
  const mockupIndex = (name.length % 8) + 1;
  const imageSrc = `/images/food-${mockupIndex}.webp`;

  return (
    <div className="w-full bg-white rounded-[22px] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col relative border border-[#1C3D1C]/5">
      {/* Cover Image */}
      <div className="relative w-full h-[110px] sm:h-[130px] bg-[#e8e0d5]">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>

      {/* Content */}
      <div className="px-3.5 pb-3.5">
        {/* Top row: Icon + Title */}
        <div className="flex items-start gap-3 -mt-6">
          <div className="w-[48px] h-[48px] shrink-0 bg-[#1C3D1C] text-white rounded-[14px] flex items-center justify-center border-[2.5px] border-white shadow-sm z-10 relative">
            <CategoryIcon category={category} className="h-5 w-5" />
          </div>
          <div className="flex-1 pt-[28px]">
            <h3 className="font-bold text-[14px] sm:text-[15px] leading-tight text-gray-900 line-clamp-2">
              {name}
            </h3>
          </div>
        </div>

        {/* Bottom row: Add / counter */}
        <div className="flex items-center justify-end mt-3.5">
          {quantity === 0 ? (
            <button
              onClick={onAdd}
              disabled={!canAdd}
              className={`flex h-[34px] px-3.5 items-center justify-center gap-1.5 rounded-full transition-all ${
                canAdd
                  ? 'bg-[#FDF6EC] hover:bg-[#F5EAD9] text-[#1C3D1C] border border-[#1C3D1C]/10'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span className="text-xl leading-none font-bold mt-[-2px]">+</span>
              <span className="text-[12px] font-bold">Add</span>
            </button>
          ) : (
            <div className="flex items-center gap-2.5 rounded-full bg-[#1C3D1C] px-1.5 h-[34px]">
              <button
                onClick={onRemove}
                className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-white/20 text-white font-bold text-sm hover:bg-white/30 transition-colors"
              >
                −
              </button>
              <span className="text-sm font-bold text-white min-w-[14px] text-center">{quantity}</span>
              <button
                onClick={onAdd}
                disabled={!canAdd}
                className={`flex h-[26px] w-[26px] items-center justify-center rounded-full text-white font-bold text-sm transition-colors ${
                  canAdd ? 'bg-white/20 hover:bg-white/30' : 'bg-white/10 cursor-not-allowed'
                }`}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
