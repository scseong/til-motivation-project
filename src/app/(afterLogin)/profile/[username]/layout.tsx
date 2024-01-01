'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import ModalController from './_components/ModalController ';
import { ChildrenProp } from '@/typing/props';

export default function Layout({ children }: ChildrenProp) {
  const segment = useSelectedLayoutSegment();
  return (
    <>
      <ModalController segment={segment} />
      {children}
    </>
  );
}
