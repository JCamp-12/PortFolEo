import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl">Page not found</h1>
      <p className="text-stone-700">This route is ready for future content, but nothing lives here yet.</p>
      <Link className="text-cedar" to="/">
        Return home
      </Link>
    </section>
  );
}
