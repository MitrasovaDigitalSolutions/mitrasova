import React from 'react';
import { Navbar, Footer, ScrollProgressBar } from '@/components/shared';
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
  LocalBusinessJsonLd,
} from '@/components/shared/json-ld';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <LocalBusinessJsonLd />
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
