import type { Metadata } from 'next';
import { META } from '@/lib/translations';

export const metadata: Metadata = {
  title: META.assets.title.en,
  description: META.assets.description.en,
};

export default function AssetsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
