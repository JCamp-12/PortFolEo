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

  await screen.findByText(/backend connected and ready/i);
}

test('shows five project cards on the homepage', async () => {
  await renderRoute();
  expect(screen.getAllByRole('link', { name: /view project/i })).toHaveLength(5);
});

test('opens the projects dropdown and shows project links', async () => {
  const user = userEvent.setup();
  await renderRoute();
  await user.click(screen.getByRole('button', { name: /projects/i }));
  expect(screen.getByRole('menu')).toBeInTheDocument();
  expect(screen.getByRole('menuitem', { name: /signal stack/i })).toBeInTheDocument();
});

test('navigates to a product page from the dropdown', async () => {
  const user = userEvent.setup();
  await renderRoute();
  await user.click(screen.getByRole('button', { name: /projects/i }));
  await user.click(screen.getByRole('menuitem', { name: /field notes/i }));
  expect(await screen.findByRole('heading', { name: /field notes/i })).toBeInTheDocument();
  expect(screen.getByText(/frontend systems and content modeling/i, { exact: false })).toBeInTheDocument();
});

test('shows validation warnings for unsafe contact input', async () => {
  const user = userEvent.setup();
  await renderRoute();
  await user.type(screen.getByLabelText(/name/i), '<script>');
  await user.type(screen.getByLabelText(/email/i), 'jason@campbell.dev');
  await user.type(screen.getByLabelText(/message/i), 'Portfolio note');
  await user.click(screen.getByRole('button', { name: /send message/i }));
  expect(await screen.findByRole('status')).toHaveTextContent(/fix the highlighted fields/i);
});

test('submits the contact form successfully', async () => {
  const user = userEvent.setup();
  await renderRoute();
  await user.type(screen.getByLabelText(/name/i), 'Jason Campbell');
  await user.type(screen.getByLabelText(/email/i), 'jason@campbell.dev');
  await user.type(screen.getByLabelText(/message/i), 'Portfolio update request');
  await user.click(screen.getByRole('button', { name: /send message/i }));
  expect(await screen.findByText(/ready for future storage/i)).toBeInTheDocument();
});
