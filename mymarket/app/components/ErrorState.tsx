import { AlertCircle } from 'lucide-react';
import { useTheme } from '../theme/theme-context';
import { Button } from './ui/button';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = 'Wystąpił błąd', 
  message, 
  onRetry 
}: ErrorStateProps) {
  const { colors } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div 
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: colors.error + '20' }}
      >
        <AlertCircle className="w-10 h-10" style={{ color: colors.error }} />
      </div>
      <h3 className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
        {title}
      </h3>
      <p className="max-w-md mb-6" style={{ color: colors.textSecondary }}>
        {message}
      </p>
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="outline"
        >
          Spróbuj ponownie
        </Button>
      )}
    </div>
  );
}
