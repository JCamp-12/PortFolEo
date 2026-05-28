import { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateContactPayload } from '../../../shared/contactValidation.js';
import { submitContact } from '../data/api';

const initialQuestion = {
  name: '',
  email: '',
  message: ''
};

export default function QuickChatPrompt() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('info');
  const [question, setQuestion] = useState(initialQuestion);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function updateQuestion(event) {
    const { name, value } = event.target;
    setQuestion((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  async function sendQuestion(event) {
    event.preventDefault();
    const result = validateContactPayload(question);

    if (!result.isValid) {
      setErrors(result.errors);
      setStatus('Please fix the highlighted fields and try again.');
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const response = await submitContact(result.contact);
      setQuestion(initialQuestion);
      setStatus(response.message);
    } catch (error) {
      setErrors(error.details || {});
      setStatus(error.message || 'That did not send. Please try the contact page.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm lg:sticky lg:top-6">
      <button
        aria-expanded={open}
        aria-label={open ? 'Close quick chat' : 'Open quick chat'}
        className="flex w-full items-start justify-between gap-4 text-left"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span className="space-y-3">
          <span className="block text-sm uppercase tracking-[0.22em] text-stone-500">Quick chat</span>
          <span className="block text-2xl leading-tight">Want to leave info or ask a question?</span>
          <span className="block text-sm leading-7 text-stone-700">
            You can also use the contact page for the full form.
          </span>
        </span>
        <span className="mt-1 text-2xl leading-none text-cedar">{open ? '-' : '+'}</span>
      </button>

      {open ? (
        <div className="mt-6 overflow-hidden">
          <div className="flex flex-col gap-3">
            <button className={choiceClass(mode === 'info')} onClick={() => setMode('info')} type="button">
              Leave information
            </button>
            <button className={choiceClass(mode === 'question')} onClick={() => setMode('question')} type="button">
              Ask a question
            </button>
          </div>

          {mode === 'info' ? <InfoPanel /> : null}
          {mode === 'question' ? (
            <QuestionForm
              errors={errors}
              onChange={updateQuestion}
              onSubmit={sendQuestion}
              question={question}
              status={status}
              submitting={submitting}
            />
          ) : null}
        </div>
      ) : null}
    </aside>
  );
}

function InfoPanel() {
  return (
    <div className="mt-5 rounded border border-stone-200 bg-stone-50 p-5">
      <p className="text-sm leading-7 text-stone-700">
        The contact page is the best spot to leave your name, email, and a short note.
      </p>
      <Link className="mt-3 inline-flex text-sm text-cedar" to="/contact">
        Go to contact page
      </Link>
    </div>
  );
}

function QuestionForm({ errors, onChange, onSubmit, question, status, submitting }) {
  return (
    <form className="mt-5 grid gap-4" onSubmit={onSubmit}>
      <MiniField error={errors.name} label="Name" name="name" onChange={onChange} value={question.name} />
      <MiniField error={errors.email} label="Email" name="email" onChange={onChange} value={question.email} />
      <MiniField
        error={errors.message}
        label="Question"
        name="message"
        onChange={onChange}
        textarea
        value={question.message}
      />
      <button className="w-fit rounded border border-cedar px-5 py-3 text-sm text-cedar" disabled={submitting}>
        {submitting ? 'Sending...' : 'Send question'}
      </button>
      {status && <p className="text-sm text-stone-700" role="status">{status}</p>}
    </form>
  );
}

function MiniField({ className = '', error, label, name, onChange, textarea, value }) {
  const inputClass = 'w-full rounded border border-stone-300 px-4 py-3 text-sm';

  return (
    <label className={`space-y-2 ${className}`.trim()}>
      <span className="text-sm text-stone-700">{label}</span>
      {textarea ? (
        <textarea className={`${inputClass} min-h-28`} name={name} onChange={onChange} value={value} />
      ) : (
        <input className={inputClass} name={name} onChange={onChange} value={value} />
      )}
      {error && <span className="text-sm text-red-700">{error}</span>}
    </label>
  );
}

function choiceClass(active) {
  return `rounded border px-4 py-2 text-sm ${
    active ? 'border-cedar bg-stone-100 text-cedar' : 'border-stone-300 text-stone-700'
  }`;
}
