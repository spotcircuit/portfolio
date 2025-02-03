'use client';

console.log('Loading: BestSellers/index.tsx');

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { bestSellers } from '@/config/products';
import type { Product } from './types';

console.log('BestSellers Data:', { bestSellers });

function BestSellers() {
  console.log('Rendering BestSellers component');
  console.log('BestSellers function type:', typeof BestSellers);
  
  useEffect(() => {
    console.log('BestSellers mounted');
    return () => console.log('BestSellers unmounted');
  }, []);

  return (
    <section>
      <div className="container mx-auto">
        <div className="p-8 rounded-lg border-2 border-[#2A5B3D]/20 bg-[#F9F6F1]">
          <div className="relative h-32 mb-8 overflow-hidden rounded-lg border-2 border-[#2A5B3D] bg-[#2A5B3D]">
            <div className="absolute inset-0">
              <Image
                src="/images/best-sellers-bg.jpg"
                alt="Japanese Maple Background"
                fill
                className="object-cover opacity-20"
              />
            </div>
            <div className="relative h-full flex items-center justify-center">
              <div>
                <h2 className="text-4xl font-bold text-[#F9F6F1] text-center">
                  Best Selling Japanese Maples
                </h2>
                <p className="text-[#F9F6F1]/80 text-center mt-2">
                  Our most popular varieties, chosen by maple enthusiasts
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <Card key={product.name} className="overflow-hidden">
                <Link href={`/products/${encodeURIComponent(product.name.toLowerCase())}`}>
                  <div className="relative h-48">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-[#2A5B3D] font-bold">${product.price}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { BestSellers };
