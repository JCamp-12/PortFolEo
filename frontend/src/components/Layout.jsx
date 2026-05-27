import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 px-6 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
