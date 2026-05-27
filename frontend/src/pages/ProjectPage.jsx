import { Link, useParams } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

function DetailRow({ label, value }) {
  return (
    <div className="grid gap-2 border-t border-stone-200 py-4 md:grid-cols-[160px_1fr]">
      <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">{label}</dt>
      <dd className="text-sm leading-7 text-stone-700">{value}</dd>
    </div>
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const { error, loading, projects } = usePortfolio();
  const project = projects.find((item) => item.slug === slug);

  if (loading) {
    return <p className="text-sm text-stone-600">Loading project...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-700">{error}</p>;
  }

  if (!project) {
    return (
      <section className="space-y-4">
        <h1 className="text-3xl">Project not found</h1>
        <Link className="text-cedar" to="/">
          Return home
        </Link>
      </section>
    );
  }

  return (
    <article className="w-full space-y-8 rounded-3xl bg-white p-8 shadow-sm">
      <img alt={project.title} className="h-72 w-full rounded-2xl object-cover" src={project.image} />
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.22em] text-stone-500">{project.category}</p>
        <h1 className="text-4xl">{project.title}</h1>
        <p className="max-w-3xl text-base leading-8 text-stone-700">{project.summary}</p>
      </div>
      <dl>
        <DetailRow label="Role" value={project.role} />
        <DetailRow label="Stack" value={project.stack.join(', ')} />
        <DetailRow label="Outcome" value={project.outcome} />
      </dl>
      <Link className="inline-flex rounded border border-cedar px-4 py-2 text-sm text-cedar" to="/">
        Back to all projects
      </Link>
    </article>
  );
}
