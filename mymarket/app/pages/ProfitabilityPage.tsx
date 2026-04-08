import { useTheme } from '../theme/theme-context';

export function ProfitabilityPage() {
  const { colors } = useTheme();

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
          Rentowność
        </h1>
        <p style={{ color: colors.textSecondary }}>Szczegółowa analiza rentowności</p>
        <p className="text-sm mt-4" style={{ color: colors.textSecondary }}>Strona w przygotowaniu</p>
      </div>
    </div>
  );
}
