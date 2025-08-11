import { createBrowserRouter, type RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    async lazy() {
      const { default: Component } = await import('../components/Layout');
      return {
        Component,
      };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { default: Component } = await import('../pages/Home');
          return { Component };
        },
      },
      {
        path: 'about',
        async lazy() {
          const { default: Component } = await import('../pages/About');
          return { Component };
        },
      },
      {
        path: 'products',
        async lazy() {
          const { default: Component } = await import('../pages/Products');
          return { Component };
        },
      },
      {
        path: 'contact',
        async lazy() {
          const { default: Component } = await import('../pages/Contact');
          return { Component };
        },
      },
      {
        path: '*',
        async lazy() {
          const { default: Component } = await import('../pages/NotFound');
          return { Component };
        },
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
