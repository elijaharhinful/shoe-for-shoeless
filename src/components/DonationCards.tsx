'use client';

import { motion } from 'framer-motion';
import { Package, Home, HandHeart, ArrowRight } from 'lucide-react';

const donationOptions = [
  {
    title: 'Donate Shoes',
    description: 'Provide a pair of shoes to a child in need. Your donation helps protect feet and enable education.',
    icon: Package,
    color: 'text-primary-500',
    bg: 'bg-primary-50',
    borderColor: 'border-primary-100',
    buttonColor: 'bg-primary-500',
    buttonHover: 'hover:bg-primary-600',
  },
  {
    title: 'Sponsor a Village',
    description: 'Support an entire community with shoes, education resources, and sustainable development programs.',
    icon: Home,
    color: 'text-secondary-500',
    bg: 'bg-secondary-50',
    borderColor: 'border-secondary-100',
    buttonColor: 'bg-secondary-500',
    buttonHover: 'hover:bg-secondary-600',
  },
  {
    title: 'Volunteer',
    description: 'Join our team on the ground. Help distribute shoes, teach workshops, and make a direct impact.',
    icon: HandHeart,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
    borderColor: 'border-yellow-100',
    buttonColor: 'bg-yellow-400',
    buttonHover: 'hover:bg-yellow-500',
    textColor: 'text-gray-900', // For yellow button readability
  },
];

export default function DonationCards() {
  return (
    <section id="ways-to-give" className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 border border-gray-200 shadow-sm">
            Ways to Give
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-display">
            Make a difference—it's <br className="hidden md:block"/> easier than you think.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Whether it's a pair of shoes, sponsoring a village, or volunteering your time,
            every contribution creates lasting change.
          </p>
        </motion.div>

        {/* Donation Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {donationOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border ${option.borderColor} flex flex-col`}
              >
                {/* Icon Circle */}
                <div className={`w-20 h-20 ${option.bg} ${option.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={40} strokeWidth={1.5} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display">{option.title}</h3>
                <p className="text-gray-500 mb-8 leading-relaxed flex-grow">{option.description}</p>

                <button className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center space-x-2 
                  ${option.buttonColor} ${option.buttonHover} ${option.textColor || 'text-white'}
                  group-hover:shadow-${option.color.split('-')[1]}-500/20`} // Simplified shadow logic
                >
                  <span>Get Started</span>
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
