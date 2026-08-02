import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// Rendered for every authenticated route ("/", "/dictionary", "/recommend", "/training").
// Header (Logo + UserNav + UserBar, burger menu on mobile/tablet) will be
// implemented in the next stage as its own component.
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
