import { BrowserRouter } from 'react-router-dom';
import { PortfolioProvider } from '../context/PortfolioContext';
import AppRoutes from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <PortfolioProvider>
        <AppRoutes />
      </PortfolioProvider>
    </BrowserRouter>
  );
}
