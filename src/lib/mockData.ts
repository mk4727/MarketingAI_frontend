import type {
  Campaign,
  Keyword,
  Product,
  Alert,
  AIRecommendendation,
  TimeSeriesPoint,
  ConnectedAccount,
  Report,
} from '@/types';

export const dashboardTimeSeries: TimeSeriesPoint[] = [
  { date: 'Sep 7', spend: 42000, revenue: 185000, roas: 4.40, clicks: 1240, conversions: 165, impressions: 145000, ctr: 0.86 },
  { date: 'Sep 8', spend: 45000, revenue: 198000, roas: 4.40, clicks: 1380, conversions: 172, impressions: 152000, ctr: 0.91 },
  { date: 'Sep 9', spend: 38000, revenue: 172000, roas: 4.52, clicks: 1180, conversions: 158, impressions: 138000, ctr: 0.86 },
  { date: 'Sep 10', spend: 51000, revenue: 225000, roas: 4.41, clicks: 1450, conversions: 190, impressions: 168000, ctr: 0.86 },
  { date: 'Sep 11', spend: 44000, revenue: 195000, roas: 4.43, clicks: 1320, conversions: 168, impressions: 149000, ctr: 0.89 },
  { date: 'Sep 12', spend: 48000, revenue: 210000, roas: 4.37, clicks: 1410, conversions: 186, impressions: 161000, ctr: 0.88 },
  { date: 'Sep 13', spend: 46000, revenue: 205000, roas: 4.46, clicks: 1390, conversions: 182, impressions: 157000, ctr: 0.88 },
];

export const googleAdsCampaigns: Campaign[] = [
  { id: 'g1', name: 'Search - Brand', platform: 'google-ads', status: 'active', spend: 8200, revenue: 68000, roas: 8.29, clicks: 420, impressions: 52000, ctr: 0.81, cpc: 19.5, conversions: 58, cpa: 141 },
  { id: 'g2', name: 'Search - Non-Brand Generic', platform: 'google-ads', status: 'active', spend: 12400, revenue: 38000, roas: 3.06, clicks: 680, impressions: 89000, ctr: 0.76, cpc: 18.2, conversions: 34, cpa: 365 },
  { id: 'g3', name: 'Shopping - All Products', platform: 'google-ads', status: 'active', spend: 5600, revenue: 42000, roas: 7.50, clicks: 310, impressions: 41000, ctr: 0.76, cpc: 18.1, conversions: 38, cpa: 147 },
  { id: 'g4', name: 'Display - Retargeting', platform: 'google-ads', status: 'active', spend: 1800, revenue: 12000, roas: 6.67, clicks: 210, impressions: 78000, ctr: 0.27, cpc: 8.6, conversions: 14, cpa: 129 },
  { id: 'g5', name: 'Search - Competitor', platform: 'google-ads', status: 'active', spend: 4200, revenue: 8200, roas: 1.95, clicks: 280, impressions: 34000, ctr: 0.82, cpc: 15.0, conversions: 8, cpa: 525 },
  { id: 'g6', name: 'Performance Max', platform: 'google-ads', status: 'active', spend: 9800, revenue: 56000, roas: 5.71, clicks: 520, impressions: 92000, ctr: 0.57, cpc: 18.8, conversions: 48, cpa: 204 },
];

export const metaAdsCampaigns: Campaign[] = [
  { id: 'm1', name: 'Prospecting - Lookalike 1%', platform: 'meta-ads', status: 'active', spend: 7200, revenue: 48000, roas: 6.67, clicks: 380, impressions: 120000, ctr: 0.32, cpc: 18.9, conversions: 42, cpa: 171, frequency: 1.8 },
  { id: 'm2', name: 'Retargeting - 30 Day', platform: 'meta-ads', status: 'active', spend: 4800, revenue: 36000, roas: 7.50, clicks: 290, impressions: 85000, ctr: 0.34, cpc: 16.6, conversions: 32, cpa: 150, frequency: 3.2 },
  { id: 'm3', name: 'Prospecting - Interest Stack', platform: 'meta-ads', status: 'active', spend: 5400, revenue: 18000, roas: 3.33, clicks: 340, impressions: 145000, ctr: 0.23, cpc: 15.9, conversions: 18, cpa: 300, frequency: 5.8 },
  { id: 'm4', name: 'Advantage+ Shopping', platform: 'meta-ads', status: 'active', spend: 2600, revenue: 14000, roas: 5.38, clicks: 180, impressions: 62000, ctr: 0.29, cpc: 14.4, conversions: 14, cpa: 186, frequency: 2.1 },
];

