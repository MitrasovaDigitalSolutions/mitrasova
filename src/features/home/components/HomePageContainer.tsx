import React from 'react';
import { HeroSection } from './HeroSection';
import { ProductSuiteGrid } from './ProductSuiteGrid';
import { InteractiveDemoTabs } from './InteractiveDemoTabs';

export const HomePageContainer: React.FC = () => {
  return (
    <div className="space-y-24 pb-20">
      <HeroSection />
      <ProductSuiteGrid />
      <InteractiveDemoTabs />
    </div>
  );
};
