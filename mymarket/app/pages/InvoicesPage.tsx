import { FileText, Eye, Download, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
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

const invoices = [
  { 
    id: 'FV/2026/001',
    customer: 'Firma ABC Sp. z o.o.',
    date: '2026-03-06',
    dueDate: '2026-03-20',
    amount: 12450,
    status: 'issued',
    order: 'ZAM-2026-001'
  },
  { 
    id: 'FV/2026/002',
    customer: 'Logistyka XYZ',
    date: '2026-03-05',
    dueDate: '2026-03-19',
    amount: 8900,
    status: 'paid',
    order: 'ZAM-2026-002'
  },
  { 
    id: 'FV/2026/003',
    customer: 'Transport 24',
    date: '2026-02-20',
    dueDate: '2026-03-06',
    amount: 15200,
    status: 'overdue',
    order: 'ZAM-2026-003'
  },
];

export function InvoicesPage() {
  const { colors } = useTheme();

  const statusLabels: Record<string, string> = {
    issued: 'Wystawiona',
    paid: 'Opłacona',
    overdue: 'Przeterminowana',
  };

  const statusColors: Record<string, string> = {
    issued: colors.info,
    paid: colors.success,
    overdue: colors.error,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
          Faktury
        </h1>
        <p style={{ color: colors.textSecondary }}>
          Zarządzanie fakturami sprzedaży
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Wystawione', count: invoices.filter(i => i.status === 'issued').length, color: colors.info, icon: Clock },
          { label: 'Opłacone', count: invoices.filter(i => i.status === 'paid').length, color: colors.success, icon: CheckCircle },
          { label: 'Przeterminowane', count: invoices.filter(i => i.status === 'overdue').length, color: colors.error, icon: AlertTriangle },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label}
              className="rounded-lg p-4 border"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                  {stat.label}
                </p>
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-semibold" style={{ color: stat.color }}>
                {stat.count}
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: colors.border }}>
              <TableHead style={{ color: colors.textSecondary }}>Nr faktury</TableHead>
              <TableHead style={{ color: colors.textSecondary }}>Klient</TableHead>
              <TableHead style={{ color: colors.textSecondary }}>Data wystawienia</TableHead>
              <TableHead style={{ color: colors.textSecondary }}>Termin płatności</TableHead>
              <TableHead style={{ color: colors.textSecondary }}>Kwota</TableHead>
              <TableHead style={{ color: colors.textSecondary }}>Status</TableHead>
              <TableHead style={{ color: colors.textSecondary }}>Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id} style={{ borderColor: colors.border }}>
                <TableCell className="font-medium" style={{ color: colors.textPrimary }}>
                  {invoice.id}
                </TableCell>
                <TableCell style={{ color: colors.textPrimary }}>{invoice.customer}</TableCell>
                <TableCell style={{ color: colors.textSecondary }}>{invoice.date}</TableCell>
                <TableCell style={{ color: colors.textSecondary }}>{invoice.dueDate}</TableCell>
                <TableCell className="font-semibold" style={{ color: colors.textPrimary }}>
                  {invoice.amount.toLocaleString('pl-PL')} PLN
                </TableCell>
                <TableCell>
                  <Badge style={{ backgroundColor: statusColors[invoice.status] + '20', color: statusColors[invoice.status] }}>
                    {statusLabels[invoice.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