export const googleAdsKeywords: Keyword[] = [
  { id: 'k1', keyword: 'running shoes online', matchType: 'Phrase', clicks: 145, impressions: 12000, ctr: 1.21, cpc: 22.5, cost: 3262, conversions: 4, cpa: 816, status: 'active' },
  { id: 'k2', keyword: 'buy sneakers india', matchType: 'Exact', clicks: 89, impressions: 5600, ctr: 1.59, cpc: 18.2, cost: 1620, conversions: 12, cpa: 135, status: 'active' },
  { id: 'k3', keyword: 'best running shoes', matchType: 'Broad', clicks: 210, impressions: 28000, ctr: 0.75, cpc: 24.1, cost: 5061, conversions: 6, cpa: 844, status: 'active' },
  { id: 'k4', keyword: 'sports shoes for men', matchType: 'Phrase', clicks: 178, impressions: 19000, ctr: 0.94, cpc: 19.8, cost: 3524, conversions: 14, cpa: 252, status: 'active' },
  { id: 'k5', keyword: 'discount shoes', matchType: 'Broad', clicks: 320, impressions: 42000, ctr: 0.76, cpc: 15.2, cost: 4864, conversions: 3, cpa: 1621, status: 'active' },
  { id: 'k6', keyword: 'shoe store near me', matchType: 'Phrase', clicks: 95, impressions: 8900, ctr: 1.07, cpc: 12.8, cost: 1216, conversions: 0, cpa: 0, status: 'active' },
  { id: 'k7', keyword: 'branded sneakers', matchType: 'Exact', clicks: 67, impressions: 4200, ctr: 1.60, cpc: 26.5, cost: 1776, conversions: 9, cpa: 197, status: 'active' },
  { id: 'k8', keyword: 'cheap shoes online', matchType: 'Broad', clicks: 240, impressions: 31000, ctr: 0.77, cpc: 14.1, cost: 3384, conversions: 2, cpa: 1692, status: 'active' },
];

export const shopifyProducts: Product[] = [
  { id: 'p1', name: 'AirFlex Running Shoes - Black', sku: 'AF-RUN-BLK', price: 2499, inventory: 340, unitsSold: 186, revenue: 464814, trend: 12.5, status: 'in-stock' },
  { id: 'p2', name: 'ProStride Sneakers - White', sku: 'PS-SNK-WHT', price: 2999, inventory: 12, unitsSold: 142, revenue: 425858, trend: 8.2, status: 'low-stock' },
  { id: 'p3', name: 'TrailBlazer Hiking Boots', sku: 'TB-HBK-001', price: 3999, inventory: 0, unitsSold: 98, revenue: 391902, trend: -5.4, status: 'out-of-stock' },
  { id: 'p4', name: 'CloudStep Walking Shoes', sku: 'CS-WLK-002', price: 1999, inventory: 220, unitsSold: 76, revenue: 151924, trend: 3.1, status: 'in-stock' },
  { id: 'p5', name: 'SpeedForce Athletic Shoes', sku: 'SF-ATH-003', price: 3499, inventory: 8, unitsSold: 64, revenue: 223936, trend: 15.8, status: 'low-stock' },
  { id: 'p6', name: 'Endurance Pro Running', sku: 'EP-RUN-004', price: 4999, inventory: 180, unitsSold: 52, revenue: 259948, trend: -2.3, status: 'in-stock' },
  { id: 'p7', name: 'UrbanFlex Casual Sneakers', sku: 'UF-CAS-005', price: 1799, inventory: 0, unitsSold: 38, revenue: 68362, trend: -18.7, status: 'out-of-stock' },
  { id: 'p8', name: 'GripMax Training Shoes', sku: 'GM-TRN-006', price: 2799, inventory: 95, unitsSold: 44, revenue: 123156, trend: 6.4, status: 'in-stock' },
];

