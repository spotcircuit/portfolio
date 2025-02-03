'use client';

import { Suspense } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { BestSellers } from '@/components/home/BestSellers';
import { ServiceHighlights } from '@/components/home/ServiceHighlights';
import { Newsletter } from '@/components/home/Newsletter';
import { Testimonials } from '@/components/home/Testimonials';

function LoadingComponent() {
  return <div>Loading...</div>;
}

export default function Home() {
  return (
    <div>
      <Suspense fallback={<LoadingComponent />}>
        <HeroSection />
        <CategoryGrid />
        <BestSellers />
        <ServiceHighlights />
        <Newsletter />
        <Testimonials />
      </Suspense>
    </div>
  );
}
