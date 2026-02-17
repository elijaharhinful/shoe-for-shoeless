'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className={`text-2xl md:text-3xl font-bold font-display transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              <span className="text-primary-500">SHOE</span>
              <span className={isScrolled ? 'text-secondary-500' : 'text-white'}>FOR</span>
              <span className="text-primary-500">SHOELESS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Who We Are', 'Our Impact', 'Ways to Give', 'Stories'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                  isScrolled
                    ? 'text-gray-600 hover:text-primary-500'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className={`px-6 py-2.5 rounded-full font-semibold transition-all border-2 ${
                  isScrolled
                    ? 'text-primary-500 border-primary-500 hover:bg-primary-50'
                    : 'text-white border-white/30 hover:bg-white/10'
                }`}>
              Get Involved
            </button>
            <button className="px-6 py-2.5 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Donate
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-6 space-y-4">
              {['Who We Are', 'Our Impact', 'Ways to Give', 'Stories'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block text-gray-700 hover:text-primary-500 font-medium text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <div className="pt-6 space-y-3 border-t border-gray-100 mt-4">
                <button className="w-full px-6 py-3 text-primary-500 border-2 border-primary-500 rounded-full font-semibold hover:bg-primary-50">
                  Get Involved
                </button>
                <button className="w-full px-6 py-3 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 shadow-lg">
                  Donate
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
