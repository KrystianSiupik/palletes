import { 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  DollarSign
} from 'lucide-react';
import { useTheme } from '../theme/theme-context';
import { KPICard } from '../components/kpi/KPICard';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from '../components/ui/badge';

// Mock data
const recentOrders = [
  { id: 'ZAM-2026-001', customer: 'Firma ABC Sp. z o.o.', amount: '12 450 PLN', status: 'new', date: '2026-03-06' },
  { id: 'ZAM-2026-002', customer: 'Logistyka XYZ', amount: '8 900 PLN', status: 'inProgress', date: '2026-03-06' },
  { id: 'ZAM-2026-003', customer: 'Transport 24', amount: '15 200 PLN', status: 'completed', date: '2026-03-05' },
  { id: 'ZAM-2026-004', customer: 'Magazyny Polski', amount: '22 100 PLN', status: 'inProgress', date: '2026-03-05' },
];

const salesData = [
  { month: 'Sty', revenue: 45000, orders: 120 },
  { month: 'Lut', revenue: 52000, orders: 145 },
  { month: 'Mar', revenue: 48000, orders: 132 },
  { month: 'Kwi', revenue: 61000, orders: 168 },
  { month: 'Maj', revenue: 55000, orders: 152 },
  { month: 'Cze', revenue: 67000, orders: 185 },
];

const stockData = [
  { name: 'EUR', value: 450, color: '#1e3a8a' },
  { name: 'Industrial', value: 280, color: '#3b82f6' },
  { name: 'US', value: 120, color: '#64748b' },
  { name: 'CP', value: 95, color: '#10b981' },
];

const alerts = [
  { id: 1, type: 'warning', message: 'Niski stan magazynowy: Palety EUR (tylko 45 szt.)', time: '15 min temu' },
  { id: 2, type: 'info', message: 'Nowe zamówienie od Firma ABC Sp. z o.o.', time: '1 godz. temu' },
  { id: 3, type: 'error', message: 'Przeterminowana faktura: FV/2026/234', time: '2 godz. temu' },
];

export function DashboardPage() {
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
      <div>
        <h1 className="text-3xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
          Dashboard
        </h1>
        <p style={{ color: colors.textSecondary }}>
          Przegląd kluczowych wskaźników i aktywności systemu
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Zamówienia (miesiąc)"
          value="185"
          change="+12.5% vs poprzedni"
          changeType="positive"
          icon={ShoppingCart}
        />
        <KPICard
          title="Stan magazynowy"
          value="945 szt"
          change="-8.2% vs poprzedni"
          changeType="negative"
          icon={Package}
          description="Łączna liczba palet"
        />
        <KPICard
          title="Przychód (miesiąc)"
          value="67 000 PLN"
          change="+21.8% vs poprzedni"
          changeType="positive"
          icon={DollarSign}
        />
        <KPICard
          title="Marża średnia"
          value="28.5%"
          change="+2.1% vs poprzedni"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div 
          className="rounded-lg p-6 border"
          style={{ 
            backgroundColor: colors.surface,
            borderColor: colors.border 
          }}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
            Przychody i zamówienia
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="month" stroke={colors.textSecondary} />
              <YAxis stroke={colors.textSecondary} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke={colors.chart1} 
                strokeWidth={2}
                name="Przychód (PLN)"
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke={colors.chart2} 
                strokeWidth={2}
                name="Zamówienia"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Distribution */}
        <div 
          className="rounded-lg p-6 border"
          style={{ 
            backgroundColor: colors.surface,
            borderColor: colors.border 
          }}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
            Rozkład zapasów według typu
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stockData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {stockData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div 
          className="lg:col-span-2 rounded-lg p-6 border"
          style={{ 
            backgroundColor: colors.surface,
            borderColor: colors.border 
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
              Ostatnie zamówienia
            </h3>
            <a href="/orders" className="text-sm font-medium hover:underline" style={{ color: colors.accent }}>
              Zobacz wszystkie
            </a>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div 
                key={order.id}
                className="flex items-center justify-between p-4 rounded-lg border"
                style={{ borderColor: colors.border }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold" style={{ color: colors.textPrimary }}>
                      {order.id}
                    </span>
                    <Badge style={{ backgroundColor: statusColors[order.status] + '20', color: statusColors[order.status] }}>
                      {statusLabels[order.status]}
                    </Badge>
                  </div>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {order.customer}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold" style={{ color: colors.textPrimary }}>
                    {order.amount}
                  </p>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {order.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div 
          className="rounded-lg p-6 border"
          style={{ 
            backgroundColor: colors.surface,
            borderColor: colors.border 
          }}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
            Alerty
          </h3>
          <div className="space-y-3">
            {alerts.map((alert) => {
              const alertColors = {
                warning: colors.warning,
                info: colors.info,
                error: colors.error,
              };
              const alertColor = alertColors[alert.type as keyof typeof alertColors];

              return (
                <div 
                  key={alert.id}
                  className="p-3 rounded-lg border-l-4"
                  style={{ 
                    backgroundColor: colors.background,
                    borderLeftColor: alertColor 
                  }}
                >
                  <p className="text-sm font-medium mb-1" style={{ color: colors.textPrimary }}>
                    {alert.message}
                  </p>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>
                    {alert.time}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
