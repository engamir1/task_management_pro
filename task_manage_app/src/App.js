import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import KanbanShowcase from './components/KanbanShowcase';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <Hero />
      <Features />
      <KanbanShowcase />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </Router>
  );
};

export default App;