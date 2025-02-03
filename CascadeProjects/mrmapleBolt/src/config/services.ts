import { Truck, Phone, Mail, Clock } from 'lucide-react';

export const services = [
  {
    Icon: Truck,
    title: 'Efficient Shipping',
    description: 'We use custom boxes to ensure you\'re getting the cheapest shipping around!'
  },
  {
    Icon: Phone,
    title: '24/7 Support',
    description: 'Our team is always here to help with any questions you may have.'
  },
  {
    Icon: Mail,
    title: 'Easy Returns',
    description: 'Simple return process within 30 days of purchase.'
  },
  {
    Icon: Clock,
    title: 'Quick Processing',
    description: 'Orders processed and shipped within 24-48 hours.'
  }
] as const;

export const brandHighlights = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Hand-selected, rare Japanese maples'
  },
  {
    icon: Leaf,
    title: 'Expert Care',
    description: 'Detailed growing guides and support'
  },
  {
    icon: Truck,
    title: 'Safe Shipping',
    description: 'Secure packaging for every tree'
  },
  {
    icon: HeartHandshake,
    title: 'Customer First',
    description: 'Dedicated support for your success'
  }
] as const;
