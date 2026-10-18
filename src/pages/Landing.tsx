import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, Bot, BarChart3, Bell, FileText, Megaphone, ShoppingBag,
  Check, ArrowRight, Zap, Shield, Sparkles, LineChart, Target, AlertTriangle,
} from 'lucide-react';
import { api } from '@/lib/api';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BarChart3, Bot, Bell, FileText, Megaphone, ShoppingBag, Zap, Shield,
  Sparkles, LineChart, Target, AlertTriangle, TrendingUp, Check, ArrowRight,
};

interface SiteContent {
  brandName?: string;
  heroBadge?: string;
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroDescription?: string;
  heroCtaPrimary?: string;
  heroCtaSecondary?: string;
  heroSubtext?: string;
  featuresBadge?: string;
  featuresTitle?: string;
  featuresDescription?: string;
  features?: { icon: string; title: string; desc: string }[];
  howTitle?: string;
  howDescription?: string;
  steps?: { num: string; title: string; desc: string }[];
  uspBadge?: string;
  uspTitle?: string;
  uspTitleHighlight?: string;
  uspDescription?: string;
  stats?: { value: string; label: string }[];
  pricingTitle?: string;
  pricingDescription?: string;
  plans?: { name: string; price: string; period: string; desc: string; features: { text: string }[]; cta: string; highlighted: boolean }[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  footerText?: string;
  footerLinks?: { label: string; url: string }[];
}

const defaultContent: SiteContent = {
  brandName: 'MarketingAI',
  heroBadge: 'Your AI Performance Marketing Employee',
  heroTitleLine1: "Don't just see your data.",
  heroTitleLine2: 'Understand it.',
  heroDescription: 'One platform that connects Google Ads, Meta Ads, Shopify, and GA4 — then uses AI to tell you what happened, why it happened, and exactly what to do next.',
  heroCtaPrimary: 'Start your free trial',
  heroCtaSecondary: 'View live demo',
  heroSubtext: 'No credit card required · 14-day free trial · Cancel anytime',
  featuresBadge: 'Everything in one place',
  featuresTitle: 'The marketing platform that thinks',
  featuresDescription: 'Traditional dashboards show you data. MarketingAI tells you what to do with it.',
  features: [
    { icon: 'BarChart3', title: 'Unified Dashboard', desc: 'Google Ads, Meta, Shopify, GA4, and Merchant Center — all in one place. No more tab switching.' },
    { icon: 'Bot', title: 'AI Marketing Assistant', desc: 'Ask questions in plain English. Get insights on why metrics changed and what to do next.' },
    { icon: 'Bell', title: 'Smart Alerts', desc: 'Automatic detection of performance drops, tracking issues, and budget waste before they cost you.' },
    { icon: 'FileText', title: 'Automated Reports', desc: 'Daily, weekly, and monthly reports generated automatically with AI summaries and recommendations.' },
    { icon: 'Megaphone', title: 'Campaign Analysis', desc: 'Deep-dive into keywords, creatives, and placements with AI-suggested optimizations.' },
    { icon: 'ShoppingBag', title: 'E-commerce Insights', desc: 'Connect ad spend to actual Shopify revenue. Track AOV, best-sellers, and inventory health.' },
  ],
  howTitle: 'How it works',
  howDescription: 'Three steps to your AI marketing employee',
  steps: [
    { num: '01', title: 'Connect Your Accounts', desc: 'Securely link Google Ads, Meta Ads, Shopify, GA4, and Merchant Center via OAuth.' },
    { num: '02', title: 'AI Analyzes Your Data', desc: 'Our AI engine continuously monitors all your marketing data for patterns and problems.' },
    { num: '03', title: 'Get Recommendations', desc: 'Receive actionable recommendations and alerts. Ask the AI assistant anything.' },
  ],
  uspBadge: 'The difference',
  uspTitle: 'Traditional dashboards say',
  uspTitleHighlight: '"Here is your data."',
  uspDescription: 'MarketingAI says "Here is what happened, why it happened, and what you should do next." That is the difference between a reporting tool and an AI marketing employee.',
  stats: [
    { value: '6+', label: 'Platforms integrated' },
    { value: '40%', label: 'Avg. time saved on reporting' },
    { value: '3x', label: 'Faster problem detection' },
    { value: '24/7', label: 'AI monitoring' },
  ],
  pricingTitle: 'Simple, transparent pricing',
  pricingDescription: 'Choose the plan that fits your business. Upgrade or downgrade anytime.',
  plans: [
    { name: 'Starter', price: '₹1,999', period: '/month', desc: 'For single-brand D2C businesses', features: [{ text: '1 ad account' }, { text: 'Basic dashboard' }, { text: 'Basic AI analysis' }, { text: 'Daily & weekly reports' }, { text: 'Email alerts' }], cta: 'Start free trial', highlighted: false },
    { name: 'Growth', price: '₹4,999', period: '/month', desc: 'For growing D2C brands', features: [{ text: 'Up to 5 accounts' }, { text: 'Advanced AI recommendations' }, { text: 'All report types' }, { text: 'Dashboard + email alerts' }, { text: 'AI chat assistant' }, { text: 'Google Ads + Shopify + GA4' }], cta: 'Start free trial', highlighted: true },
    { name: 'Agency', price: '₹9,999', period: '/month', desc: 'For marketing agencies', features: [{ text: 'Multiple client accounts' }, { text: 'Multi-account dashboard' }, { text: 'Agency reporting' }, { text: 'Advanced AI analysis' }, { text: 'Slack notifications' }, { text: 'Priority support' }], cta: 'Contact sales', highlighted: false },
  ],
  ctaTitle: 'Ready to hire your AI marketing employee?',
  ctaDescription: 'Join D2C brands and agencies using MarketingAI to save hours of reporting and catch problems before they scale.',
  ctaButtonText: 'Start your free trial',
  footerText: '© 2026 MarketingAI. All rights reserved.',
  footerLinks: [{ label: 'Privacy', url: '#' }, { label: 'Terms', url: '#' }, { label: 'Security', url: '#' }],
};

export function Landing() {
  const navigate = useNavigate();
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    api.content.get().then(setContent).catch(() => {});
  }, []);

  const c = { ...defaultContent, ...content };
  const brandName = c.brandName || 'MarketingAI';

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-600">
              <TrendingUp className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-slate-900">{brandName}</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Features</a>
            <a href="#how" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">How it works</a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Sign in
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-700 hover:shadow-md"
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/40 via-white to-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-200/20 rounded-full blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 mb-6">
              <Sparkles className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-medium text-teal-700">{c.heroBadge}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-6">
              {c.heroTitleLine1}<br />
              <span className="text-teal-600">{c.heroTitleLine2}</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {c.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/signup')}
                className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition-all hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-600/30"
              >
                {c.heroCtaPrimary}
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-400"
              >
                {c.heroCtaSecondary}
              </button>
            </div>
            <p className="mt-4 text-xs text-slate-500">{c.heroSubtext}</p>
          </div>

          {/* Hero dashboard preview */}
          <div className="mt-16 mx-auto max-w-5xl">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 overflow-hidden">
              <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 text-center text-xs text-slate-400 font-medium">app.{brandName.toLowerCase()}.com/dashboard</div>
              </div>
              <div className="p-6 bg-slate-50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Ad Spend', value: '₹48,000', change: '+5.2%', color: 'text-emerald-600' },
                    { label: 'Revenue', value: '₹2,10,000', change: '+8.1%', color: 'text-emerald-600' },
                    { label: 'ROAS', value: '4.37', change: '-2.8%', color: 'text-red-600' },
                    { label: 'Orders', value: '186', change: '+12%', color: 'text-emerald-600' },
                  ].map((kpi) => (
                    <div key={kpi.label} className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="text-xs text-slate-500 mb-1">{kpi.label}</p>
                      <p className="text-lg font-bold text-slate-900">{kpi.value}</p>
                      <p className={`text-xs font-semibold ${kpi.color}`}>{kpi.change}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <p className="text-xs font-semibold text-slate-700">Problems Detected</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs text-slate-600">• Meta frequency reached 5.8</p>
                      <p className="text-xs text-slate-600">• Google CPC increased 17%</p>
                      <p className="text-xs text-slate-600">• Product ABC is out of stock</p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Bot className="h-4 w-4 text-teal-500" />
                      <p className="text-xs font-semibold text-slate-700">AI Recommendations</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs text-slate-600">• Reduce Campaign A budget by 15%</p>
                      <p className="text-xs text-slate-600">• Pause Keyword X</p>
                      <p className="text-xs text-slate-600">• Promote Product B</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {(c.stats || []).map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 mb-4">
              <Zap className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-medium text-slate-700">{c.featuresBadge}</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">{c.featuresTitle}</h2>
            <p className="text-lg text-slate-600">{c.featuresDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(c.features || []).map((feature, i) => {
              const Icon = iconMap[feature.icon] || Zap;
              return (
                <div key={i} className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 mb-4 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 lg:py-28 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">{c.howTitle}</h2>
            <p className="text-lg text-slate-600">{c.howDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(c.steps || []).map((step, idx) => (
              <div key={idx} className="relative">
                {idx < (c.steps?.length || 0) - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-px border-t-2 border-dashed border-slate-300" />
                )}
                <div className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-white text-xl font-bold mb-4 shadow-md">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 mb-4">
                <Target className="h-4 w-4 text-teal-600" />
                <span className="text-sm font-medium text-teal-700">{c.uspBadge}</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">
                {c.uspTitle}<br />
                <span className="text-slate-400">{c.uspTitleHighlight}</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">{c.uspDescription}</p>
              <div className="space-y-4">
                {[
                  { icon: LineChart, title: 'What happened', desc: 'AI summarizes performance changes across all connected platforms in plain English.' },
                  { icon: Target, title: 'Why it happened', desc: 'Root-cause analysis connects ad spend, traffic, and conversion data to explain every change.' },
                  { icon: Zap, title: 'What to do next', desc: 'Get specific, prioritized recommendations with expected impact — not just charts.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600 shrink-0">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Bot className="h-5 w-5 text-teal-400" />
                    <span className="text-sm font-semibold">AI Assistant</span>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-slate-700/50 p-3 ml-auto max-w-[80%]">
                      <p className="text-sm">Why did my ROAS drop yesterday?</p>
                    </div>
                    <div className="rounded-lg bg-teal-600 p-3 max-w-[90%]">
                      <p className="text-sm leading-relaxed">
                        Your ROAS dropped from 4.8 to 3.7 because Google Ads spend increased 25% while
                        conversion rate decreased by 18%. Shopify checkout conversion also dropped from
                        2.8% to 1.9%. The main driver was the Search - Non-Brand Generic campaign, which
                        had a 40% CPC increase due to increased auction competition.
                      </p>
                    </div>
                    <div className="rounded-lg bg-teal-600/80 p-3 max-w-[90%]">
                      <p className="text-sm font-medium mb-1">Recommended actions:</p>
                      <p className="text-sm">1. Reduce Non-Brand budget by 15%</p>
                      <p className="text-sm">2. Add "cheap" as negative keyword</p>
                      <p className="text-sm">3. Check GA4 for checkout funnel issues</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 lg:py-28 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">{c.pricingTitle}</h2>
            <p className="text-lg text-slate-600">{c.pricingDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {(c.plans || []).map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl border bg-white p-6 transition-all ${
                  plan.highlighted
                    ? 'border-teal-300 shadow-xl shadow-teal-600/10 scale-105'
                    : 'border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
                    Most popular
                  </div>
                )}
                <h3 className="text-lg font-bold text-slate-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-sm text-slate-500">{plan.period}</span>
                </div>
                <button
                  onClick={() => navigate('/signup')}
                  className={`w-full rounded-lg py-2.5 text-sm font-semibold transition-all ${
                    plan.highlighted
                      ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-md shadow-teal-600/20'
                      : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {plan.cta}
                </button>
                <div className="mt-6 space-y-3">
                  {plan.features.map((feat, fi) => (
                    <div key={fi} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600">{feat.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-10 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <Shield className="h-10 w-10 text-teal-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">{c.ctaTitle}</h2>
              <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">{c.ctaDescription}</p>
              <button
                onClick={() => navigate('/signup')}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition-all hover:bg-slate-100"
              >
                {c.ctaButtonText}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-600">
                <TrendingUp className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-bold text-slate-900">{brandName}</span>
            </div>
            <p className="text-sm text-slate-500">{c.footerText}</p>
            <div className="flex gap-6">
              {(c.footerLinks || []).map((link, i) => (
                <a key={i} href={link.url} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">{link.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
