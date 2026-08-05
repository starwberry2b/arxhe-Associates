import type { Metadata } from 'next';
import { META } from '@/lib/translations';

export const metadata: Metadata = {
  title: META.about.title.en,
  description: META.about.description.en,
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
