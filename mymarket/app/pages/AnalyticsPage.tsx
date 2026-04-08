import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  DollarSign,
  Percent,
  Package,
  Users,
  BarChart3
} from 'lucide-react';
import { useTheme } from '../theme/theme-context';
import { KPICard } from '../components/kpi/KPICard';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  ComposedChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

// Mock data dla analityki
const profitabilityByType = [
  { type: 'EUR', buyPrice: 45, sellPrice: 127, margin: 82, marginPercent: 64.6, volume: 450 },
  { type: 'Industrial', buyPrice: 38, sellPrice: 95, margin: 57, marginPercent: 60.0, volume: 280 },
  { type: 'US', buyPrice: 52, sellPrice: 118, margin: 66, marginPercent: 55.9, volume: 120 },
  { type: 'CP', buyPrice: 28, sellPrice: 72, margin: 44, marginPercent: 61.1, volume: 95 },
  { type: 'Niestandardowe', buyPrice: 65, sellPrice: 142, margin: 77, marginPercent: 54.2, volume: 55 },
];

const customerProfitability = [
  { customer: 'Firma ABC Sp. z o.o.', revenue: 125400, cost: 87200, profit: 38200, marginPercent: 30.5, orders: 24 },
  { customer: 'Logistyka XYZ', revenue: 98200, cost: 71500, profit: 26700, marginPercent: 27.2, orders: 18 },
  { customer: 'Transport 24', revenue: 87600, cost: 58900, profit: 28700, marginPercent: 32.8, orders: 16 },
  { customer: 'Magazyny Polski', revenue: 156800, cost: 102400, profit: 54400, marginPercent: 34.7, orders: 32 },
  { customer: 'Hurtownia Palet', revenue: 198500, cost: 145200, profit: 53300, marginPercent: 26.8, orders: 42 },
];

const stockRotation = [
  { type: 'EUR', turnover: 8.5, avgDays: 43, status: 'excellent' },
  { type: 'Industrial', turnover: 6.2, avgDays: 59, status: 'good' },
  { type: 'US', turnover: 4.1, avgDays: 89, status: 'average' },
  { type: 'CP', turnover: 3.8, avgDays: 96, status: 'average' },
  { type: 'Niestandardowe', turnover: 2.4, avgDays: 152, status: 'poor' },
];

const marginTrend = [
  { month: 'Sty', margin: 26.2, revenue: 45000, cost: 33210 },
  { month: 'Lut', margin: 28.1, revenue: 52000, cost: 37388 },
  { month: 'Mar', margin: 27.5, revenue: 48000, cost: 34800 },
  { month: 'Kwi', margin: 29.8, revenue: 61000, cost: 42822 },
  { month: 'Maj', margin: 28.9, revenue: 55000, cost: 39105 },
  { month: 'Cze', margin: 31.2, revenue: 67000, cost: 46096 },
];

const lowMarginAlerts = [
  { order: 'ZAM-2026-087', customer: 'BudMat Sp. z o.o.', type: 'Industrial', margin: 12.5, minMargin: 20, date: '2026-03-05' },
  { order: 'ZAM-2026-091', customer: 'LogTrans', type: 'EUR', margin: 15.2, minMargin: 20, date: '2026-03-05' },
  { order: 'ZAM-2026-094', customer: 'Palety Online', type: 'US', margin: 18.7, minMargin: 20, date: '2026-03-06' },
];

const insights = [
  { 
    type: 'success', 
    title: 'Wzrost marży o 3.1%', 
    description: 'Średnia marża w czerwcu wzrosła do 31.2%, co jest najlepszym wynikiem w tym roku.',
    impact: 'high'
  },
  { 
    type: 'warning', 
    title: 'Niska rotacja palet niestandardowych', 
    description: 'Palety niestandardowe mają rotację tylko 2.4x rocznie. Rozważ optymalizację asortymentu.',
    impact: 'medium'
  },
  { 
    type: 'info', 
    title: 'Najlepszy klient: Magazyny Polski', 
    description: 'Klient generuje 34.7% marży przy wysokim wolumenie zamówień (32/miesiąc).',
    impact: 'high'
  },
  { 
    type: 'error', 
    title: '3 zamówienia poniżej minimalnej marży', 
    description: 'Wykryto sprzedaż z marżą poniżej 20%. Wymaga weryfikacji cennika.',
    impact: 'high'
  },
];

const demandForecast = [
  { month: 'Lip', forecast: 72000, lower: 68000, upper: 76000 },
  { month: 'Sie', forecast: 69000, lower: 65000, upper: 73000 },
  { month: 'Wrz', forecast: 75000, lower: 71000, upper: 79000 },
  { month: 'Paź', forecast: 78000, lower: 74000, upper: 82000 },
];

