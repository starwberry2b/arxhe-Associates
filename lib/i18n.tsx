'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

/** 支持的语言 */
export type Lang = 'en' | 'zh';

/** Context 值 */
interface I18nContextValue {
  lang: Lang;
  toggleLang: () => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/** localStorage 键名 */
const STORAGE_KEY = 'arxhe-lang';

/** 从 localStorage 读取语言偏好，默认英文 */
function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'zh' || stored === 'en') return stored;
  } catch { /* 无权限时静默回退 */ }
  return 'en';
}

/**
 * I18nProvider — 语言状态管理
 * 包裹在根布局中，为所有子组件提供当前语言和切换函数
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en'); // SSR 默认 en，客户端 hydration 后同步

  /* 客户端初始化：从 localStorage 读取 */
  useEffect(() => {
    const initial = getInitialLang();
    setLang(initial);
    document.documentElement.lang = initial;
  }, []);

  /* 语言切换时同步更新 <html lang> */
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  /* 切换语言 */
  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === 'en' ? 'zh' : 'en';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch { /* 忽略 */ }
      return next;
    });
  }, []);

  return (
    <I18nContext.Provider value={{ lang, toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}

/**
 * useI18n — 获取当前语言和切换函数
 * 必须在 I18nProvider 内部使用
 */
export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}

/**
 * useLang — 便捷获取当前语言
 */
export function useLang(): Lang {
  return useI18n().lang;
}
