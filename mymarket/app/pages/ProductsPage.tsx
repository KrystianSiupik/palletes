import { Package, Plus, Edit, QrCode } from 'lucide-react';
import { useTheme } from '../theme/theme-context';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const products = [
  { 
    id: 'PROD-EUR',
    name: 'Paleta EUR / EPAL',
    dimensions: '1200 x 800 x 144 mm',
    weight: 25,
    buyPrice: 45,
    sellPrice: 127,
    margin: 64.6,
    stock: 450,
    image: '🇪🇺'
  },
  { 
    id: 'PROD-IND',
    name: 'Paleta Industrial',
    dimensions: '1200 x 1000 x 150 mm',
    weight: 28,
    buyPrice: 38,
    sellPrice: 95,
    margin: 60.0,
    stock: 280,
    image: '🏭'
  },
  { 
    id: 'PROD-US',
    name: 'Paleta US Standard',
    dimensions: '1016 x 1219 x 140 mm',
    weight: 22,
    buyPrice: 52,
    sellPrice: 118,
    margin: 55.9,
    stock: 120,
    image: '🇺🇸'
  },
  { 
    id: 'PROD-CP',
    name: 'Paleta CP (ChemPal)',
    dimensions: '1140 x 1140 x 156 mm',
    weight: 30,
    buyPrice: 28,
    sellPrice: 72,
    margin: 61.1,
    stock: 95,
    image: '⚗️'
  },
];

export function ProductsPage() {
  const { colors } = useTheme();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
            Produkty
          </h1>
          <p style={{ color: colors.textSecondary }}>
            Katalog typów palet i zarządzanie produktami
          </p>
        </div>
        <Button className="gap-2" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
          <Plus className="w-4 h-4" />
          Nowy typ palety
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div 
            key={product.id}
            className="rounded-lg p-6 border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-20 h-20 rounded-lg flex items-center justify-center text-4xl"
                style={{ backgroundColor: colors.background }}
              >
                {product.image}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                      {product.name}
                    </h3>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      {product.id}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <QrCode className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span style={{ color: colors.textSecondary }}>Wymiary:</span>
                    <span className="font-medium" style={{ color: colors.textPrimary }}>
                      {product.dimensions}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: colors.textSecondary }}>Waga:</span>
                    <span className="font-medium" style={{ color: colors.textPrimary }}>
                      {product.weight} kg
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t" style={{ borderColor: colors.border }}>
                  <div>
                    <p className="text-xs mb-1" style={{ color: colors.textSecondary }}>Cena zakupu</p>
                    <p className="font-semibold" style={{ color: colors.textPrimary }}>
                      {product.buyPrice} PLN
                    </p>
                  </div>
                  <div>
                    <p className="text-xs mb-1" style={{ color: colors.textSecondary }}>Cena sprzedaży</p>
                    <p className="font-semibold" style={{ color: colors.textPrimary }}>
                      {product.sellPrice} PLN
                    </p>
                  </div>
                  <div>
                    <p className="text-xs mb-1" style={{ color: colors.textSecondary }}>Marża</p>
                    <p className="font-semibold" style={{ color: colors.success }}>
                      {product.margin}%
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t" style={{ borderColor: colors.border }}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: colors.textSecondary }}>
                      Stan magazynowy:
                    </span>
                    <Badge style={{ 
                      backgroundColor: product.stock > 200 ? colors.success + '20' : colors.warning + '20',
                      color: product.stock > 200 ? colors.success : colors.warning
                    }}>
                      {product.stock} szt
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