export const alerts: Alert[] = [
  { id: 'a1', severity: 'critical', platform: 'Meta Ads', title: 'Ad frequency reached 5.8', description: 'Prospecting - Interest Stack campaign is showing ads to the same audience too frequently. Creative fatigue is likely.', metric: 'Frequency', changePct: 107, time: '2h ago', isRead: false },
  { id: 'a2', severity: 'warning', platform: 'Google Ads', title: 'CPC increased 17%', description: 'Average CPC for Search - Non-Brand Generic campaign rose from ₹15.50 to ₹18.20 over the last 3 days.', metric: 'CPC', changePct: 17, time: '5h ago', isRead: false },
  { id: 'a3', severity: 'critical', platform: 'Shopify', title: 'Product out of stock', description: 'TrailBlazer Hiking Boots (SKU: TB-HBK-001) is out of stock. This product generated ₹3.9L in revenue last month.', metric: 'Inventory', changePct: -100, time: '8h ago', isRead: false },
  { id: 'a4', severity: 'warning', platform: 'GA4', title: 'Conversion tracking issue detected', description: 'Purchase events dropped 40% compared to the 7-day average. Possible tracking tag misconfiguration.', metric: 'Conversions', changePct: -40, time: '1d ago', isRead: false },
  { id: 'a5', severity: 'info', platform: 'Google Ads', title: 'Search - Competitor ROAS below 2.0', description: 'Competitor campaign ROAS at 1.95. Consider reallocating budget to better-performing campaigns.', metric: 'ROAS', changePct: -12, time: '1d ago', isRead: true },
  { id: 'a6', severity: 'warning', platform: 'Shopify', title: 'UrbanFlex Casual Sneakers sales declining', description: 'Sales down 18.7% week-over-week. High inventory remaining (0 units in stock).', metric: 'Sales', changePct: -18.7, time: '2d ago', isRead: true },
];

export const aiRecommendations: AIRecommendendation[] = [
  { id: 'r1', platform: 'Google Ads', type: 'Budget', title: 'Reduce Search - Non-Brand Generic budget by 15%', description: 'This campaign has a ROAS of 3.06, well below your account average of 4.37. Reducing budget by 15% (₹1,860/day) and reallocating to Performance Max could improve overall ROAS by 8-12%.', impact: 'high', action: 'Reduce Budget', status: 'pending', time: '1h ago' },
  { id: 'r2', platform: 'Google Ads', type: 'Keyword', title: 'Pause keyword "running shoes online"', description: 'This keyword has ₹3,262 spend with only 4 conversions (CPA ₹816). Your target CPA is ₹250. Pausing it will save approximately ₹3,200/week.', impact: 'high', action: 'Pause Keyword', status: 'pending', time: '2h ago' },
  { id: 'r3', platform: 'Meta Ads', type: 'Creative', title: 'Refresh creative for Prospecting - Interest Stack', description: 'Frequency at 5.8 indicates creative fatigue. CTR dropped from 0.34% to 0.23% over the last week. Upload 3-5 new creatives to reset frequency.', impact: 'high', action: 'Refresh Creative', status: 'pending', time: '3h ago' },
  { id: 'r4', platform: 'Google Ads', type: 'Negative Keyword', title: 'Add "cheap" as negative keyword', description: 'The keyword "cheap shoes online" generated 240 clicks but only 2 conversions (CPA ₹1,692). Adding "cheap" as a negative keyword will filter out low-intent traffic.', impact: 'medium', action: 'Add Negative', status: 'pending', time: '4h ago' },
  { id: 'r5', platform: 'Shopify', type: 'Product', title: 'Promote SpeedForce Athletic Shoes', description: 'This product has a +15.8% sales trend and only 8 units left in stock. Consider increasing ad spend and restocking urgently.', impact: 'high', action: 'Promote Product', status: 'pending', time: '5h ago' },
  { id: 'r6', platform: 'Google Ads', type: 'Placement', title: 'Exclude mobile app placement "gameapp123"', description: 'This placement generated 12,000 impressions with 0 conversions and ₹1,200 spend. Excluding it will eliminate wasted spend.', impact: 'medium', action: 'Exclude Placement', status: 'pending', time: '6h ago' },
  { id: 'r7', platform: 'Meta Ads', type: 'Budget', title: 'Increase Retargeting - 30 Day budget by 20%', description: 'This campaign has the highest ROAS (7.50) and lowest frequency (3.2). Scaling budget by 20% (₹960/day) could generate an additional ₹7,200/day in revenue.', impact: 'medium', action: 'Increase Budget', status: 'pending', time: '8h ago' },
  { id: 'r8', platform: 'Shopify', type: 'Inventory', title: 'Restock TrailBlazer Hiking Boots', description: 'Out of stock but generated ₹3.9L last month. Lost revenue estimated at ₹13,000/day. Prioritize restocking.', impact: 'high', action: 'Restock', status: 'pending', time: '10h ago' },
];

