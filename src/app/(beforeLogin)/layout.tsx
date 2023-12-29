import { ChildrenProp } from '@/typing/props';
import Footer from './_components/Footer';
import NavBar from './_components/NavBar';

export default function Layout({ children }: ChildrenProp) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
