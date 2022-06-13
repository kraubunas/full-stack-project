import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import HomePage from './pages/home-page';
import ProductsPage from './pages/product-page';
import LandingPageLayout from './components/landing-page-layout';
import AboutPage from './pages/about-page';
import LoginPage from './pages/login-page';
import CreateProduct from './pages/add-new-product-page';
import RegisterPage from './pages/register-page';
import RequireAuth from './routing/require-auth';
import RequireVisitor from './routing/require-visitor';
import store from './store/index';
import DeleteUpdateProductsPage from './pages/update-products-page';

const App: React.FC = () => (

  <ReduxProvider store={store}>
    <Routes>
      <Route path="/" element={<LandingPageLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="auth/login"
          element={(
            <RequireVisitor>
              <LoginPage />
            </RequireVisitor>
          )}
        />
        <Route
          path="auth/register"
          element={(
            <RequireVisitor>
              <RegisterPage />
            </RequireVisitor>
          )}
        />
        <Route
          path="add-new-product"
          element={(
            <RequireAuth>
              <CreateProduct />
            </RequireAuth>
          )}
        />
        <Route
          path="update-products"
          element={(
            <RequireAuth>
              <DeleteUpdateProductsPage />
            </RequireAuth>
          )}
        />
      </Route>
    </Routes>
  </ReduxProvider>
);

export default App;
