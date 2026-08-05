import type { Metadata } from 'next';
import { META } from '@/lib/translations';

export const metadata: Metadata = {
  title: META.strategy.title.en,
  description: META.strategy.description.en,
};

export default function StrategyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
