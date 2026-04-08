import { Settings, User, Bell, Lock, Palette, Building } from 'lucide-react';
import { useTheme } from '../theme/theme-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';

export function SettingsPage() {
  const { colors } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
          Ustawienia
        </h1>
        <p style={{ color: colors.textSecondary }}>
          Konfiguracja systemu i preferencji użytkownika
        </p>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList>
          <TabsTrigger value="company">Firma</TabsTrigger>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="notifications">Powiadomienia</TabsTrigger>
          <TabsTrigger value="security">Bezpieczeństwo</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          <div className="rounded-lg p-6 border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.textPrimary }}>
              <Building className="w-5 h-5" />
              Dane firmy
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nazwa firmy</Label>
                  <Input defaultValue="Pallettes Sp. z o.o." className="mt-2" />
                </div>
                <div>
                  <Label>NIP</Label>
                  <Input defaultValue="1234567890" className="mt-2" />
                </div>
              </div>
              <div>
                <Label>Adres</Label>
                <Input defaultValue="ul. Magazynowa 123, 00-001 Warszawa" className="mt-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Telefon</Label>
                  <Input defaultValue="+48 123 456 789" className="mt-2" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input defaultValue="kontakt@pallettes.pl" className="mt-2" />
                </div>
              </div>
              <Button style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
                Zapisz zmiany
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <div className="rounded-lg p-6 border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.textPrimary }}>
              <User className="w-5 h-5" />
              Profil użytkownika
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Imię</Label>
                  <Input defaultValue="Jan" className="mt-2" />
                </div>
                <div>
                  <Label>Nazwisko</Label>
                  <Input defaultValue="Kowalski" className="mt-2" />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input defaultValue="jan.kowalski@pallettes.pl" className="mt-2" />
              </div>
              <div>
                <Label>Stanowisko</Label>
                <Input defaultValue="Administrator" className="mt-2" />
              </div>
              <Button style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
                Zapisz zmiany
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="rounded-lg p-6 border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.textPrimary }}>
              <Bell className="w-5 h-5" />
              Powiadomienia
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Nowe zamówienia', description: 'Powiadom o nowych zamówieniach' },
                { label: 'Niski stan magazynowy', description: 'Alert przy niskim stanie zapasów' },
                { label: 'Oferty skupu', description: 'Powiadom o nowych ofertach skupu' },
                { label: 'Przeterminowane faktury', description: 'Alert o fakturach po terminie' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b" style={{ borderColor: colors.border }}>
                  <div>
                    <p className="font-medium" style={{ color: colors.textPrimary }}>{item.label}</p>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>{item.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="rounded-lg p-6 border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.textPrimary }}>
              <Lock className="w-5 h-5" />
              Bezpieczeństwo
            </h3>
            <div className="space-y-4">
              <div>
                <Label>Aktualne hasło</Label>
                <Input type="password" className="mt-2" />
              </div>
              <div>
                <Label>Nowe hasło</Label>
                <Input type="password" className="mt-2" />
              </div>
              <div>
                <Label>Potwierdź nowe hasło</Label>
                <Input type="password" className="mt-2" />
              </div>
              <Button style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
                Zmień hasło
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
