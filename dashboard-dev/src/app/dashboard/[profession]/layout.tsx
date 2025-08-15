'use client';
// Layout components
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { getProfessionRoutes } from 'routes';
import {
  getActiveNavbar,
  getActiveRoute,
  isWindowAvailable,
} from 'utils/navigation';
import React from 'react';
import Navbar from 'components/dashboard/shared/navbar/index';
import Sidebar from 'components/dashboard/shared/sidebar';
import Footer from 'components/dashboard/shared/footer/Footer';

export default function Admin({ children }: { children: React.ReactNode }) {
  // states and functions
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Pobierz profession z URL z zabezpieczeniem
  const profession = pathname.split('/')[2] as 'copywriter' | 'programmer';
  const validProfessions = ['copywriter', 'programmer'];
  const currentProfession = validProfessions.includes(profession)
    ? profession
    : 'copywriter';

  if (isWindowAvailable()) document.documentElement.dir = 'ltr';

  const routes = getProfessionRoutes(currentProfession);

  return (
    <div className="flex h-full w-full bg-background-100 dark:bg-background-900">
      <Sidebar routes={routes} open={open} setOpen={setOpen} variant="admin" />
      {/* Navbar & Main Content */}
      <div className="h-full w-full font-dm dark:bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-2.5  flex-none transition-all dark:bg-navy-900 
              md:pr-2 xl:ml-[323px]`}
        >
          {/* Routes */}
          <div>
            <Navbar
              onOpenSidenav={() => setOpen(!open)}
              brandText={getActiveRoute(routes, pathname)}
              secondary={getActiveNavbar(routes, pathname)}
            />
            <div className="mx-auto min-h-screen p-2 !pt-[10px] md:p-2">
              {children}
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
