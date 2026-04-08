import { getSiteConfig } from '@/config/sites';
import WeeklyOrderPage from '@/features/order-weekly/WeeklyOrderPage';
import OfficeOrderPage from '@/features/order-office/OfficeOrderPage';
import MigrantOrderPage from '@/features/order-migrant/MigrantOrderPage';

export default function Page() {
  const { orderingFlow } = getSiteConfig();

  if (orderingFlow === 'daily-4day') return <OfficeOrderPage />;
  if (orderingFlow === 'package-2x-week') return <MigrantOrderPage />;
  return <WeeklyOrderPage />;
}
