import { useState } from 'react';
import { Plug, Check, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConnectCardProps {
  platformName: string;
  icon: React.ReactNode;
  accentColor: string;
  connectedText: string;
}

export function ConnectCard({ platformName, icon, accentColor, connectedText }: ConnectCardProps) {
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

  const handleConnect = () => {
    setStatus('connecting');
    setTimeout(() => setStatus('connected'), 1800);
  };

  const handleDisconnect = () => {
    setStatus('disconnected');
  };

  if (status === 'connected') {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', accentColor)}>
              {icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{platformName} Connected</p>
              <p className="text-xs text-emerald-700">{connectedText}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
              <Check className="h-4 w-4" /> Active
            </span>
            <button
              onClick={handleDisconnect}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'connecting') {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-3">
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', accentColor)}>
            {icon}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">Connecting to {platformName}...</p>
            <p className="text-xs text-slate-500">Redirecting to Google sign-in</p>
          </div>
          <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', accentColor)}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Connect {platformName}</p>
            <p className="text-xs text-slate-500">Link your account to see live data on this dashboard</p>
          </div>
        </div>
        <button
          onClick={handleConnect}
          className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Connect with Google
        </button>
      </div>
      <div className="mt-3 flex items-start gap-2 rounded-lg bg-slate-50 p-3">
        <AlertCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-500">
          You'll be redirected to Google to authorize access. We only read your marketing data — we never make changes without your permission.
        </p>
      </div>
    </div>
  );
}
