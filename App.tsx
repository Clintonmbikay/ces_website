import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import HomePage from './screens/HomePage';
import VehiculesPage from './screens/VehiculesPage';
import ImmobilierPage from './screens/ImmobilierPage';
import AutoEcolePage from './screens/AutoEcolePage';
import CarrieresPage from './screens/CarrieresPage';
import ContactPage from './screens/ContactPage';
import ReservationPage from './screens/ReservationPage';
import NotFoundPage from './screens/NotFoundPage';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicules" element={<VehiculesPage />} />
          <Route path="/immobilier" element={<ImmobilierPage />} />
          <Route path="/auto-ecole" element={<AutoEcolePage />} />
          <Route path="/carrieres" element={<CarrieresPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}