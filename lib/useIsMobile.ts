import { useState, useEffect } from 'react';

/**
 * 检测当前视口是否为移动端宽度
 * @param breakpoint 断点（px），默认 767
 */
export function useIsMobile(breakpoint = 767): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
}
