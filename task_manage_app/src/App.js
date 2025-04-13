import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import KanbanShowcase from './components/KanbanShowcase';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';
import MainBoard from './components/MainBoard';
import Home from './components/Home';
import Login from './components/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/main" element={<MainBoard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>);
};

export default App;




        {/* <Route path="/features" element={<Features />} />
        <Route path="/kanban" element={<KanbanShowcase />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/cta" element={<CTA />} /> */}
