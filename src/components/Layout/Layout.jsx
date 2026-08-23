import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header>{/* Header: Logo, UserNav, UserBar — next stage */}</header>
      <main>
        <Suspense fallback={<div>Завантаження...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
