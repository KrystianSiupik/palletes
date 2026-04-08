import { LucideIcon } from 'lucide-react';
import { useTheme } from '../theme/theme-context';
import { Button } from './ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div 
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: colors.background }}
      >
        <Icon className="w-10 h-10 opacity-40" style={{ color: colors.textSecondary }} />
      </div>
      <h3 className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
        {title}
      </h3>
      <p className="max-w-md mb-6" style={{ color: colors.textSecondary }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
