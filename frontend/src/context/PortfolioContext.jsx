import { createContext, useContext, useEffect, useState } from 'react';
import { fetchProjects } from '../data/api';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects()
      .then((items) => {
        setProjects(items);
        setError('');
      })
      .catch(() => setError('Projects are temporarily unavailable.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortfolioContext.Provider value={{ error, loading, projects }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const value = useContext(PortfolioContext);

  if (!value) {
    throw new Error('usePortfolio must be used inside PortfolioProvider.');
  }

  return value;
}
