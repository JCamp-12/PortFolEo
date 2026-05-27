import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import QuickChatPrompt from '../components/QuickChatPrompt';
import { usePortfolio } from '../context/PortfolioContext';

const defaultStatus = 'Checking backend status...';

export default function HomePage() {
  const [status, setStatus] = useState(defaultStatus);
  const { error, loading, projects } = usePortfolio();

  useEffect(() => {
    fetch('/api/health')
      .then((response) => response.json())
      .then((data) => setStatus(data.message))
      .catch(() => setStatus('Backend offline. Frontend is still ready to build on.'));
  }, []);

  return (
    <section className="w-full space-y-10">
      <div className="grid gap-8 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.22em] text-stone-500">Jason Campbell</p>
          <h1 className="max-w-2xl text-4xl leading-tight md:text-5xl">
            A portfolio home for products, experiments, and the apps that come next.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-stone-700">
            This starter keeps the structure simple: a clear homepage, project routes,
            and room for case studies, screenshots, and linked work over time.
          </p>
        </div>
        <div className="space-y-4 rounded-2xl border border-stone-200 bg-stone-50 p-6">
          <h2 className="text-lg">Starter notes</h2>
          <p className="text-sm leading-7 text-stone-700">{status}</p>
          <p className="text-sm leading-7 text-stone-700">
            MongoDB is optional right now, so the backend can stay lightweight until you need data.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <QuickChatPrompt />
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {loading && <p className="text-sm text-stone-600">Loading projects...</p>}
          {!loading && error && <p className="text-sm text-red-700">{error}</p>}
          {!loading &&
            !error &&
            projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </div>
    </section>
  );
}
