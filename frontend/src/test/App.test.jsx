import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { PortfolioProvider } from '../context/PortfolioContext';
import AppRoutes from '../app/routes';

async function renderRoute(initialEntries = ['/']) {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <PortfolioProvider>
        <AppRoutes />
      </PortfolioProvider>
    </MemoryRouter>
  );
}

test('shows five project cards on the homepage', async () => {
  await renderRoute();
  expect(await screen.findAllByRole('link', { name: /view project/i })).toHaveLength(5);
});

test('opens the projects dropdown and shows project links', async () => {
  const user = userEvent.setup();
  await renderRoute();
  await screen.findAllByRole('link', { name: /view project/i });
  await user.click(screen.getByRole('button', { name: /projects/i }));
  expect(screen.getByRole('menu')).toBeInTheDocument();
  expect(screen.getByRole('menuitem', { name: /signal stack/i })).toBeInTheDocument();
});

test('navigates to a product page from the dropdown', async () => {
  const user = userEvent.setup();
  await renderRoute();
  await screen.findAllByRole('link', { name: /view project/i });
  await user.click(screen.getByRole('button', { name: /projects/i }));
  await user.click(screen.getByRole('menuitem', { name: /field notes/i }));
  expect(await screen.findByRole('heading', { name: /field notes/i })).toBeInTheDocument();
  expect(screen.getByText(/frontend systems and content modeling/i, { exact: false })).toBeInTheDocument();
});

test('links to the contact page from the header', async () => {
  const user = userEvent.setup();
  await renderRoute();
  await user.click(screen.getByRole('link', { name: /^contact$/i }));
  expect(await screen.findByRole('heading', { name: /^contact$/i })).toBeInTheDocument();
});

test('shows validation warnings on the contact page', async () => {
  const user = userEvent.setup();
  await renderRoute(['/contact']);
  await user.type(screen.getByLabelText(/name/i), '<script>');
  await user.type(screen.getByLabelText(/email/i), 'jason@campbell.dev');
  await user.type(screen.getByLabelText(/message/i), 'Portfolio note');
  await user.click(screen.getByRole('button', { name: /send message/i }));
  expect(await screen.findByRole('status')).toHaveTextContent(/fix the highlighted fields/i);
});

test('submits the contact form successfully', async () => {
  const user = userEvent.setup();
  await renderRoute(['/contact']);
  await user.type(screen.getByLabelText(/name/i), 'Jason Campbell');
  await user.type(screen.getByLabelText(/email/i), 'jason@campbell.dev');
  await user.type(screen.getByLabelText(/message/i), 'Portfolio update request');
  await user.click(screen.getByRole('button', { name: /send message/i }));
  expect(await screen.findByText(/ready for future storage/i)).toBeInTheDocument();
});

test('submits a quick question from the homepage chat prompt', async () => {
  const user = userEvent.setup();
  await renderRoute();
  await user.click(screen.getByRole('button', { name: /open quick chat/i }));
  await user.click(screen.getByRole('button', { name: /^ask a question$/i }));
  await user.type(screen.getByLabelText(/name/i), 'Jason Campbell');
  await user.type(screen.getByLabelText(/email/i), 'jason@campbell.dev');
  await user.type(screen.getByLabelText(/question/i), 'Can we talk about Signal Stack?');
  await user.click(screen.getByRole('button', { name: /send question/i }));
  expect(await screen.findByText(/ready for future storage/i)).toBeInTheDocument();
});
