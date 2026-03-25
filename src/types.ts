import { LucideIcon, Home, Utensils, Bath, Bed, Car, Baby, Gift, TreePine, Palette, Tag, Heart, User, UserPlus } from 'lucide-react';

export type Category = 
  | 'Home Essentials'
  | 'Kitchen Essentials'
  | 'Bathroom Essentials'
  | 'Bedroom Essentials'
  | 'Car Essentials'
  | 'Baby Essentials'
  | 'Gift Ideas'
  | 'Outdoor Essentials'
  | 'Home Decor'
  | 'Best Deals'
  | 'Gifts for Her'
  | 'Gifts for Teen Boy'
  | 'Gifts for Teen Girl';

export interface Product {
  id: string;
  title: string;
  hook: string;
  benefits: string[];
  category: Category;
  price: number;
  rating: number;
  image: string;
  videoUrl?: string;
  amazonLink: string;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isLimitedDeal?: boolean;
  clicks: number;
  views: number;
}

export const CATEGORIES: { name: Category; icon: LucideIcon }[] = [
  { name: 'Home Essentials', icon: Home },
  { name: 'Kitchen Essentials', icon: Utensils },
  { name: 'Bathroom Essentials', icon: Bath },
  { name: 'Bedroom Essentials', icon: Bed },
  { name: 'Car Essentials', icon: Car },
  { name: 'Baby Essentials', icon: Baby },
  { name: 'Gift Ideas', icon: Gift },
  { name: 'Outdoor Essentials', icon: TreePine },
  { name: 'Home Decor', icon: Palette },
  { name: 'Best Deals', icon: Tag },
  { name: 'Gifts for Her', icon: Heart },
  { name: 'Gifts for Teen Boy', icon: User },
  { name: 'Gifts for Teen Girl', icon: UserPlus },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Electric Spin Scrubber',
    hook: 'Stop breaking your back scrubbing the tub!',
    benefits: ['Cordless & Rechargeable', '4 Replaceable Brush Heads', 'Powerful 300RPM'],
    category: 'Home Essentials',
    price: 45.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cleaning-a-bathroom-sink-with-a-brush-4481-large.mp4',
    amazonLink: 'https://amazon.com',
    isTrending: true,
    clicks: 1250,
    views: 5000,
  },
  {
    id: '2',
    title: 'Magnetic Measuring Spoons',
    hook: 'The last measuring spoons you will ever buy.',
    benefits: ['Double-sided design', 'Magnetic nesting', 'Stainless steel'],
    category: 'Kitchen Essentials',
    price: 15.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-pouring-sauce-on-a-plate-4113-large.mp4',
    amazonLink: 'https://amazon.com',
    isBestSeller: true,
    clicks: 850,
    views: 3200,
  },
  {
    id: '3',
    title: 'Portable Car Vacuum',
    hook: 'Keep your car spotless with zero effort.',
    benefits: ['High power suction', 'HEPA filter', 'Long cord'],
    category: 'Car Essentials',
    price: 32.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1595433707802-68267d83760a?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-cleaning-the-interior-of-a-car-4484-large.mp4',
    amazonLink: 'https://amazon.com',
    isLimitedDeal: true,
    clicks: 2100,
    views: 8900,
  },
  // Adding more to reach 50...
  ...Array.from({ length: 47 }).map((_, i) => ({
    id: (i + 4).toString(),
    title: `Viral Product ${i + 4}`,
    hook: `This ${CATEGORIES[i % CATEGORIES.length].name} find is a total game changer!`,
    benefits: ['Highly rated', 'Viral on TikTok', 'Limited stock'],
    category: CATEGORIES[i % CATEGORIES.length].name,
    price: Math.floor(Math.random() * 100) + 10,
    rating: (Math.random() * 1 + 4).toFixed(1) as any,
    image: `https://picsum.photos/seed/product${i + 4}/800/800`,
    amazonLink: 'https://amazon.com',
    isTrending: Math.random() > 0.7,
    clicks: Math.floor(Math.random() * 1000),
    views: Math.floor(Math.random() * 5000),
  }))
];
