'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useLang, useI18n } from '@/lib/i18n';
import { NAV, BRAND, HEADER } from '@/lib/translations';
import styles from './Header.module.css';

/**
 * 全局导航栏 — Client Component
 * 吸顶 + 当前页高亮 + 移动端汉堡抽屉 + 语言切换
 * CLAUDE.md §5.1
 */
export default function Header() {
  const pathname = usePathname();
  const lang = useLang();
  const { toggleLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* 滚动检测 */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* 路由切换时关闭移动菜单 */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* 菜单打开时禁止 body 滚动 */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => setMenuOpen((p) => !p), []);

  const isHome = pathname === '/';

  /* 导航项（使用翻译文案） */
  const navItems = [
    { label: NAV.home[lang],       href: '/' },
    { label: NAV.about[lang],      href: '/about' },
    { label: NAV.strategy[lang],   href: '/strategy' },
    { label: NAV.assets[lang],     href: '/assets' },
    { label: NAV.project[lang],    href: '/project' },
    { label: NAV.investor[lang],   href: '/investor' },
  ];

  const renderNavLinks = () =>
    navItems.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
      >
        {item.label}
      </Link>
    ));

  return (
    <>
      <header
        className={`${styles.header} ${scrolled || !isHome ? styles.sticky : styles.transparent}`}
      >
        <div className={styles.inner}>
          {/* 品牌 Logo（深色背景 → 白色款） */}
          <Link href="/" className={styles.brand} aria-label={BRAND.name[lang]}>
            <Image
              src="/logo-white.svg"
              alt={BRAND.name[lang]}
              width={158}
              height={38}
              className={styles.brandLogo}
              priority
            />
          </Link>

          {/* 桌面端导航 + 语言切换 */}
          <div className={styles.desktopNav}>
            <nav className={styles.navList}>
              {renderNavLinks()}
            </nav>
            {/* 语言切换按钮 */}
            <button
              type="button"
              className={styles.langToggle}
              onClick={toggleLang}
              aria-label={`Switch to ${lang === 'en' ? '中文' : 'English'}`}
            >
              {HEADER.languageLabel[lang]}
            </button>
          </div>

          {/* 移动端汉堡按钮 */}
          <button
            type="button"
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* 移动端抽屉菜单 */}
      <div className={`${styles.mobileDrawer} ${menuOpen ? styles.mobileDrawerOpen : ''}`}>
        <nav className={styles.mobileNavList}>
          {renderNavLinks()}
          <button
            type="button"
            className={styles.langToggle}
            onClick={toggleLang}
          >
            {HEADER.languageLabel[lang]}
          </button>
        </nav>
      </div>
    </>
  );
}
