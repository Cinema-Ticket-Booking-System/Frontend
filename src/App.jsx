import { useState } from 'react';
import { Terminal, Activity, Layers, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-canvas text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <header className="border-b border-border-subtle bg-surface/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-semibold tracking-tight text-white">SYS.CORE</span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-elevated text-accent border border-border-subtle">
              v1.0.0
            </span>
          </div>

          <nav className="flex items-center gap-2">
            {['overview', 'tokens'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'bg-accent text-canvas font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-surface-elevated'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10 space-y-8">
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-subtle pb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
              Dark Architecture Ready
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              System Control & Token Scaffold
            </h1>
            <p className="text-slate-400 mt-1 max-w-xl">
              Configured with deep obsidian surfaces, high-contrast amber accents, and paired Inter + JetBrains Mono typography.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-canvas font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer">
            <span>Deploy Instance</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </section>

        {/* Metrics & Token Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface border border-border-subtle rounded-xl p-6 space-y-3">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-sm font-medium">Canvas Base</span>
              <Layers className="w-4 h-4 text-accent" />
            </div>
            <div className="flex items-center gap-3">
              <span
                className="h-10 w-10 rounded-lg border border-white/15 shadow-inner"
                style={{ backgroundColor: '#0B0E14' }}
                aria-label="Canvas Base color swatch"
              />
              <div className="font-mono text-2xl font-semibold text-white">#0B0E14</div>
            </div>
            <p className="text-xs text-slate-400">
              Primary viewport background mapped to <code className="text-accent">bg-canvas</code>
            </p>
          </div>

          <div className="bg-surface border border-border-subtle rounded-xl p-6 space-y-3">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-sm font-medium">Surface Layer</span>
              <Layers className="w-4 h-4 text-accent" />
            </div>
            <div className="flex items-center gap-3">
              <span
                className="h-10 w-10 rounded-lg border border-white/15 shadow-inner"
                style={{ backgroundColor: '#111622' }}
                aria-label="Surface Layer color swatch"
              />
              <div className="font-mono text-2xl font-semibold text-white">#111622</div>
            </div>
            <p className="text-xs text-slate-400">
              Card and panel container mapped to <code className="text-accent">bg-surface</code>
            </p>
          </div>

          <div className="bg-surface border border-border-subtle rounded-xl p-6 space-y-3">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-sm font-medium">Primary Accent</span>
              <Activity className="w-4 h-4 text-accent" />
            </div>
            <div className="flex items-center gap-3">
              <span
                className="h-10 w-10 rounded-lg border border-white/15 shadow-inner"
                style={{ backgroundColor: '#F59E0B' }}
                aria-label="Primary Accent color swatch"
              />
              <div className="font-mono text-2xl font-semibold text-accent">#F59E0B</div>
            </div>
            <p className="text-xs text-slate-400">
              Active states & highlights mapped to <code className="text-accent">text-accent</code>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
