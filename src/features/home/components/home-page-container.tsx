import React from 'react';
import { HeroSection } from './hero-section';
import { TechIntegrationMarquee } from './tech-integration-marquee';
import { ProductSuiteGrid } from './product-suite-grid';
import { EcosystemAdvantages } from './ecosystem-advantages';
import { WorkflowProcess } from './workflow-process';

export const HomePageContainer: React.FC = () => {
  return (
    <div className="space-y-20 sm:space-y-28 pb-28">
      <HeroSection />
      <TechIntegrationMarquee />
      <ProductSuiteGrid />
      <EcosystemAdvantages />
      <WorkflowProcess />
    </div>
  );
};
