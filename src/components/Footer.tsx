import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

const footerLinks = {
  'Quick Links': [
    { name: 'About Us', href: '#about' },
    { name: 'Our Impact', href: '#impact' },
    { name: 'Ways to Give', href: '#ways-to-give' },
    { name: 'Stories', href: '#stories' },
  ],
  'Get Involved': [
    { name: 'Donate', href: '#donate' },
    { name: 'Volunteer', href: '#volunteer' },
    { name: 'Partner With Us', href: '#partner' },
    { name: 'Careers', href: '#careers' },
  ],
  'Resources': [
    { name: 'Annual Reports', href: '#reports' },
    { name: 'Global Partners', href: '#partners' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'FAQ', href: '#faq' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative">
        {/* Newsletter Section */}
        <div className="bg-primary-600">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="md:w-1/2">
                        <h3 className="text-2xl md:text-3xl font-bold font-display mb-2">Join our newsletter</h3>
                        <p className="text-primary-100">Stay updated on our latest projects and impact stories.</p>
                    </div>
                    <div className="md:w-1/2 w-full">
                        <form className="flex flex-col sm:flex-row gap-3">
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
                                className="flex-grow px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <button type="button" className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg flex items-center justify-center">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6 group">
                <div className="text-3xl font-bold font-display tracking-tight">
                <span className="text-primary-500 group-hover:text-primary-400 transition-colors">SHOE</span>
                <span className="text-white">FOR</span>
                <span className="text-primary-500 group-hover:text-primary-400 transition-colors">SHOELESS</span>
                </div>
            </Link>
            <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">
              Empowering communities through education and footwear. Together, we're walking toward a brighter future, one step at a time.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
               {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                    <a key={idx} href="#" className="w-12 h-12 bg-gray-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                        <Icon size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                    </a>
               ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-lg mb-6 text-white">{category}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary-500 transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm">
          <p className="text-gray-500">
            © 2026 Shoe for Shoeless. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <Link href="#privacy" className="text-gray-500 hover:text-primary-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="text-gray-500 hover:text-primary-500 transition-colors">
              Terms of Service
            </Link>
            <Link href="#cookies" className="text-gray-500 hover:text-primary-500 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
