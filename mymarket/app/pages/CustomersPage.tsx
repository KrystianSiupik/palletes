import { Users, Plus, Mail, Phone, MapPin, TrendingUp } from 'lucide-react';
import { useTheme } from '../theme/theme-context';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Search } from 'lucide-react';

const customers = [
  {
    id: 'CLI-001',
    name: 'Firma ABC Sp. z o.o.',
    nip: '1234567890',
    email: 'kontakt@firmaabc.pl',
    phone: '+48 123 456 789',
    address: 'ul. Przemysłowa 15, Warszawa',
    orders: 24,
    revenue: 125400,
    margin: 30.5,
    status: 'vip'
  },
  {
    id: 'CLI-002',
    name: 'Logistyka XYZ',
    nip: '0987654321',
    email: 'biuro@logistykaxyz.pl',
    phone: '+48 987 654 321',
    address: 'ul. Magazynowa 8, Poznań',
    orders: 18,
    revenue: 98200,
    margin: 27.2,
    status: 'regular'
  },
  {
    id: 'CLI-003',
    name: 'Transport 24',
    nip: '5432167890',
    email: 'info@transport24.pl',
    phone: '+48 555 666 777',
    address: 'ul. Logistyczna 22, Katowice',
    orders: 16,
    revenue: 87600,
    margin: 32.8,
    status: 'regular'
  },
];

export function CustomersPage() {
  const { colors } = useTheme();

  const statusLabels: Record<string, string> = {
    vip: 'VIP',
    regular: 'Standardowy',
    new: 'Nowy',
  };

  const statusColors: Record<string, string> = {
    vip: colors.accent,
    regular: colors.info,
    new: colors.success,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
            Klienci
          </h1>
          <p style={{ color: colors.textSecondary }}>
            Moduł CRM - zarządzanie relacjami z klientami
          </p>
        </div>
        <Button className="gap-2" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
          <Plus className="w-4 h-4" />
          Nowy klient
        </Button>
      </div>

      <div className="rounded-lg p-4 border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: colors.textSecondary }} />
          <Input placeholder="Szukaj klienta..." className="pl-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {customers.map((customer) => (
          <div 
            key={customer.id}
            className="rounded-lg p-6 border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.primary + '15' }}
                >
                  <Users className="w-8 h-8" style={{ color: colors.primary }} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold" style={{ color: colors.textPrimary }}>
                      {customer.name}
                    </h3>
                    <Badge style={{ 
                      backgroundColor: statusColors[customer.status] + '20',
                      color: statusColors[customer.status]
                    }}>
                      {statusLabels[customer.status]}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p style={{ color: colors.textSecondary }}>
                      <strong>NIP:</strong> {customer.nip}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-2" style={{ color: colors.textSecondary }}>
                        <Mail className="w-4 h-4" />
                        {customer.email}
                      </span>
                      <span className="flex items-center gap-2" style={{ color: colors.textSecondary }}>
                        <Phone className="w-4 h-4" />
                        {customer.phone}
                      </span>
                    </div>
                    <p className="flex items-center gap-2" style={{ color: colors.textSecondary }}>
                      <MapPin className="w-4 h-4" />
                      {customer.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t" style={{ borderColor: colors.border }}>
              <div>
                <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                  Zamówienia (miesiąc)
                </p>
                <p className="text-2xl font-semibold" style={{ color: colors.textPrimary }}>
                  {customer.orders}
                </p>
              </div>
              <div>
                <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                  Przychód
                </p>
                <p className="text-2xl font-semibold" style={{ color: colors.success }}>
                  {customer.revenue.toLocaleString('pl-PL')} PLN
                </p>
              </div>
              <div>
                <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                  Średnia marża
                </p>
                <p className="text-2xl font-semibold flex items-center gap-2" style={{ color: colors.success }}>
                  {customer.margin}%
                  <TrendingUp className="w-5 h-5" />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
