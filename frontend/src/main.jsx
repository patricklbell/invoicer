import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as yup from 'yup';
import './main.css';

import ErrorPage from 'routes/error-page';
import App from 'routes/app';
import Home from 'routes/home';
import React from 'react';
import Login from 'routes/login';
import Signup from 'routes/signup';
import Dashboard from 'routes/root/dashboard';
import Search from 'routes/root/search';
import Settings from 'routes/root/settings';
import SettingsPage from 'routes/root/settings/settings-page';
import View from 'routes/root/view';
import Edit from 'routes/root/edit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'search',
        element: <Search />
      },
      {
        path: 'view',
        element: <View />
      },
      {
        path: 'edit',
        element: <Edit />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'settings',
        children: [
          {
            path: 'email',
            element: (
              <SettingsPage
                title="Email"
                properties={['email']}
                schema={(user) =>
                  yup.object({
                    email: yup
                      .string()
                      .email('Invalid email')
                      .test(
                        'same',
                        'Please enter a different email',
                        (v) => v != user?.email
                      )
                      .required('Enter a new email')
                  })
                }
              />
            )
          },
          {
            path: 'username',
            element: (
              <SettingsPage
                title="Username"
                properties={['username']}
                schema={(user) =>
                  yup.object({
                    username: yup
                      .string()
                      .test(
                        'same',
                        'Please enter a different username',
                        (v) => v != user?.username
                      )
                      .required('Enter a new username')
                  })
                }
              />
            )
          },
          {
            path: 'name',
            element: (
              <SettingsPage
                title="Name"
                properties={['firstname', 'lastname']}
                names={['Firstname', 'Surname']}
                schema={(user) =>
                  yup.object({
                    firstname: yup
                      .string()
                      .test(
                        'same',
                        'Please enter a different firstname',
                        (v) => v != user?.firstname
                      )
                      .required('A firstname is required'),
                    lastname: yup
                      .string()
                      .test(
                        'same',
                        'Please enter a different surname',
                        (v) => v != user?.lastname
                      )
                      .required('A surname is required')
                  })
                }
              />
            )
          }
        ]
      }
    ]
  }
]);

const Main = () => {
  return (
    <div className="bg-background text-foreground fill-foreground stroke-foreground">
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
