import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RootLayout } from '@/layouts';
import {
  ContactPage,
  Error404Page,
  FeaturesPage,
  HomePage,
  PartnershipPage,
  PrivacyPolicyPage,
  TechnologyPage,
} from '@/pages';

export function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="technology" element={<TechnologyPage />} />
          <Route path="partnership" element={<PartnershipPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="404-error" element={<Error404Page />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<Navigate to="/404-error" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
