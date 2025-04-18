import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/Login.tsx';
import RegisterPage from './pages/Register.tsx';
import { Toaster } from "@/components/ui/toaster"
import Setting from './pages/Settings.tsx';
import List from './pages/List.tsx';
import Product from './pages/Product.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ForgotPasswordPage from './pages/ForgotPassword.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement : <div>Error : </div>
  },
  {
    path: "/auth/login",
    element: <LoginPage />
  },
  {
    path: "/auth/register",
    element: <RegisterPage />
  },
  {
    path: "/auth/forgot",
    element: <ForgotPasswordPage />
  },
  {
    path: "/settings",
    element: <Setting />
  },
  {
    path: '/list',
    element: <List />
  },
  {
    path: "/product/:id",
    element: <Product />,

  }
])

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: 1000
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
      <ReactQueryDevtools client={queryClient} /> 
    </QueryClientProvider>
  </React.StrictMode>,
)
