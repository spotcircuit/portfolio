'use client';

console.log('Loading: ServiceHighlights/index.tsx');

import { Truck, Phone, Mail, Clock } from 'lucide-react';
import { type Service } from './types';

const services: Service[] = [
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
];

function ServiceHighlights() {
  console.log('Rendering ServiceHighlights');
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.Icon;
            return (
              <div key={index} className="flex flex-col items-center text-center p-6">
                <IconComponent className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { ServiceHighlights };
