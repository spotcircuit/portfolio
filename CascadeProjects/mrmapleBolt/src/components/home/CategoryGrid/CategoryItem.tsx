'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CategoryItemProps {
  name: string;
  image: string;
  href: string;
  className?: string;
}

export function CategoryItem({ name, image, href, className }: CategoryItemProps) {
  return (
    <Link href={href} className={cn("group block relative aspect-square overflow-hidden rounded-lg", className)}>
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
      <div className="absolute inset-0 p-4 flex items-end">
        <h3 className="text-xl font-semibold text-white">{name}</h3>
      </div>
    </Link>
  );
}