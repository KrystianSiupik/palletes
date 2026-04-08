import { Bell, User, Palette, LogOut } from 'lucide-react';
import { useTheme } from '../../theme/theme-context';
import { ThemeName } from '../../theme/themes';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';

export function Topbar() {
  const { colors, currentTheme, setTheme } = useTheme();

  const themeLabels: Record<ThemeName, string> = {
    corporate: 'Corporate',
    industrial: 'Industrial',
    analytics: 'Analytics'
  };

  return (
    <header 
      className="h-16 border-b flex items-center justify-between px-6"
      style={{ 
        backgroundColor: colors.surface,
        borderColor: colors.border 
      }}
    >
      {/* Breadcrumbs / Page Title */}
      <div>
        <h1 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
          System zarządzania paletami
        </h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="gap-2"
            >
              <Palette className="w-4 h-4" />
              {themeLabels[currentTheme]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Wybierz motyw</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setTheme('corporate')}>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#1e3a8a]" />
                Corporate
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('industrial')}>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#18181b]" />
                Industrial
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('analytics')}>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#0f172a]" />
                Analytics
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Badge 
            className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
            style={{ 
              backgroundColor: colors.error,
              color: colors.errorForeground 
            }}
          >
            3
          </Badge>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.primary }}
              >
                <User className="w-5 h-5" style={{ color: colors.primaryForeground }} />
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                  Jan Kowalski
                </div>
                <div className="text-xs" style={{ color: colors.textSecondary }}>
                  Administrator
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Ustawienia</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Wyloguj
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
