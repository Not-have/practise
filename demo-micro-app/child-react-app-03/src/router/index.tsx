import { createBrowserRouter, type RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    async lazy() {
      const { default: Component } = await import('../components/layout');
      return {
        Component,
      };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { default: Component } = await import('../pages/home');
          return { Component };
        },
      },
      {
        path: 'about',
        async lazy() {
          const { default: Component } = await import('../pages/about');
          return { Component };
        },
      },
      {
        path: 'products',
        async lazy() {
          const { default: Component } = await import('../pages/products');
          return { Component };
        },
      },
      {
        path: 'contact',
        async lazy() {
          const { default: Component } = await import('../pages/contact');
          return { Component };
        },
      },
      {
        path: '*',
        async lazy() {
          const { default: Component } = await import('../pages/not-found');
          return { Component };
        },
      },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  basename: '/child-react-app-03'
});
