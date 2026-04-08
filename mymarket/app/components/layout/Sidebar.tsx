import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Warehouse, 
  FileText, 
  Users, 
  BarChart3, 
  Settings,
  TrendingUp,
  QrCode,
  Handshake,
  CreditCard,
  UserCog
} from 'lucide-react';
import { useTheme } from '../../theme/theme-context';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  role?: string[];
}

const navigation: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Zamówienia', href: '/orders', icon: ShoppingCart },
  { label: 'Skup palet', href: '/buyback', icon: Handshake },
  { label: 'Magazyn', href: '/warehouse', icon: Warehouse },
  { label: 'Produkty', href: '/products', icon: Package },
  { label: 'Faktury', href: '/invoices', icon: FileText },
  { label: 'Klienci', href: '/customers', icon: Users },
  { label: 'Analityka BI', href: '/analytics', icon: BarChart3 },
  { label: 'Skaner QR', href: '/qr-scanner', icon: QrCode },
  { label: 'Subskrypcje', href: '/subscriptions', icon: CreditCard },
  { label: 'Rentowność', href: '/profitability', icon: TrendingUp },
  { label: 'Użytkownicy', href: '/users', icon: UserCog },
  { label: 'Ustawienia', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const { colors } = useTheme();

  return (
    <aside 
      className="w-64 h-screen flex-shrink-0 border-r overflow-y-auto"
      style={{ 
        backgroundColor: colors.surface,
        borderColor: colors.border 
      }}
    >
      {/* Logo */}
      <div 
        className="h-16 flex items-center px-6 border-b"
        style={{ borderColor: colors.border }}
      >
        <Package className="w-8 h-8 mr-3" style={{ color: colors.primary }} />
        <span 
          className="text-xl font-semibold"
          style={{ color: colors.textPrimary }}
        >
          Pallettes
        </span>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center px-4 py-3 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: isActive ? colors.primary : 'transparent',
                color: isActive ? colors.primaryForeground : colors.textSecondary,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = colors.background;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}