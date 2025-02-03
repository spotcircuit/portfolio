'use client';

console.log('Loading: Testimonials/index.tsx');

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import type { Testimonial } from './types';

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    location: 'North Carolina',
    text: 'The Japanese Maple I received was absolutely beautiful and exactly as described. The packaging was excellent and the tree is thriving in my garden.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1633713655421-d9f7fe61c8c5'
  },
  {
    name: 'Michael Chen',
    location: 'California',
    text: 'Outstanding customer service and expert advice helped me choose the perfect maple for my climate. Highly recommend!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
  },
  {
    name: 'Emily Davis',
    location: 'Oregon',
    text: 'Been buying Japanese maples for years, and these are some of the healthiest specimens I\'ve ever received.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
  }
];

export function Testimonials() {
  return (
    <section className="container mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Customer Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#2A5B3D] text-[#2A5B3D]" />
                ))}
              </div>
              <p className="mb-4 text-[#8B5E3C]">{testimonial.text}</p>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-[#2A5B3D]">{testimonial.name}</p>
                  <p className="text-sm text-[#8B5E3C]">{testimonial.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
