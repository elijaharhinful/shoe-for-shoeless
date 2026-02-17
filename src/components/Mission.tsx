'use client';

import { motion } from 'framer-motion';
import { Footprints, Heart, BookOpen, ArrowRight } from 'lucide-react';

const pillars = [
  {
    title: 'Empower Youth',
    description: 'Providing shoes and resources to help young people reach their full potential and pursue education.',
    icon: Footprints,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    title: 'Health & Hygiene',
    description: 'Protecting children from diseases and infections by providing proper footwear and health education.',
    icon: Heart,
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
  {
    title: 'Education Focus',
    description: 'Enabling access to schools and educational opportunities through the simple gift of shoes.',
    icon: BookOpen,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
  },
];

export default function Mission() {
  return (
    <section id="about" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-600 text-xs font-bold uppercase tracking-widest mb-4">
            Our Mission
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-display">
            Where social impact <br className="hidden md:block" /> meets education.
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            We exist to provide shoes and education to those in need, empowering communities
            and creating lasting change one pair at a time.
          </p>
        </motion.div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-16 h-16 ${pillar.bg} ${pillar.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display">{pillar.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-8">{pillar.description}</p>
                
                <button className="flex items-center text-gray-900 font-semibold group/btn">
                  <span className="group-hover/btn:text-primary-600 transition-colors">Learn More</span>
                  <ArrowRight className="w-5 h-5 ml-2 text-gray-400 group-hover/btn:text-primary-600 group-hover/btn:translate-x-1 transition-all" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
