import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './variables.css';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ChildrenProp } from '@/typing/props';
import NavBar from './_components/NavBar';
import Footer from './_components/Footer';
import ReactQueryProviders from '@/utils/ReactQueryProviders';
import { ToastContainer } from 'react-toastify';

const knu = localFont({ src: '../../public/fonts/knutruth.woff2' });

export const metadata: Metadata = {
  title: '여러분 TIL 제출하러 갑시다~',
  description:
    '오늘 우리가 배운 것들을 나누고 함께 성장해요. 개발자 여러분의 코딩 여정을 기록하세요.'
};

export default function RootLayout({ children }: ChildrenProp) {
  return (
    <html lang="ko">
      <body className={knu.className}>
        <ReactQueryProviders>
          <NavBar />
          {children}
          <Footer />
          <ToastContainer />
        </ReactQueryProviders>
      </body>
    </html>
  );
}
