import { ArrowLeft, Package, User, Calendar, CreditCard, FileText, MapPin, Truck } from 'lucide-react';
import { useTheme } from '../theme/theme-context';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

// Mock order data
const order = {
  id: 'ZAM-2026-001',
  date: '2026-03-06',
  status: 'inProgress',
  customer: {
    name: 'Firma ABC Sp. z o.o.',
    nip: '1234567890',
    email: 'kontakt@firmaabc.pl',
    phone: '+48 123 456 789',
    address: 'ul. Przemysłowa 15, 00-100 Warszawa',
  },
  items: [
    { id: 1, type: 'EUR', quantity: 100, price: 127, total: 12700 },
    { id: 2, type: 'Industrial', quantity: 50, price: 95, total: 4750 },
  ],
  subtotal: 17450,
  tax: 4013.50,
  total: 21463.50,
  payment: {
    method: 'Przelew',
    status: 'pending',
    dueDate: '2026-03-20',
  },
  delivery: {
    address: 'ul. Przemysłowa 15, 00-100 Warszawa',
    date: '2026-03-08',
    method: 'Transport własny',
  },
  notes: 'Palety mają być dostarczane w godzinach 8:00-14:00',
};

export function OrderDetailPage() {
  const { colors } = useTheme();

  const statusLabels: Record<string, string> = {
    new: 'Nowe',
    inProgress: 'W realizacji',
    completed: 'Zrealizowane',
    cancelled: 'Anulowane',
  };

  const statusColors: Record<string, string> = {
    new: colors.statusNew,
    inProgress: colors.statusInProgress,
    completed: colors.statusCompleted,
    cancelled: colors.statusCancelled,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-semibold mb-1" style={{ color: colors.textPrimary }}>
              {order.id}
            </h1>
            <div className="flex items-center gap-3">
              <Badge style={{ 
                backgroundColor: statusColors[order.status] + '20', 
                color: statusColors[order.status] 
              }}>
                {statusLabels[order.status]}
              </Badge>
              <span className="text-sm" style={{ color: colors.textSecondary }}>
                {order.date}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Anuluj zamówienie</Button>
          <Button style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
            <FileText className="w-4 h-4 mr-2" />
            Generuj fakturę
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div 
            className="rounded-lg border overflow-hidden"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <div className="p-6 border-b" style={{ borderColor: colors.border }}>
              <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: colors.textPrimary }}>
                <Package className="w-5 h-5" />
                Pozycje zamówienia
              </h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: colors.border }}>
                  <TableHead style={{ color: colors.textSecondary }}>Typ palety</TableHead>
                  <TableHead style={{ color: colors.textSecondary }}>Ilość</TableHead>
                  <TableHead style={{ color: colors.textSecondary }}>Cena jedn.</TableHead>
                  <TableHead className="text-right" style={{ color: colors.textSecondary }}>Wartość</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id} style={{ borderColor: colors.border }}>
                    <TableCell className="font-medium" style={{ color: colors.textPrimary }}>
                      {item.type}
                    </TableCell>
                    <TableCell style={{ color: colors.textPrimary }}>
                      {item.quantity} szt
                    </TableCell>
                    <TableCell style={{ color: colors.textPrimary }}>
                      {item.price} PLN
                    </TableCell>
                    <TableCell className="text-right font-semibold" style={{ color: colors.textPrimary }}>
                      {item.total.toLocaleString('pl-PL')} PLN
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-6 border-t space-y-2" style={{ borderColor: colors.border }}>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Suma netto:</span>
                <span className="font-medium" style={{ color: colors.textPrimary }}>
                  {order.subtotal.toLocaleString('pl-PL')} PLN
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>VAT (23%):</span>
                <span className="font-medium" style={{ color: colors.textPrimary }}>
                  {order.tax.toLocaleString('pl-PL')} PLN
                </span>
              </div>
              <div className="h-px my-2" style={{ backgroundColor: colors.border }} />
              <div className="flex justify-between">
                <span className="font-semibold text-lg" style={{ color: colors.textPrimary }}>
                  Suma brutto:
                </span>
                <span className="font-semibold text-lg" style={{ color: colors.success }}>
                  {order.total.toLocaleString('pl-PL')} PLN
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div 
            className="rounded-lg p-6 border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.textPrimary }}>
              <Truck className="w-5 h-5" />
              Dostawa
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5" style={{ color: colors.textSecondary }} />
                <div>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>Adres dostawy</p>
                  <p className="font-medium" style={{ color: colors.textPrimary }}>
                    {order.delivery.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 mt-0.5" style={{ color: colors.textSecondary }} />
                <div>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>Data dostawy</p>
                  <p className="font-medium" style={{ color: colors.textPrimary }}>
                    {order.delivery.date}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 mt-0.5" style={{ color: colors.textSecondary }} />
                <div>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>Metoda dostawy</p>
                  <p className="font-medium" style={{ color: colors.textPrimary }}>
                    {order.delivery.method}
                  </p>
                </div>
              </div>
            </div>
            {order.notes && (
              <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
                <p className="text-sm font-medium mb-1" style={{ color: colors.textPrimary }}>
                  Uwagi do zamówienia:
                </p>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {order.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div 
            className="rounded-lg p-6 border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.textPrimary }}>
              <User className="w-5 h-5" />
              Klient
            </h3>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-lg mb-1" style={{ color: colors.textPrimary }}>
                  {order.customer.name}
                </p>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  NIP: {order.customer.nip}
                </p>
              </div>
              <div className="space-y-1 text-sm">
                <p style={{ color: colors.textSecondary }}>{order.customer.email}</p>
                <p style={{ color: colors.textSecondary }}>{order.customer.phone}</p>
                <p style={{ color: colors.textSecondary }}>{order.customer.address}</p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div 
            className="rounded-lg p-6 border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.textPrimary }}>
              <CreditCard className="w-5 h-5" />
              Płatność
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>Metoda płatności</p>
                <p className="font-medium" style={{ color: colors.textPrimary }}>
                  {order.payment.method}
                </p>
              </div>
              <div>
                <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>Status płatności</p>
                <Badge style={{ 
                  backgroundColor: order.payment.status === 'pending' ? colors.warning + '20' : colors.success + '20',
                  color: order.payment.status === 'pending' ? colors.warning : colors.success
                }}>
                  {order.payment.status === 'pending' ? 'Oczekująca' : 'Opłacona'}
                </Badge>
              </div>
              <div>
                <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>Termin płatności</p>
                <p className="font-medium" style={{ color: colors.textPrimary }}>
                  {order.payment.dueDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
