'use client';

console.log('Loading: Newsletter/index.tsx');

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { type NewsletterProps } from './types';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Successfully subscribed!',
      description: 'Thank you for subscribing to our newsletter.',
    });
    setEmail('');
  };

  return (
    <section className="bg-primary/5 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
        <p className="text-muted-foreground mb-8">
          Subscribe to receive updates on new arrivals and special promotions
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}
