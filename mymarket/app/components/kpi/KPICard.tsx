import { LucideIcon } from 'lucide-react';
import { useTheme } from '../../theme/theme-context';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  description?: string;
}

export function KPICard({ title, value, change, changeType = 'neutral', icon: Icon, description }: KPICardProps) {
  const { colors } = useTheme();

  const changeColors = {
    positive: colors.success,
    negative: colors.error,
    neutral: colors.textSecondary,
  };

  return (
    <div 
      className="rounded-lg p-6 border"
      style={{ 
        backgroundColor: colors.surface,
        borderColor: colors.border 
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
            {title}
          </p>
          <p className="text-3xl font-semibold mb-1" style={{ color: colors.textPrimary }}>
            {value}
          </p>
          {change && (
            <p className="text-sm font-medium" style={{ color: changeColors[changeType] }}>
              {change}
            </p>
          )}
          {description && (
            <p className="text-xs mt-2" style={{ color: colors.textSecondary }}>
              {description}
            </p>
          )}
        </div>
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: colors.primary + '15' }}
        >
          <Icon className="w-6 h-6" style={{ color: colors.primary }} />
        </div>
      </div>
    </div>
  );
}
