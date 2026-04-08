import { QrCode, Camera, Package, MapPin, Clock, User } from 'lucide-react';
import { useTheme } from '../theme/theme-context';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

// Mock scanned item data
const scannedItem = {
  qrCode: 'QR-EUR-2026-00450',
  type: 'EUR',
  location: 'Magazyn A - Strefa 1 - Regał A3',
  receivedDate: '2026-02-15',
  supplier: 'Transport 24',
  condition: 'Dobry',
  batch: 'BATCH-2026-002',
  weight: 25,
  dimensions: '1200 x 800 x 144 mm',
  history: [
    { date: '2026-03-06', action: 'Skanowanie', user: 'Jan Kowalski', location: 'Magazyn A - Strefa 1' },
    { date: '2026-02-15', action: 'Przyjęcie', user: 'Anna Nowak', location: 'Rampa A' },
  ]
};

export function QRScannerPage() {
  const { colors } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
          Skaner QR
        </h1>
        <p style={{ color: colors.textSecondary }}>
          Identyfikacja i śledzenie palet za pomocą kodów QR
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner */}
        <div 
          className="rounded-lg p-6 border"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.textPrimary }}>
            <Camera className="w-5 h-5" />
            Kamera skanera
          </h3>
          <div 
            className="aspect-square rounded-lg flex flex-col items-center justify-center mb-4"
            style={{ backgroundColor: colors.background }}
          >
            <QrCode className="w-24 h-24 mb-4" style={{ color: colors.textSecondary }} />
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Umieść kod QR przed kamerą
            </p>
          </div>
          <Button 
            className="w-full gap-2"
            style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}
          >
            <Camera className="w-4 h-4" />
            Uruchom kamerę
          </Button>
        </div>

        {/* Scanned Item Details */}
        <div 
          className="rounded-lg p-6 border"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.textPrimary }}>
            <Package className="w-5 h-5" />
            Szczegóły zeskanowanej palety
          </h3>

          <div className="space-y-4">
            <div 
              className="p-4 rounded-lg text-center"
              style={{ backgroundColor: colors.background }}
            >
              <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                Kod QR
              </p>
              <p className="text-xl font-mono font-semibold" style={{ color: colors.textPrimary }}>
                {scannedItem.qrCode}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>Typ palety</p>
                <Badge style={{ backgroundColor: colors.primary + '20', color: colors.primary }}>
                  {scannedItem.type}
                </Badge>
              </div>
              <div>
                <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>Stan</p>
                <Badge style={{ backgroundColor: colors.success + '20', color: colors.success }}>
                  {scannedItem.condition}
                </Badge>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t" style={{ borderColor: colors.border }}>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5" style={{ color: colors.textSecondary }} />
                <div className="flex-1">
                  <p className="text-sm" style={{ color: colors.textSecondary }}>Lokalizacja</p>
                  <p className="font-medium" style={{ color: colors.textPrimary }}>
                    {scannedItem.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-0.5" style={{ color: colors.textSecondary }} />
                <div className="flex-1">
                  <p className="text-sm" style={{ color: colors.textSecondary }}>Data przyjęcia</p>
                  <p className="font-medium" style={{ color: colors.textPrimary }}>
                    {scannedItem.receivedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-5 h-5 mt-0.5" style={{ color: colors.textSecondary }} />
                <div className="flex-1">
                  <p className="text-sm" style={{ color: colors.textSecondary }}>Dostawca</p>
                  <p className="font-medium" style={{ color: colors.textPrimary }}>
                    {scannedItem.supplier}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t" style={{ borderColor: colors.border }}>
              <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                Specyfikacja
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span style={{ color: colors.textSecondary }}>Wymiary:</span>
                  <p className="font-medium" style={{ color: colors.textPrimary }}>
                    {scannedItem.dimensions}
                  </p>
                </div>
                <div>
                  <span style={{ color: colors.textSecondary }}>Waga:</span>
                  <p className="font-medium" style={{ color: colors.textPrimary }}>
                    {scannedItem.weight} kg
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      <div 
        className="rounded-lg p-6 border"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
          Historia skanowań
        </h3>
        <div className="space-y-3">
          {scannedItem.history.map((entry, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg"
              style={{ backgroundColor: colors.background }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <Clock className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold" style={{ color: colors.textPrimary }}>
                    {entry.action}
                  </span>
                  <span className="text-sm" style={{ color: colors.textSecondary }}>
                    {entry.date}
                  </span>
                </div>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Użytkownik: {entry.user} • Lokalizacja: {entry.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
