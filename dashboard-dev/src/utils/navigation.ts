import { IRoute } from 'types/navigation';

// NextJS Requirement
export const isWindowAvailable = () => typeof window !== 'undefined';

export const findCurrentRoute = (
  routes: IRoute[],
  pathname: string,
): IRoute => {
  if (!isWindowAvailable()) return null;

  const cleanPathname = pathname
    .replace(/^\/dashboard\/[^\/]+/, '')
    .replace(/^\//, '');

  for (let route of routes) {
    if (!!route.items) {
      const found = findCurrentRoute(route.items, pathname);
      if (!!found) return found;
    }

    if (route.path === '') {
      if (pathname.match(/^\/dashboard\/[^\/]+$/)) {
        return route;
      }
    } else {
      if (cleanPathname === route.path) {
        return route;
      }
    }
  }
  return null;
};

export const getBreadcrumbs = (
  pathname: string,
): Array<{ name: string; path: string; isActive: boolean }> => {
  if (!isWindowAvailable()) return [];

  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [];

  if (segments.length === 1 && segments[0] === 'dashboard') {
    return [
      {
        name: 'Dashboard',
        path: '/dashboard',
        isActive: true,
      },
    ];
  }

  breadcrumbs.push({
    name: 'Dashboard',
    path: `/dashboard/${segments[1] || ''}`,
    isActive: false,
  });

  if (segments[2]) {
    const pageName = getPageDisplayName(segments[2]);

    // For projects routes, create intermediate breadcrumb
    if (segments[2] === 'projects' && segments[3]) {
      breadcrumbs.push({
        name: pageName,
        path: `/dashboard/${segments[1]}/projects`,
        isActive: false,
      });
    } else {
      breadcrumbs.push({
        name: pageName,
        path: pathname,
        isActive: segments.length === 3,
      });
    }
  }

  if (segments[3]) {
    const subPageName = getSubPageDisplayName(segments[2], segments[3]);
    breadcrumbs.push({
      name: subPageName,
      path: pathname,
      isActive: true,
    });
  }

  return breadcrumbs;
};

const getPageDisplayName = (page: string): string => {
  const pageMap: Record<string, string> = {
    profile: 'Profile',
    'ai-assistant': 'AI Assistant',
    settings: 'Settings',
    clients: 'Clients',
    billings: 'Billings',
    tasks: 'Tasks',
    projects: 'Projects',
  };
  return pageMap[page] || page.charAt(0).toUpperCase() + page.slice(1);
};

const getSubPageDisplayName = (parentPage: string, subPage: string): string => {
  if (parentPage === 'projects') {
    const subPageMap: Record<string, string> = {
      'content-projects': 'Content Projects',
      'code-projects': 'Code Projects',
    };
    return (
      subPageMap[subPage] || subPage.charAt(0).toUpperCase() + subPage.slice(1)
    );
  }
  return subPage.charAt(0).toUpperCase() + subPage.slice(1);
};

export const getActiveRoute = (routes: IRoute[], pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 2 && segments[0] === 'dashboard') {
    return 'Dashboard';
  }

  if (segments.length >= 3 && segments[0] === 'dashboard') {
    const pageName = getPageDisplayName(segments[2]);
    return pageName;
  }

  return 'Main Dashboard';
};

export const getActiveNavbar = (
  routes: IRoute[],
  pathname: string,
): boolean => {
  const route = findCurrentRoute(routes, pathname);
  return route?.secondary || false;
};

export const getActiveNavbarText = (
  routes: IRoute[],
  pathname: string,
): string | boolean => {
  return getActiveRoute(routes, pathname) || false;
};

export const isRouteActive = (routeName: string, pathname: string): boolean => {
  return pathname?.includes(routeName);
};
