import { Package, AlertTriangle, CheckCircle, Search, QrCode, Download, Upload } from 'lucide-react';
import { useTheme } from '../theme/theme-context';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

// Mock data
const inventory = [
  { 
    id: 'MAG-EUR-001',
    type: 'EUR',
    quantity: 450,
    minStock: 200,
    location: 'Magazyn A - Strefa 1',
    status: 'available',
    lastUpdate: '2026-03-06 10:30',
    avgCost: 45,
    value: 20250
  },
  { 
    id: 'MAG-IND-001',
    type: 'Industrial',
    quantity: 280,
    minStock: 150,
    location: 'Magazyn A - Strefa 2',
    status: 'available',
    lastUpdate: '2026-03-06 09:15',
    avgCost: 38,
    value: 10640
  },
  { 
    id: 'MAG-US-001',
    type: 'US',
    quantity: 45,
    minStock: 100,
    location: 'Magazyn B - Strefa 1',
    status: 'lowStock',
    lastUpdate: '2026-03-05 16:45',
    avgCost: 52,
    value: 2340
  },
  { 
    id: 'MAG-CP-001',
    type: 'CP',
    quantity: 0,
    minStock: 50,
    location: 'Magazyn B - Strefa 2',
    status: 'outOfStock',
    lastUpdate: '2026-03-04 14:20',
    avgCost: 28,
    value: 0
  },
];

const movements = [
  {
    id: 'RUC-001',
    type: 'receipt',
    palletType: 'EUR',
    quantity: 120,
    supplier: 'Transport 24',
    date: '2026-03-06 08:30',
    user: 'Jan Kowalski',
    qrScanned: true
  },
  {
    id: 'WYD-045',
    type: 'issue',
    palletType: 'Industrial',
    quantity: 50,
    customer: 'Firma ABC',
    date: '2026-03-06 11:15',
    user: 'Anna Nowak',
    qrScanned: true
  },
  {
    id: 'RUC-002',
    type: 'receipt',
    palletType: 'US',
    quantity: 30,
    supplier: 'Logistyka XYZ',
    date: '2026-03-05 15:45',
    user: 'Jan Kowalski',
    qrScanned: false
  },
  {
    id: 'WYD-046',
    type: 'issue',
    palletType: 'EUR',
    quantity: 100,
    customer: 'Magazyny Polski',
    date: '2026-03-05 13:20',
    user: 'Piotr Wiśniewski',
    qrScanned: true
  },
];