export function AnalyticsPage() {
  const { colors } = useTheme();

  const rotationColors: Record<string, string> = {
    excellent: colors.success,
    good: colors.info,
    average: colors.warning,
    poor: colors.error,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
          Analityka Business Intelligence
        </h1>
        <p style={{ color: colors.textSecondary }}>
          Zaawansowana analiza rentowności, marż i prognozowanie
        </p>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Średnia marża"
          value="31.2%"
          change="+3.1% vs poprzedni"
          changeType="positive"
          icon={Percent}
        />
        <KPICard
          title="Średnia rotacja"
          value="6.2x/rok"
          change="+0.8x vs poprzedni"
          changeType="positive"
          icon={TrendingUp}
        />
        <KPICard
          title="Najlepsza marża"
          value="EUR: 64.6%"
          description="Najbardziej rentowny typ"
          icon={DollarSign}
        />
        <KPICard
          title="Alerty marży"
          value="3"
          change="Sprzedaż poniżej min."
          changeType="negative"
          icon={AlertCircle}
        />
      </div>

      {/* Insights Section */}
      <div 
        className="rounded-lg p-6 border"
        style={{ 
          backgroundColor: colors.surface,
          borderColor: colors.border 
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5" style={{ color: colors.accent }} />
          <h2 className="text-xl font-semibold" style={{ color: colors.textPrimary }}>
            Kluczowe insighty
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => {
            const insightColors: Record<string, string> = {
              success: colors.success,
              warning: colors.warning,
              info: colors.info,
              error: colors.error,
            };
            const insightColor = insightColors[insight.type];

            return (
              <div 
                key={index}
                className="p-4 rounded-lg border-l-4"
                style={{ 
                  backgroundColor: colors.background,
                  borderLeftColor: insightColor 
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold" style={{ color: colors.textPrimary }}>
                    {insight.title}
                  </h3>
                  <Badge 
                    variant="outline"
                    className="text-xs"
                    style={{ 
                      borderColor: insightColor,
                      color: insightColor 
                    }}
                  >
                    {insight.impact === 'high' ? 'Wysoki wpływ' : 'Średni wpływ'}
                  </Badge>
                </div>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {insight.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <Tabs defaultValue="profitability" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profitability">Rentowność</TabsTrigger>
          <TabsTrigger value="customers">Klienci</TabsTrigger>
          <TabsTrigger value="rotation">Rotacja</TabsTrigger>
          <TabsTrigger value="forecast">Prognoza</TabsTrigger>
        </TabsList>

        {/* Profitability Tab */}
        <TabsContent value="profitability" className="space-y-6">
          {/* Margin Trend */}
          <div 
            className="rounded-lg p-6 border"
            style={{ 
              backgroundColor: colors.surface,
              borderColor: colors.border 
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
              Trend marży w czasie
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={marginTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                <XAxis dataKey="month" stroke={colors.textSecondary} />
                <YAxis yAxisId="left" stroke={colors.textSecondary} />
                <YAxis yAxisId="right" orientation="right" stroke={colors.textSecondary} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  fill={colors.chart2} 
                  fillOpacity={0.3}
                  stroke={colors.chart2}
                  name="Przychód (PLN)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="margin" 
                  stroke={colors.chart1} 
                  strokeWidth={3}
                  name="Marża (%)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Profitability by Type */}
          <div 
            className="rounded-lg p-6 border"
            style={{ 
              backgroundColor: colors.surface,
              borderColor: colors.border 
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
              Rentowność według typu palety
            </h3>
            <div className="space-y-4">
              {profitabilityByType.map((item) => (
                <div key={item.type}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold" style={{ color: colors.textPrimary }}>
                        {item.type}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        Vol: {item.volume} szt
                      </Badge>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold" style={{ color: colors.success }}>
                        {item.marginPercent}%
                      </span>
                      <span className="text-sm ml-2" style={{ color: colors.textSecondary }}>
                        (+{item.margin} PLN)
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span style={{ color: colors.textSecondary }}>
                      Zakup: <span className="font-medium" style={{ color: colors.textPrimary }}>{item.buyPrice} PLN</span>
                    </span>
                    <span style={{ color: colors.textSecondary }}>
                      Sprzedaż: <span className="font-medium" style={{ color: colors.textPrimary }}>{item.sellPrice} PLN</span>
                    </span>
                  </div>
                  <div 
                    className="h-2 rounded-full mt-2"
                    style={{ backgroundColor: colors.border }}
                  >
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${item.marginPercent}%`,
                        backgroundColor: colors.success 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Margin Alerts */}
          <div 
            className="rounded-lg p-6 border"
            style={{ 
              backgroundColor: colors.surface,
              borderColor: colors.border 
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5" style={{ color: colors.error }} />
              <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                Alerty: Sprzedaż poniżej minimalnej marży (20%)
              </h3>
            </div>
            <div className="space-y-3">
              {lowMarginAlerts.map((alert) => (
                <div 
                  key={alert.order}
                  className="p-4 rounded-lg border-l-4"
                  style={{ 
                    backgroundColor: colors.background,
                    borderLeftColor: colors.error 
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold" style={{ color: colors.textPrimary }}>
                          {alert.order}
                        </span>
                        <Badge style={{ backgroundColor: colors.error + '20', color: colors.error }}>
                          Marża: {alert.margin}%
                        </Badge>
                      </div>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>
                        {alert.customer} • {alert.type} • {alert.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <TrendingDown className="w-6 h-6" style={{ color: colors.error }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          <div 
            className="rounded-lg p-6 border"
            style={{ 
              backgroundColor: colors.surface,
              borderColor: colors.border 
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
              Ranking klientów według rentowności
            </h3>
            <div className="space-y-4">
              {customerProfitability
                .sort((a, b) => b.marginPercent - a.marginPercent)
                .map((customer, index) => (
                <div 
                  key={customer.customer}
                  className="p-4 rounded-lg border"
                  style={{ borderColor: colors.border }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
                        style={{ 
                          backgroundColor: index === 0 ? colors.success : colors.background,
                          color: index === 0 ? colors.successForeground : colors.textPrimary 
                        }}
                      >
                        #{index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold" style={{ color: colors.textPrimary }}>
                          {customer.customer}
                        </h4>
                        <p className="text-sm" style={{ color: colors.textSecondary }}>
                          {customer.orders} zamówień w miesiącu
                        </p>
                      </div>
                    </div>
                    <Badge style={{ backgroundColor: colors.success + '20', color: colors.success }}>
                      Marża: {customer.marginPercent}%
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p style={{ color: colors.textSecondary }}>Przychód</p>
                      <p className="font-semibold" style={{ color: colors.textPrimary }}>
                        {customer.revenue.toLocaleString('pl-PL')} PLN
                      </p>
                    </div>
                    <div>
                      <p style={{ color: colors.textSecondary }}>Koszt</p>
                      <p className="font-semibold" style={{ color: colors.textPrimary }}>
                        {customer.cost.toLocaleString('pl-PL')} PLN
                      </p>
                    </div>
                    <div>
                      <p style={{ color: colors.textSecondary }}>Zysk</p>
                      <p className="font-semibold" style={{ color: colors.success }}>
                        {customer.profit.toLocaleString('pl-PL')} PLN
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Rotation Tab */}
        <TabsContent value="rotation" className="space-y-6">
          <div 
            className="rounded-lg p-6 border"
            style={{ 
              backgroundColor: colors.surface,
              borderColor: colors.border 
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
              Rotacja zapasów według typu
            </h3>
            <div className="space-y-4">
              {stockRotation.map((item) => (
                <div 
                  key={item.type}
                  className="p-4 rounded-lg border"
                  style={{ borderColor: colors.border }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5" style={{ color: rotationColors[item.status] }} />
                      <span className="font-semibold" style={{ color: colors.textPrimary }}>
                        {item.type}
                      </span>
                    </div>
                    <Badge style={{ 
                      backgroundColor: rotationColors[item.status] + '20', 
                      color: rotationColors[item.status] 
                    }}>
                      {item.status === 'excellent' ? 'Doskonała' : 
                       item.status === 'good' ? 'Dobra' :
                       item.status === 'average' ? 'Średnia' : 'Słaba'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                        Rotacja roczna
                      </p>
                      <p className="text-2xl font-semibold" style={{ color: colors.textPrimary }}>
                        {item.turnover}x
                      </p>
                    </div>
                    <div>
                      <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                        Średni czas magazynowania
                      </p>
                      <p className="text-2xl font-semibold" style={{ color: colors.textPrimary }}>
                        {item.avgDays} dni
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Forecast Tab */}
        <TabsContent value="forecast" className="space-y-6">
          <div 
            className="rounded-lg p-6 border"
            style={{ 
              backgroundColor: colors.surface,
              borderColor: colors.border 
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
              Prognoza zapotrzebowania (następne 4 miesiące)
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={demandForecast}>
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
                <Area 
                  type="monotone" 
                  dataKey="upper" 
                  fill={colors.info} 
                  fillOpacity={0.1}
                  stroke="none"
                  name="Górny zakres"
                />
                <Area 
                  type="monotone" 
                  dataKey="lower" 
                  fill={colors.background} 
                  fillOpacity={1}
                  stroke="none"
                  name="Dolny zakres"
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke={colors.chart1} 
                  strokeWidth={3}
                  name="Prognoza (PLN)"
                />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: colors.background }}>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                <strong style={{ color: colors.textPrimary }}>Prognoza oparta na:</strong> historycznych danych sprzedaży, sezonowości, trendów rynkowych i wskaźników makroekonomicznych. Przedział ufności: 95%.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
