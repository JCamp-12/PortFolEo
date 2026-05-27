import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <section className="w-full space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.22em] text-stone-500">Jason Campbell</p>
        <h1 className="text-4xl">Contact</h1>
        <p className="max-w-2xl text-sm leading-7 text-stone-700">
          Send a short note, leave your information, or ask a question about a project.
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
