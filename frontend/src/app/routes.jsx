import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import ContactPage from '../pages/ContactPage';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import ProjectPage from '../pages/ProjectPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route element={<HomePage />} index />
        <Route element={<ContactPage />} path="contact" />
        <Route element={<ProjectPage />} path="projects/:slug" />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  );
}
