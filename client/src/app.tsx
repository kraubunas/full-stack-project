import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
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
import store, { useRootSelector } from './store/index';
import DeleteUpdateProductsPage from './pages/update-products-page';
import { createAuthenticateActionThunk } from './store/actions-creators';
import { useRootDispatch } from './store/hooks';
import { selectAuthToken, selectAuthLoggedIn } from './store/selectors';
import { cartFetchItemsActionThunk } from './store/features/cart/cart-action-creators';

const App: React.FC = () => {
  const location = useLocation();
  const token = useRootSelector(selectAuthToken);
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const dispatch = useRootDispatch();

  useEffect(() => {
    if (loggedIn) {
      dispatch(cartFetchItemsActionThunk);
    }
  }, [loggedIn]);

  if (!loggedIn && token) {
    dispatch(createAuthenticateActionThunk(token, location.pathname));
    return <div />;
  }

  return (
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
};

export default App;
