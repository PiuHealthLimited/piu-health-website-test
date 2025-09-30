import { Outlet } from 'react-router-dom';
import { Loader } from '@/components';
import { MainLayout } from '@/layouts';

export function RootLayout() {
  return (
    <>
      <Loader />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
}
