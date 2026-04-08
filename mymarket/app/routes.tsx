import { createBrowserRouter } from 'react-router';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { OrdersPage } from './pages/OrdersPage';
import { BuybackPage } from './pages/BuybackPage';
import { WarehousePage } from './pages/WarehousePage';
import { InvoicesPage } from './pages/InvoicesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProductsPage } from './pages/ProductsPage';
import { CustomersPage } from './pages/CustomersPage';
import { QRScannerPage } from './pages/QRScannerPage';
import { UsersPage } from './pages/UsersPage';
import { SubscriptionsPage } from './pages/SubscriptionsPage';
import { ProfitabilityPage } from './pages/ProfitabilityPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: 'orders', Component: OrdersPage },
      { path: 'buyback', Component: BuybackPage },
      { path: 'warehouse', Component: WarehousePage },
      { path: 'products', Component: ProductsPage },
      { path: 'invoices', Component: InvoicesPage },
      { path: 'customers', Component: CustomersPage },
      { path: 'analytics', Component: AnalyticsPage },
      { path: 'qr-scanner', Component: QRScannerPage },
      { path: 'users', Component: UsersPage },
      { path: 'settings', Component: SettingsPage },
      { path: 'subscriptions', Component: SubscriptionsPage },
      { path: 'profitability', Component: ProfitabilityPage },
    ],
  },
]);
