export type Platform = 'google-ads' | 'meta-ads' | 'shopify' | 'ga4' | 'merchant' | 'gtm';

export type AlertSeverity = 'critical' | 'warning' | 'info';

export type RecommendationStatus = 'pending' | 'applied' | 'dismissed';

export type RecommendationImpact = 'high' | 'medium' | 'low';

export interface DashboardKPI {
  label: string;
  value: string;
  change: number;
  icon: string;
}

export interface Campaign {
  id: string;
  name: string;
  platform: Platform;
  status: 'active' | 'paused' | 'ended';
  spend: number;
  revenue: number;
  roas: number;
  clicks: number;
  impressions: number;
  ctr: number;
  cpc: number;
  conversions: number;
  cpa: number;
  frequency?: number;
}

export interface Keyword {
  id: string;
  keyword: string;
  matchType: 'Broad' | 'Phrase' | 'Exact';
  clicks: number;
  impressions: number;
  ctr: number;
  cpc: number;
  cost: number;
  conversions: number;
  cpa: number;
  status: 'active' | 'paused';
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  inventory: number;
  unitsSold: number;
  revenue: number;
  trend: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface Alert {
  id: string;
  severity: AlertSeverity;
  platform: string;
  title: string;
  description: string;
  metric: string;
  changePct: number;
  time: string;
  isRead: boolean;
}

export interface AIRecommendendation {
  id: string;
  platform: string;
  type: string;
  title: string;
  description: string;
  impact: RecommendationImpact;
  action: string;
  status: RecommendationStatus;
  time: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

export interface Report {
  id: string;
  type: 'daily' | 'weekly' | 'monthly';
  title: string;
  dateRange: string;
  summary: string;
  createdAt: string;
}

export interface TimeSeriesPoint {
  date: string;
  spend: number;
  revenue: number;
  roas: number;
  clicks: number;
  conversions: number;
  impressions: number;
  ctr: number;
}

export interface ConnectedAccount {
  id: string;
  platform: Platform;
  accountName: string;
  status: 'connected' | 'disconnected' | 'error';
  connectedAt: string;
}
