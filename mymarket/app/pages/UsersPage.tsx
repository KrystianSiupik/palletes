import { Users, Plus, Shield, Mail, Calendar } from 'lucide-react';
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

const users = [
  {
    id: 'USR-001',
    name: 'Jan Kowalski',
    email: 'jan.kowalski@pallettes.pl',
    role: 'admin',
    status: 'active',
    lastLogin: '2026-03-06 10:30',
    created: '2025-01-15'
  },
  {
    id: 'USR-002',
    name: 'Anna Nowak',
    email: 'anna.nowak@pallettes.pl',
    role: 'sales',
    status: 'active',
    lastLogin: '2026-03-06 09:15',
    created: '2025-02-20'
  },
  {
    id: 'USR-003',
    name: 'Piotr Wiśniewski',
    email: 'piotr.wisniewski@pallettes.pl',
    role: 'warehouse',
    status: 'active',
    lastLogin: '2026-03-05 16:45',
    created: '2025-03-10'
  },
  {
    id: 'USR-004',
    name: 'Maria Kowalczyk',
    email: 'maria.kowalczyk@pallettes.pl',
    role: 'manager',
    status: 'active',
    lastLogin: '2026-03-05 14:20',
    created: '2025-01-20'
  },
];

const roles = [
  {
    name: 'Administrator',
    key: 'admin',
    description: 'Pełny dostęp do wszystkich funkcji systemu',
    permissions: ['all'],
    color: '#ef4444'
  },
  {
    name: 'Manager / Właściciel',
    key: 'manager',
    description: 'Dostęp do analityki, raportów i zarządzania',
    permissions: ['analytics', 'reports', 'users', 'settings'],
    color: '#3b82f6'
  },
  {
    name: 'Pracownik sprzedaży',
    key: 'sales',
    description: 'Zarządzanie zamówieniami, klientami i fakturami',
    permissions: ['orders', 'customers', 'invoices'],
    color: '#10b981'
  },
  {
    name: 'Magazynier',
    key: 'warehouse',
    description: 'Zarządzanie magazynem i ruchami towarów',
    permissions: ['warehouse', 'products', 'qr'],
    color: '#f59e0b'
  },
  {
    name: 'Klient',
    key: 'customer',
    description: 'Zamawianie palet online, podgląd zamówień',
    permissions: ['orders_view', 'profile'],
    color: '#64748b'
  },
];

export function UsersPage() {
  const { colors } = useTheme();

  const roleLabels: Record<string, string> = {
    admin: 'Administrator',
    manager: 'Manager',
    sales: 'Sprzedaż',
    warehouse: 'Magazynier',
    customer: 'Klient',
  };

  const roleColors: Record<string, string> = {
    admin: '#ef4444',
    manager: '#3b82f6',
    sales: '#10b981',
    warehouse: '#f59e0b',
    customer: '#64748b',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
            Użytkownicy i role
          </h1>
          <p style={{ color: colors.textSecondary }}>
            Zarządzanie użytkownikami i uprawnieniami w systemie
          </p>
        </div>
        <Button className="gap-2" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
          <Plus className="w-4 h-4" />
          Nowy użytkownik
        </Button>
      </div>

      {/* Roles Overview */}
      <div>
        <h2 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
          Role systemowe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role) => (
            <div 
              key={role.key}
              className="rounded-lg p-4 border"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: role.color + '20' }}
                >
                  <Shield className="w-5 h-5" style={{ color: role.color }} />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: colors.textPrimary }}>
                    {role.name}
                  </h3>
                  <Badge 
                    className="text-xs"
                    style={{ backgroundColor: role.color + '20', color: role.color }}
                  >
                    {users.filter(u => u.role === role.key).length} użytkowników
                  </Badge>
                </div>
              </div>
              <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
                {role.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {role.permissions.map((perm) => (
                  <span 
                    key={perm}
                    className="text-xs px-2 py-1 rounded"
                    style={{ backgroundColor: colors.background, color: colors.textSecondary }}
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div>
        <h2 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
          Lista użytkowników
        </h2>
        <div 
          className="rounded-lg border overflow-hidden"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: colors.border }}>
                <TableHead style={{ color: colors.textSecondary }}>Użytkownik</TableHead>
                <TableHead style={{ color: colors.textSecondary }}>Email</TableHead>
                <TableHead style={{ color: colors.textSecondary }}>Rola</TableHead>
                <TableHead style={{ color: colors.textSecondary }}>Status</TableHead>
                <TableHead style={{ color: colors.textSecondary }}>Ostatnie logowanie</TableHead>
                <TableHead style={{ color: colors.textSecondary }}>Data utworzenia</TableHead>
                <TableHead style={{ color: colors.textSecondary }}>Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} style={{ borderColor: colors.border }}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: roleColors[user.role] + '20' }}
                      >
                        <Users className="w-5 h-5" style={{ color: roleColors[user.role] }} />
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: colors.textPrimary }}>
                          {user.name}
                        </p>
                        <p className="text-xs" style={{ color: colors.textSecondary }}>
                          {user.id}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" style={{ color: colors.textSecondary }} />
                      <span className="text-sm" style={{ color: colors.textSecondary }}>
                        {user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge style={{ 
                      backgroundColor: roleColors[user.role] + '20',
                      color: roleColors[user.role]
                    }}>
                      {roleLabels[user.role]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge style={{ 
                      backgroundColor: colors.success + '20',
                      color: colors.success
                    }}>
                      Aktywny
                    </Badge>
                  </TableCell>
                  <TableCell style={{ color: colors.textSecondary }}>
                    {user.lastLogin}
                  </TableCell>
                  <TableCell style={{ color: colors.textSecondary }}>
                    {user.created}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Edytuj
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
