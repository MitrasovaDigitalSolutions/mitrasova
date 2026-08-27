import React from 'react';
import { HeroSection } from './hero-section';
import { ProductSuiteGrid } from './product-suite-grid';
import { InteractiveDemoTabs } from './interactive-demo-tabs';

export const HomePageContainer: React.FC = () => {
  return (
    <div className="space-y-24 pb-28">
      <HeroSection />
      <ProductSuiteGrid />
      <InteractiveDemoTabs />
    </div>
  );
};
