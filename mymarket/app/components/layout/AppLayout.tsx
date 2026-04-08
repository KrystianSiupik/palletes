import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useTheme } from '../../theme/theme-context';

export function AppLayout() {
  const { colors } = useTheme();

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: colors.background }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
