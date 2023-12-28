import { ChildrenProp } from '@/typing/props';
import NavBar from './_components/NavBar';
import Footer from './_components/Footer';

export default function Layout({ children }: ChildrenProp) {
  return <div>
    <NavBar />
    {children}
    <Footer />
    </div>;
}
