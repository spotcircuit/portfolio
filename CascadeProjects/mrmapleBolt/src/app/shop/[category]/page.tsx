import { notFound } from 'next/navigation';
import { categories } from '@/components/home/CategoryGrid/config';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Validate category exists
  const category = categories.find(
    (cat) => cat.href === `/shop/${params.category}`
  );

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 heading-primary">
        {category.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Product grid will go here */}
        <p className="text-muted-foreground col-span-full text-center py-8">
          Products coming soon...
        </p>
      </div>
    </div>
  );
}
