import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChatGPT from '@/pages/ChatGPT';
import ImageGen from '@/pages/ImageGen';
import AllHistory from '@/pages/AllHistory';
import Page500 from '@/components/Page500';
import BaseLayout from '@/components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <ChatGPT />,
        errorElement: <Page500 />,
      },
      {
        path: '/image',
        element: <ImageGen />,
        errorElement: <Page500 />,
      },
      {
        path: '/history',
        element: <AllHistory />,
        errorElement: <Page500 />,
      },
      {
        path: '/history/:id',
        element: <AllHistory />,
        errorElement: <Page500 />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
