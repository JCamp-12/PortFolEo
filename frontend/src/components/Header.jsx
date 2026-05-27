import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../../shared/projects';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-stone-300 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link className="text-xl font-semibold tracking-wide" to="/">
          Jason Campbell
        </Link>
        <nav className="flex items-center gap-6 text-sm uppercase tracking-[0.18em]">
          <Link to="/">Home</Link>
          <div className="relative">
            <button
              aria-expanded={open}
              aria-haspopup="menu"
              className="rounded border border-stone-300 px-3 py-2"
              onClick={() => setOpen((value) => !value)}
              type="button"
            >
              Projects
            </button>
            {open && (
              <div
                className="absolute right-0 top-14 w-64 rounded border border-stone-300 bg-white p-2 shadow-lg"
                role="menu"
              >
                {projects.map((project) => (
                  <Link
                    className="block rounded px-3 py-2 text-xs hover:bg-stone-100"
                    key={project.slug}
                    onClick={() => setOpen(false)}
                    role="menuitem"
                    to={`/projects/${project.slug}`}
                  >
                    {project.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
