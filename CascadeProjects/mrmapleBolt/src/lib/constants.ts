import { Tree, Flower2, Leaf, Shrub, Sun, Droplets } from 'lucide-react';

export const categories = [
  { 
    name: 'Trees',
    icon: <Tree className="h-4 w-4" />,
    subcategories: ['Maple Trees', 'Evergreen Trees', 'Flowering Trees', 'Shade Trees', 'Fruit Trees']
  },
  { 
    name: 'Japanese Maples',
    icon: <Leaf className="h-4 w-4" />,
    subcategories: ['Dwarf Varieties', 'Upright Varieties', 'Weeping Varieties', 'Red Varieties', 'Green Varieties']
  },
  { 
    name: 'Shrubs',
    icon: <Shrub className="h-4 w-4" />,
    subcategories: ['Evergreen Shrubs', 'Flowering Shrubs', 'Privacy Shrubs', 'Ground Cover']
  },
  { 
    name: 'Perennials',
    icon: <Flower2 className="h-4 w-4" />,
    subcategories: ['Sun Perennials', 'Shade Perennials', 'Native Plants', 'Ornamental Grasses']
  },
  { 
    name: 'Garden Care',
    icon: <Sun className="h-4 w-4" />,
    subcategories: ['Soil & Fertilizer', 'Tools', 'Mulch', 'Plant Care Guides']
  },
  { 
    name: 'Irrigation',
    icon: <Droplets className="h-4 w-4" />,
    subcategories: ['Watering Systems', 'Sprinklers', 'Drip Systems', 'Controllers']
  }
];