export const connectedAccounts: ConnectedAccount[] = [
  { id: 'c1', platform: 'google-ads', accountName: 'ShoeStore India - MCC', status: 'connected', connectedAt: '2026-08-15T10:30:00Z' },
  { id: 'c2', platform: 'meta-ads', accountName: 'ShoeStore Business Manager', status: 'connected', connectedAt: '2026-08-15T11:00:00Z' },
  { id: 'c3', platform: 'shopify', accountName: 'shoestore.myshopify.com', status: 'connected', connectedAt: '2026-08-14T09:15:00Z' },
  { id: 'c4', platform: 'ga4', accountName: 'ShoeStore - Web Property', status: 'connected', connectedAt: '2026-08-16T14:20:00Z' },
  { id: 'c5', platform: 'merchant', accountName: 'ShoeStore Merchant Center', status: 'connected', connectedAt: '2026-08-17T09:00:00Z' },
  { id: 'c6', platform: 'gtm', accountName: 'ShoeStore - GTM Container', status: 'disconnected', connectedAt: '' },
];

export const reports: Report[] = [
  { id: 'rep1', type: 'daily', title: 'Daily Performance Report - Sep 12', dateRange: 'Sep 12, 2026', summary: 'Total spend ₹48,000, revenue ₹2,10,000, ROAS 4.37. Meta frequency alert detected. Google CPC up 17%.', createdAt: '2026-09-12T23:59:00Z' },
  { id: 'rep2', type: 'daily', title: 'Daily Performance Report - Sep 11', dateRange: 'Sep 11, 2026', summary: 'Total spend ₹44,000, revenue ₹1,95,000, ROAS 4.43. Performance stable across channels.', createdAt: '2026-09-11T23:59:00Z' },
  { id: 'rep3', type: 'weekly', title: 'Weekly Report - Sep 6-12', dateRange: 'Sep 6 - Sep 12, 2026', summary: 'Weekly spend ₹3,14,000, revenue ₹13,95,000, ROAS 4.44. Best campaign: Search - Brand (8.29 ROAS). 3 alerts detected.', createdAt: '2026-09-12T23:59:00Z' },
  { id: 'rep4', type: 'weekly', title: 'Weekly Report - Aug 30 - Sep 5', dateRange: 'Aug 30 - Sep 5, 2026', summary: 'Weekly spend ₹2,98,000, revenue ₹12,80,000, ROAS 4.30. Performance Max campaign scaled successfully.', createdAt: '2026-09-05T23:59:00Z' },
  { id: 'rep5', type: 'monthly', title: 'Monthly Report - August 2026', dateRange: 'Aug 1 - Aug 31, 2026', summary: 'Monthly spend ₹12,40,000, revenue ₹54,20,000, ROAS 4.37. Best product: AirFlex Running Shoes. 4 new campaigns launched.', createdAt: '2026-08-31T23:59:00Z' },
];