export function WarehousePage() {
  const { colors } = useTheme();

  const statusLabels: Record<string, string> = {
    available: 'Dostępne',
    lowStock: 'Niski stan',
    outOfStock: 'Brak',
  };

  const statusColors: Record<string, string> = {
    available: colors.statusAvailable,
    lowStock: colors.statusLowStock,
    outOfStock: colors.statusOutOfStock,
  };

  const totalValue = inventory.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
            Magazyn
          </h1>
          <p style={{ color: colors.textSecondary }}>
            Zarządzanie stanami magazynowymi i ruchami towarów
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <QrCode className="w-4 h-4" />
            Skanuj QR
          </Button>
          <Button 
            className="gap-2"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.primaryForeground 
            }}
          >
            <Upload className="w-4 h-4" />
            Przyjęcie
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            label: 'Łączna wartość', 
            value: `${totalValue.toLocaleString('pl-PL')} PLN`,
            color: colors.primary,
            icon: Package
          },
          { 
            label: 'Dostępne pozycje', 
            value: inventory.filter(i => i.status === 'available').length,
            color: colors.statusAvailable,
            icon: CheckCircle
          },
          { 
            label: 'Niski stan', 
            value: inventory.filter(i => i.status === 'lowStock').length,
            color: colors.statusLowStock,
            icon: AlertTriangle
          },
          { 
            label: 'Brak zapasu', 
            value: inventory.filter(i => i.status === 'outOfStock').length,
            color: colors.statusOutOfStock,
            icon: AlertTriangle
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label}
              className="rounded-lg p-4 border"
              style={{ 
                backgroundColor: colors.surface,
                borderColor: colors.border 
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                  {stat.label}
                </p>
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-semibold" style={{ color: colors.textPrimary }}>
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <Tabs defaultValue="inventory" className="space-y-6">
        <TabsList>
          <TabsTrigger value="inventory">Stan magazynowy</TabsTrigger>
          <TabsTrigger value="movements">Ruchy magazynowe</TabsTrigger>
          <TabsTrigger value="locations">Lokalizacje</TabsTrigger>
        </TabsList>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          {/* Search */}
          <div 
            className="rounded-lg p-4 border"
            style={{ 
              backgroundColor: colors.surface,
              borderColor: colors.border 
            }}
          >
            <div className="relative">
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" 
                style={{ color: colors.textSecondary }}
              />
              <Input
                placeholder="Szukaj produktu..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Inventory Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inventory.map((item) => (
              <div 
                key={item.id}
                className="rounded-lg p-6 border"
                style={{ 
                  backgroundColor: colors.surface,
                  borderColor: colors.border 
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: colors.primary + '15' }}
                    >
                      <Package className="w-6 h-6" style={{ color: colors.primary }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg" style={{ color: colors.textPrimary }}>
                        {item.type}
                      </h3>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>
                        {item.id}
                      </p>
                    </div>
                  </div>
                  <Badge style={{ 
                    backgroundColor: statusColors[item.status] + '20', 
                    color: statusColors[item.status] 
                  }}>
                    {statusLabels[item.status]}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: colors.textSecondary }}>
                      Stan magazynowy
                    </span>
                    <span className="font-semibold text-lg" style={{ color: colors.textPrimary }}>
                      {item.quantity} szt
                    </span>
                  </div>

                  {/* Stock Level Indicator */}
                  <div>
                    <div className="flex justify-between text-xs mb-1" style={{ color: colors.textSecondary }}>
                      <span>Minimalny: {item.minStock}</span>
                      <span>{Math.round((item.quantity / (item.minStock * 2)) * 100)}%</span>
                    </div>
                    <div 
                      className="h-2 rounded-full"
                      style={{ backgroundColor: colors.border }}
                    >
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          width: `${Math.min((item.quantity / (item.minStock * 2)) * 100, 100)}%`,
                          backgroundColor: statusColors[item.status]
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t" style={{ borderColor: colors.border }}>
                    <div>
                      <p className="text-xs mb-1" style={{ color: colors.textSecondary }}>
                        Śr. koszt
                      </p>
                      <p className="font-semibold" style={{ color: colors.textPrimary }}>
                        {item.avgCost} PLN
                      </p>
                    </div>
                    <div>
                      <p className="text-xs mb-1" style={{ color: colors.textSecondary }}>
                        Wartość
                      </p>
                      <p className="font-semibold" style={{ color: colors.success }}>
                        {item.value.toLocaleString('pl-PL')} PLN
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t" style={{ borderColor: colors.border }}>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>
                      <strong>Lokalizacja:</strong> {item.location}
                    </p>
                    <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                      Aktualizacja: {item.lastUpdate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Movements Tab */}
        <TabsContent value="movements" className="space-y-4">
          <div 
            className="rounded-lg border overflow-hidden"
            style={{ 
              backgroundColor: colors.surface,
              borderColor: colors.border 
            }}
          >
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: colors.border }}>
                  <TableHead style={{ color: colors.textSecondary }}>Nr dokumentu</TableHead>
                  <TableHead style={{ color: colors.textSecondary }}>Typ ruchu</TableHead>
                  <TableHead style={{ color: colors.textSecondary }}>Typ palety</TableHead>
                  <TableHead style={{ color: colors.textSecondary }}>Ilość</TableHead>
                  <TableHead style={{ color: colors.textSecondary }}>Kontrahent</TableHead>
                  <TableHead style={{ color: colors.textSecondary }}>Data</TableHead>
                  <TableHead style={{ color: colors.textSecondary }}>Użytkownik</TableHead>
                  <TableHead style={{ color: colors.textSecondary }}>QR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movements.map((movement) => (
                  <TableRow 
                    key={movement.id}
                    style={{ borderColor: colors.border }}
                  >
                    <TableCell className="font-medium" style={{ color: colors.textPrimary }}>
                      {movement.id}
                    </TableCell>
                    <TableCell>
                      <Badge style={{ 
                        backgroundColor: movement.type === 'receipt' ? colors.success + '20' : colors.info + '20',
                        color: movement.type === 'receipt' ? colors.success : colors.info
                      }}>
                        {movement.type === 'receipt' ? 'Przyjęcie' : 'Wydanie'}
                      </Badge>
                    </TableCell>
                    <TableCell style={{ color: colors.textPrimary }}>
                      {movement.palletType}
                    </TableCell>
                    <TableCell className="font-semibold" style={{ color: colors.textPrimary }}>
                      {movement.quantity} szt
                    </TableCell>
                    <TableCell style={{ color: colors.textSecondary }}>
                      {movement.type === 'receipt' ? movement.supplier : movement.customer}
                    </TableCell>
                    <TableCell style={{ color: colors.textSecondary }}>
                      {movement.date}
                    </TableCell>
                    <TableCell style={{ color: colors.textSecondary }}>
                      {movement.user}
                    </TableCell>
                    <TableCell>
                      {movement.qrScanned ? (
                        <CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
                      ) : (
                        <AlertTriangle className="w-5 h-5" style={{ color: colors.warning }} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Locations Tab */}
        <TabsContent value="locations" className="space-y-4">
          <div 
            className="rounded-lg p-6 border text-center"
            style={{ 
              backgroundColor: colors.surface,
              borderColor: colors.border 
            }}
          >
            <Package className="w-16 h-16 mx-auto mb-4 opacity-20" style={{ color: colors.textSecondary }} />
            <h3 className="text-lg font-semibold mb-2" style={{ color: colors.textPrimary }}>
              Mapa magazynu
            </h3>
            <p style={{ color: colors.textSecondary }}>
              Widok lokalizacji zostanie wkrótce dodany
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
