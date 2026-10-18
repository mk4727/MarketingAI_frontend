import { useState, useEffect, useCallback } from 'react';
import {
  Layout, Save, Plus, Trash2, GripVertical, RotateCcw, Check,
} from 'lucide-react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/auth';
import { cn } from '@/lib/utils';

interface Feature {
  icon: string;
  title: string;
  desc: string;
}
interface Step {
  num: string;
  title: string;
  desc: string;
}
interface Plan {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: { text: string }[];
  cta: string;
  highlighted: boolean;
}
interface Stat {
  value: string;
  label: string;
}
interface SiteContentData {
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
  features?: Feature[];
  howTitle?: string;
  howDescription?: string;
  steps?: Step[];
  uspBadge?: string;
  uspTitle?: string;
  uspTitleHighlight?: string;
  uspDescription?: string;
  stats?: Stat[];
  pricingTitle?: string;
  pricingDescription?: string;
  plans?: Plan[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  footerText?: string;
  footerLinks?: { label: string; url: string }[];
}

type Section = 'branding' | 'hero' | 'features' | 'how' | 'usp' | 'stats' | 'pricing' | 'cta' | 'footer';

const sectionLabels: Record<Section, string> = {
  branding: 'Branding',
  hero: 'Hero Section',
  features: 'Features',
  how: 'How It Works',
  usp: 'USP Section',
  stats: 'Stats Bar',
  pricing: 'Pricing Plans',
  cta: 'CTA Section',
  footer: 'Footer',
};

const inputClass = 'w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all';
const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

export function Admin() {
  const { user } = useAuthStore();
  const [content, setContent] = useState<SiteContentData>({});
  const [section, setSection] = useState<Section>('branding');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const load = useCallback(async () => {
    try {
      const data = await api.content.get();
      setContent(data);
    } catch {
      setContent({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const update = (key: keyof SiteContentData, value: any) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const save = async () => {
    setSaving(true);
    setSavedMsg('');
    try {
      await api.content.update(content);
      setSavedMsg('Saved successfully');
      setTimeout(() => setSavedMsg(''), 3000);
    } catch {
      setSavedMsg('Save failed — admin access required');
    } finally {
      setSaving(false);
    }
  };

  if (!user?.isAdmin) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
          <p className="text-sm font-semibold text-amber-800">Admin Access Required</p>
          <p className="text-xs text-amber-700 mt-1.5">
            Your account needs admin privileges to manage site content. Contact your administrator.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-teal-600" />
      </div>
    );
  }

  const sections = Object.keys(sectionLabels) as Section[];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
            <Layout className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Admin Portal</h1>
            <p className="text-sm text-slate-500">Edit your website landing page content</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {savedMsg && (
            <span className={cn('flex items-center gap-1.5 text-sm font-medium', savedMsg.includes('fail') ? 'text-red-600' : 'text-emerald-600')}>
              <Check className="h-4 w-4" /> {savedMsg}
            </span>
          )}
          <button
            onClick={load}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition-all disabled:opacity-60"
          >
            <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6">
        {/* Section sidebar */}
        <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={cn(
                'rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors whitespace-nowrap text-left',
                section === s ? 'bg-teal-50 text-teal-700' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              )}
            >
              {sectionLabels[s]}
            </button>
          ))}
        </div>

        {/* Editor panel */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
          {section === 'branding' && (
            <>
              <div>
                <label className={labelClass}>Brand Name</label>
                <input className={inputClass} value={content.brandName || ''} onChange={(e) => update('brandName', e.target.value)} />
              </div>
            </>
          )}

          {section === 'hero' && (
            <>
              <div>
                <label className={labelClass}>Badge Text (small pill above title)</label>
                <input className={inputClass} value={content.heroBadge || ''} onChange={(e) => update('heroBadge', e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Title Line 1</label>
                  <input className={inputClass} value={content.heroTitleLine1 || ''} onChange={(e) => update('heroTitleLine1', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Title Line 2 (highlighted)</label>
                  <input className={inputClass} value={content.heroTitleLine2 || ''} onChange={(e) => update('heroTitleLine2', e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea rows={3} className={inputClass} value={content.heroDescription || ''} onChange={(e) => update('heroDescription', e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Primary Button Text</label>
                  <input className={inputClass} value={content.heroCtaPrimary || ''} onChange={(e) => update('heroCtaPrimary', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Secondary Button Text</label>
                  <input className={inputClass} value={content.heroCtaSecondary || ''} onChange={(e) => update('heroCtaSecondary', e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Subtext (under buttons)</label>
                <input className={inputClass} value={content.heroSubtext || ''} onChange={(e) => update('heroSubtext', e.target.value)} />
              </div>
            </>
          )}

          {section === 'features' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Badge Text</label>
                  <input className={inputClass} value={content.featuresBadge || ''} onChange={(e) => update('featuresBadge', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Section Title</label>
                  <input className={inputClass} value={content.featuresTitle || ''} onChange={(e) => update('featuresTitle', e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Section Description</label>
                <input className={inputClass} value={content.featuresDescription || ''} onChange={(e) => update('featuresDescription', e.target.value)} />
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700">Feature Cards</p>
                  <button onClick={() => update('features', [...(content.features || []), { icon: 'Zap', title: 'New Feature', desc: 'Description' }])} className="flex items-center gap-1 text-xs font-medium text-teal-600 hover:text-teal-700">
                    <Plus className="h-3.5 w-3.5" /> Add Feature
                  </button>
                </div>
                {(content.features || []).map((f, i) => (
                  <div key={i} className="rounded-lg border border-slate-200 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">Feature {i + 1}</span>
                      <button onClick={() => update('features', (content.features || []).filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Icon Name</label>
                        <input className={inputClass} value={f.icon} onChange={(e) => update('features', (content.features || []).map((x, idx) => idx === i ? { ...x, icon: e.target.value } : x))} placeholder="BarChart3" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Title</label>
                        <input className={inputClass} value={f.title} onChange={(e) => update('features', (content.features || []).map((x, idx) => idx === i ? { ...x, title: e.target.value } : x))} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
                      <textarea rows={2} className={inputClass} value={f.desc} onChange={(e) => update('features', (content.features || []).map((x, idx) => idx === i ? { ...x, desc: e.target.value } : x))} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {section === 'how' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Section Title</label>
                  <input className={inputClass} value={content.howTitle || ''} onChange={(e) => update('howTitle', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Section Description</label>
                  <input className={inputClass} value={content.howDescription || ''} onChange={(e) => update('howDescription', e.target.value)} />
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700">Steps</p>
                  <button onClick={() => update('steps', [...(content.steps || []), { num: String((content.steps?.length || 0) + 1).padStart(2, '0'), title: 'New Step', desc: 'Description' }])} className="flex items-center gap-1 text-xs font-medium text-teal-600 hover:text-teal-700">
                    <Plus className="h-3.5 w-3.5" /> Add Step
                  </button>
                </div>
                {(content.steps || []).map((s, i) => (
                  <div key={i} className="rounded-lg border border-slate-200 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">Step {i + 1}</span>
                      <button onClick={() => update('steps', (content.steps || []).filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-[60px_1fr] gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Num</label>
                        <input className={inputClass} value={s.num} onChange={(e) => update('steps', (content.steps || []).map((x, idx) => idx === i ? { ...x, num: e.target.value } : x))} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Title</label>
                        <input className={inputClass} value={s.title} onChange={(e) => update('steps', (content.steps || []).map((x, idx) => idx === i ? { ...x, title: e.target.value } : x))} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
                      <textarea rows={2} className={inputClass} value={s.desc} onChange={(e) => update('steps', (content.steps || []).map((x, idx) => idx === i ? { ...x, desc: e.target.value } : x))} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {section === 'usp' && (
            <>
              <div>
                <label className={labelClass}>Badge Text</label>
                <input className={inputClass} value={content.uspBadge || ''} onChange={(e) => update('uspBadge', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Title</label>
                <input className={inputClass} value={content.uspTitle || ''} onChange={(e) => update('uspTitle', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Title Highlight (muted text)</label>
                <input className={inputClass} value={content.uspTitleHighlight || ''} onChange={(e) => update('uspTitleHighlight', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea rows={4} className={inputClass} value={content.uspDescription || ''} onChange={(e) => update('uspDescription', e.target.value)} />
              </div>
            </>
          )}

          {section === 'stats' && (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">Stats Bar</p>
                <button onClick={() => update('stats', [...(content.stats || []), { value: '0', label: 'New Stat' }])} className="flex items-center gap-1 text-xs font-medium text-teal-600 hover:text-teal-700">
                  <Plus className="h-3.5 w-3.5" /> Add Stat
                </button>
              </div>
              {(content.stats || []).map((s, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Value</label>
                    <input className={inputClass} value={s.value} onChange={(e) => update('stats', (content.stats || []).map((x, idx) => idx === i ? { ...x, value: e.target.value } : x))} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Label</label>
                    <input className={inputClass} value={s.label} onChange={(e) => update('stats', (content.stats || []).map((x, idx) => idx === i ? { ...x, label: e.target.value } : x))} />
                  </div>
                  <button onClick={() => update('stats', (content.stats || []).filter((_, idx) => idx !== i))} className="rounded-lg border border-slate-300 p-2.5 text-red-500 hover:bg-slate-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </>
          )}

          {section === 'pricing' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Section Title</label>
                  <input className={inputClass} value={content.pricingTitle || ''} onChange={(e) => update('pricingTitle', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Section Description</label>
                  <input className={inputClass} value={content.pricingDescription || ''} onChange={(e) => update('pricingDescription', e.target.value)} />
                </div>
              </div>
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700">Pricing Plans</p>
                  <button onClick={() => update('plans', [...(content.plans || []), { name: 'New Plan', price: '₹0', period: '/month', desc: '', features: [], cta: 'Start free trial', highlighted: false }])} className="flex items-center gap-1 text-xs font-medium text-teal-600 hover:text-teal-700">
                    <Plus className="h-3.5 w-3.5" /> Add Plan
                  </button>
                </div>
                {(content.plans || []).map((p, i) => (
                  <div key={i} className="rounded-lg border border-slate-200 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">Plan {i + 1}</span>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 text-xs text-slate-600">
                          <input type="checkbox" checked={p.highlighted} onChange={(e) => update('plans', (content.plans || []).map((x, idx) => idx === i ? { ...x, highlighted: e.target.checked } : x))} className="rounded" />
                          Highlighted
                        </label>
                        <button onClick={() => update('plans', (content.plans || []).filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Name</label>
                        <input className={inputClass} value={p.name} onChange={(e) => update('plans', (content.plans || []).map((x, idx) => idx === i ? { ...x, name: e.target.value } : x))} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Price</label>
                        <input className={inputClass} value={p.price} onChange={(e) => update('plans', (content.plans || []).map((x, idx) => idx === i ? { ...x, price: e.target.value } : x))} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Period</label>
                        <input className={inputClass} value={p.period} onChange={(e) => update('plans', (content.plans || []).map((x, idx) => idx === i ? { ...x, period: e.target.value } : x))} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
                        <input className={inputClass} value={p.desc} onChange={(e) => update('plans', (content.plans || []).map((x, idx) => idx === i ? { ...x, desc: e.target.value } : x))} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">CTA Button Text</label>
                        <input className={inputClass} value={p.cta} onChange={(e) => update('plans', (content.plans || []).map((x, idx) => idx === i ? { ...x, cta: e.target.value } : x))} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Features (one per line)</label>
                      <textarea
                        rows={5}
                        className={inputClass}
                        value={p.features.map((f) => f.text).join('\n')}
                        onChange={(e) => update('plans', (content.plans || []).map((x, idx) => idx === i ? { ...x, features: e.target.value.split('\n').filter(Boolean).map((text) => ({ text })) } : x))}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {section === 'cta' && (
            <>
              <div>
                <label className={labelClass}>CTA Title</label>
                <input className={inputClass} value={content.ctaTitle || ''} onChange={(e) => update('ctaTitle', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>CTA Description</label>
                <textarea rows={3} className={inputClass} value={content.ctaDescription || ''} onChange={(e) => update('ctaDescription', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Button Text</label>
                <input className={inputClass} value={content.ctaButtonText || ''} onChange={(e) => update('ctaButtonText', e.target.value)} />
              </div>
            </>
          )}

          {section === 'footer' && (
            <>
              <div>
                <label className={labelClass}>Footer Copyright Text</label>
                <input className={inputClass} value={content.footerText || ''} onChange={(e) => update('footerText', e.target.value)} />
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700">Footer Links</p>
                  <button onClick={() => update('footerLinks', [...(content.footerLinks || []), { label: 'New Link', url: '#' }])} className="flex items-center gap-1 text-xs font-medium text-teal-600 hover:text-teal-700">
                    <Plus className="h-3.5 w-3.5" /> Add Link
                  </button>
                </div>
                {(content.footerLinks || []).map((l, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Label</label>
                      <input className={inputClass} value={l.label} onChange={(e) => update('footerLinks', (content.footerLinks || []).map((x, idx) => idx === i ? { ...x, label: e.target.value } : x))} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">URL</label>
                      <input className={inputClass} value={l.url} onChange={(e) => update('footerLinks', (content.footerLinks || []).map((x, idx) => idx === i ? { ...x, url: e.target.value } : x))} />
                    </div>
                    <button onClick={() => update('footerLinks', (content.footerLinks || []).filter((_, idx) => idx !== i))} className="rounded-lg border border-slate-300 p-2.5 text-red-500 hover:bg-slate-50">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
