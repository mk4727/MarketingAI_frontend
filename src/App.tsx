import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { AppLayout } from '@/components/AppLayout';
import { Landing } from '@/pages/Landing';
import { Login } from '@/pages/Login';
import { Signup } from '@/pages/Signup';
import { Dashboard } from '@/pages/Dashboard';
import { GoogleAds } from '@/pages/GoogleAds';
import { MetaAds } from '@/pages/MetaAds';
import { Shopify } from '@/pages/Shopify';
import { GA4 } from '@/pages/GA4';
import { MerchantCenter } from '@/pages/MerchantCenter';
import { GTM } from '@/pages/GTM';
import { AIAssistant } from '@/pages/AIAssistant';
import { Alerts } from '@/pages/Alerts';
import { Reports } from '@/pages/Reports';
import { Settings } from '@/pages/Settings';
import { Admin } from '@/pages/Admin';
import { ScrollToTop } from '@/components/ScrollToTop';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, initialized } = useAuthStore();
  const location = useLocation();

  if (!initialized) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-teal-600" />
          <p className="text-sm text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { user, initialized } = useAuthStore();

  if (!initialized) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-teal-600" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}

function App() {
  const { init } = useAuthStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path="/signup" element={<PublicOnlyRoute><Signup /></PublicOnlyRoute>} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="google-ads" element={<GoogleAds />} />
          <Route path="meta-ads" element={<MetaAds />} />
          <Route path="shopify" element={<Shopify />} />
          <Route path="ga4" element={<GA4 />} />
          <Route path="merchant" element={<MerchantCenter />} />
          <Route path="gtm" element={<GTM />} />
          <Route path="ai-assistant" element={<AIAssistant />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
