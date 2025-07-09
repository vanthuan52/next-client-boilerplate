import React from 'react';

import Hero from './_components/hero';
import ConfettiEffect from '@/components/effects/confetti';

export default function LandingPage() {
  return (
    <React.Fragment>
      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <Hero />
      </section>
      <ConfettiEffect />
    </React.Fragment>
  );
}
