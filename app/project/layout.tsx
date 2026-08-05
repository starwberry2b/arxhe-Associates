import type { Metadata } from 'next';
import { META } from '@/lib/translations';

export const metadata: Metadata = {
  title: META.project.title.en,
  description: META.project.description.en,
};

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
