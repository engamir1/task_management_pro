import React from 'react'
import Hero from './Hero'
import Features from './Features'
import KanbanShowcase from './KanbanShowcase'
import Testimonials from './Testimonials'
import Pricing from './Pricing'
import CTA from './CTA'

const Home = () => {
    return (
        <div>   
               <Hero />
            <Features />
            <KanbanShowcase />
            <Testimonials />
            <Pricing />
            <CTA />
        </div>
    )
}

export default Home