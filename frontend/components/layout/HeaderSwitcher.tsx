'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function HeaderSwitcher() {
  const pathname = usePathname() || '';
  // /stores 配下では sticky をオフ
  const sticky = !pathname.startsWith('/stores');
  return <Header sticky={sticky} />;
}
