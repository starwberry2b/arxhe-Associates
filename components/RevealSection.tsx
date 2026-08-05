'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './RevealSection.module.css';

interface RevealSectionProps {
  children: ReactNode;
  /** 延迟入场时间（ms），用于卡片错位动画 */
  delay?: number;
  /** IntersectionObserver 阈值，默认 0.12 */
  threshold?: number;
  /** 附加的 className */
  className?: string;
}

/**
 * 滚动淡入包装组件 — IntersectionObserver + fadeUp
 * CLAUDE.md §3.5：克制平滑，仅透明度 + 位移微动效
 * 参考 .kimi/skills 模式：threshold 0.15，800ms cubic-bezier(0.16,1,0.3,1)
 */
export default function RevealSection({
  children,
  delay = 0,
  threshold = 0.12,
  className,
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // delay 支持卡片错位入场
          if (delay > 0) {
            setTimeout(() => setRevealed(true), delay);
          } else {
            setRevealed(true);
          }
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${revealed ? styles.revealed : ''} ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
