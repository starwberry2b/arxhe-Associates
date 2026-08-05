import type { Metadata } from 'next';
import { META } from '@/lib/translations';

export const metadata: Metadata = {
  title: META.investor.title.en,
  description: META.investor.description.en,
};

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