export const channelData = [
  { name: 'Google Ads', spend: 28000, revenue: 134000, roas: 4.79, color: '#3b82f6' },
  { name: 'Meta Ads', spend: 20000, revenue: 76000, roas: 3.80, color: '#8b5cf6' },
  { name: 'Organic', spend: 0, revenue: 42000, roas: 0, color: '#10b981' },
  { name: 'Direct', spend: 0, revenue: 28000, roas: 0, color: '#f59e0b' },
  { name: 'Email', spend: 0, revenue: 15000, roas: 0, color: '#ef4444' },
];

export const ga4LandingPages = [
  { page: '/Home', sessions: 24500, conversions: 320, rate: 1.31, revenue: 804800, bounceRate: 38.2 },
  { page: '/products/running-shoes', sessions: 18200, conversions: 285, rate: 1.56, revenue: 712215, bounceRate: 32.1 },
  { page: '/products/sneakers', sessions: 15800, conversions: 198, rate: 1.25, revenue: 593802, bounceRate: 41.5 },
  { page: '/collections/best-sellers', sessions: 12400, conversions: 165, rate: 1.33, revenue: 414835, bounceRate: 35.8 },
  { page: '/products/hiking-boots', sessions: 9800, conversions: 88, rate: 0.90, revenue: 351912, bounceRate: 45.2 },
  { page: '/checkout', sessions: 6200, conversions: 186, rate: 3.00, revenue: 466814, bounceRate: 22.4 },
];

export const merchantIssues = [
  { issue: 'Missing GTIN', count: 24, severity: 'warning' as const, products: ['AirFlex Running Shoes', 'ProStride Sneakers', 'CloudStep Walking Shoes'] },
  { issue: 'Price mismatch', count: 8, severity: 'critical' as const, products: ['TrailBlazer Hiking Boots', 'SpeedForce Athletic Shoes'] },
  { issue: 'Missing images', count: 3, severity: 'warning' as const, products: ['UrbanFlex Casual Sneakers'] },
  { issue: 'Product disapproved', count: 5, severity: 'critical' as const, products: ['UrbanFlex Casual Sneakers', 'GripMax Training Shoes'] },
  { issue: 'Policy violation', count: 1, severity: 'critical' as const, products: ['Endurance Pro Running'] },
];

export const gtmTags = [
  { name: 'GA4 - Page View', type: 'Tag', status: 'active' as const, triggers: 'All Pages', lastChanged: 'Sep 10' },
  { name: 'GA4 - Purchase', type: 'Tag', status: 'active' as const, triggers: 'Checkout Complete', lastChanged: 'Sep 8' },
  { name: 'Meta Pixel - PageView', type: 'Tag', status: 'active' as const, triggers: 'All Pages', lastChanged: 'Sep 5' },
  { name: 'Meta Pixel - Purchase', type: 'Tag', status: 'paused' as const, triggers: 'Checkout Complete', lastChanged: 'Aug 28' },
  { name: 'Google Ads - Conversion', type: 'Tag', status: 'active' as const, triggers: 'Thank You Page', lastChanged: 'Sep 12' },
  { name: 'Scroll Depth Trigger', type: 'Trigger', status: 'active' as const, triggers: 'Scroll 50%', lastChanged: 'Aug 15' },
  { name: 'Form Submission Trigger', type: 'Trigger', status: 'active' as const, triggers: 'Form Submit', lastChanged: 'Aug 15' },
  { name: 'Data Layer Variable', type: 'Variable', status: 'active' as const, triggers: '-', lastChanged: 'Aug 15' },
];

export const chatSuggestions = [
  'Why did my ROAS drop yesterday?',
  'Which product should I advertise?',
  'What is my best performing campaign?',
  'How can I improve my Google Ads?',
  'Which keywords should I pause?',
  'What issues need my attention?',
];
