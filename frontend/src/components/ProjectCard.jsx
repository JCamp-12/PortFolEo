import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-stone-300 bg-white shadow-sm">
      <img alt={project.title} className="h-48 w-full object-cover" src={project.image} />
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{project.category}</p>
          <h2 className="text-2xl">{project.title}</h2>
          <p className="text-sm leading-7 text-stone-700">{project.summary}</p>
        </div>
        <Link
          className="inline-flex rounded border border-cedar px-4 py-2 text-sm text-cedar"
          to={`/projects/${project.slug}`}
        >
          View project
        </Link>
      </div>
    </article>
  );
}
