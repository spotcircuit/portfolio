'use client';

import { CategoryItem } from './CategoryItem';
import { GridLayout } from './GridLayout';
import { categories } from '@/config/categories';
import type { CategoryGridProps } from './types';

console.log('CategoryGrid - Component type:', typeof CategoryGrid);
console.log('CategoryGrid - categories:', categories);

export function CategoryGrid({ className }: CategoryGridProps) {
  console.log('CategoryGrid - Rendering');
  return (
    <section className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Our Collections</h2>
      <GridLayout className={className}>
        {categories.map((category) => (
          <CategoryItem
            key={category.name}
            {...category}
          />
        ))}
      </GridLayout>
    </section>
  );
}