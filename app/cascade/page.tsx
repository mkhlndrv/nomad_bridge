import fs from 'fs';
import path from 'path';

// Define expected interfaces
interface TestReport {
  numTotalTests: number;
  numPassedTests: number;
  numFailedTests: number;
  startTime: number;
}

export default async function CascadeDashboard() {
  // 1. Fetch Docs Index Stats
  let docStats = { totalDocs: 0, generatedAt: 'Never' };
  try {
    const indexPath = path.join(process.cwd(), 'docs', 'index.json');
    if (fs.existsSync(indexPath)) {
      const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
      docStats.totalDocs = indexData.totalDocs;
      docStats.generatedAt = new Date(indexData.generatedAt).toLocaleString();
    }
  } catch (e) {
    console.error('Failed to read docs index', e);
  }

  // 2. Fetch Test Report Stats
  let testStats = { total: 0, passed: 0, failed: 0, lastRun: 'Never' };
  try {
    const reportPath = path.join(process.cwd(), 'reports', 'coverage', 'coverage-summary.json');
    if (fs.existsSync(reportPath)) {
      // Vitest coverage summary gives coverage, but if we want test success we could read a JSON reporter output
      testStats.lastRun = fs.statSync(reportPath).mtime.toLocaleString();
    }
  } catch (e) {
    // Ignore if not present yet
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8 font-sans">
      <header className="mb-10 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Cascade Development Dashboard</h1>
        <p className="text-neutral-400">Real-time health parameters for the NomadBridge agentic orchestrator.</p>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Documentation Index */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Documentation Index</h2>
            <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/20">Active</span>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-neutral-500 text-sm">Indexed Documents</p>
              <p className="text-3xl font-mono text-white">{docStats.totalDocs}</p>
            </div>
            <div>
              <p className="text-neutral-500 text-sm">Last Indexed</p>
              <p className="text-sm font-mono text-neutral-300">{docStats.generatedAt}</p>
            </div>
            <div className="pt-4 border-t border-neutral-800">
              <p className="text-xs text-neutral-500">Run <code className="text-emerald-400">npm run docs:index</code> or <code className="text-emerald-400">npm run docs:search</code> to interact via CLI.</p>
            </div>
          </div>
        </section>

        {/* Card 2: Tests & Reliability */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Testing & Coverage</h2>
            <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/20">Vitest</span>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-neutral-500 text-sm">Framework</p>
              <p className="text-lg font-mono text-white">Vitest + V8 Coverage</p>
            </div>
            <div>
              <p className="text-neutral-500 text-sm">Last Report Generated</p>
              <p className="text-sm font-mono text-neutral-300">{testStats.lastRun}</p>
            </div>
            <div className="pt-4 border-t border-neutral-800 flex justify-between items-center">
              <p className="text-xs text-neutral-500">Run <code className="text-blue-400">npm run test:report</code></p>
              <a href="/reports/test-report.html" className="text-xs text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider font-semibold">
                Open UI Report →
              </a>
            </div>
          </div>
        </section>

        {/* Card 3: Project Architecture */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Development Architecture</h2>
            <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/20">Next.js 16</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800/50">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Database</p>
              <p className="font-mono text-sm">Prisma 7.5 (SQLite)</p>
            </div>
            <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800/50">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Frontend</p>
              <p className="font-mono text-sm">React 19 + Tailwind 4</p>
            </div>
            <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800/50">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Components</p>
              <p className="font-mono text-sm">8 Features</p>
            </div>
            <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800/50">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Testing</p>
              <p className="font-mono text-sm">Vitest</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
