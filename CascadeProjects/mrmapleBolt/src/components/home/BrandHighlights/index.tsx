'use client';

console.log('Loading: BrandHighlights/index.tsx');

import { Award, Leaf, Truck, HeartHandshake } from 'lucide-react';
import { type Highlight } from './types';

const highlights: Highlight[] = [
  {
    icon: <Award className="h-8 w-8" />,
    title: 'Premium Quality',
    description: 'Hand-selected, rare Japanese maples'
  },
  {
    icon: <Leaf className="h-8 w-8" />,
    title: 'Expert Care',
    description: 'Detailed growing guides and support'
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: 'Safe Shipping',
    description: 'Carefully packaged and tracked delivery'
  },
  {
    icon: <HeartHandshake className="h-8 w-8" />,
    title: 'Satisfaction Guaranteed',
    description: '30-day guarantee on all plants'
  }
];

export function BrandHighlights() {
  console.log('Rendering: BrandHighlights component');
  return (
    <section className="container mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {highlights.map((highlight, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-4 text-[#2A5B3D]">
              {highlight.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
            <p className="text-gray-600">{highlight.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
