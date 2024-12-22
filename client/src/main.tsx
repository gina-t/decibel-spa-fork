import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AcceptedUsersProvider } from './context/AcceptedUsersContext';
import './index.css';
import App from './App';
import AlbumSearchPage from './pages/AlbumSearchPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import PlayListsPage from './pages/PlayListsPage';
import LearnMorePage from './pages/LearnMorePage';
import Callback from './components/Callback';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/album-search',
        element: <AlbumSearchPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/registration',
        element: <RegistrationPage />,
      },
      {
        path: '/playlists',
        element: <PlayListsPage />,
      },
      {
        path: '/learn-more',
        element: <LearnMorePage />,
      },
      {
        path: '/callback',
        element: <Callback />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AcceptedUsersProvider>
        <RouterProvider router={router} />
      </AcceptedUsersProvider>
    </StrictMode>
  );
}
