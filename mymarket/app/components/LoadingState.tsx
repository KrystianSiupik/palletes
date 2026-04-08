import { Loader2 } from 'lucide-react';
import { useTheme } from '../theme/theme-context';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Ładowanie...' }: LoadingStateProps) {
  const { colors } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <Loader2 
        className="w-12 h-12 animate-spin mb-4" 
        style={{ color: colors.primary }}
      />
      <p className="text-sm" style={{ color: colors.textSecondary }}>
        {message}
      </p>
    </div>
  );
}
