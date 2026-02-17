'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

const stats = [
  { value: 125000, suffix: 'K+', label: 'Pairs of shoes donated' },
  { value: 420, suffix: '', label: 'Villages reached' },
  { value: 18, suffix: '', label: 'Regions we serve' },
  { value: 94, suffix: '%', label: 'Positive impact' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-bold text-white tracking-tight">
      {count >= 1000 ? `${Math.floor(count / 1000)}` : count}{suffix}
    </span>
  );
}

export default function Impact() {
  return (
    <section className="py-20 md:py-32 bg-secondary-900 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-secondary-900/90 mix-blend-multiply z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 grayscale"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80)' }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Stats */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm border border-white/20">
                Our Impact
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display leading-tight">
                Changing lives, <br/> one pair at a time.
              </h2>
              <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
                Since our founding, we've been dedicated to providing shoes and education to those who need it most.
                Here's the impact we've made together through your generous support.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-6 border-l-4 border-primary-500"
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="text-gray-400 mt-2 text-sm md:text-base font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 relative"
            >
              <Quote className="absolute top-6 left-6 text-primary-500 opacity-50" size={40} />
              <div className="relative z-10 pl-8">
                <p className="text-white text-xl italic font-light mb-6">
                  "This organization changed my life. Now I can walk to school safely without fear of injury or infection. Thank you for giving me a chance."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    S
                  </div>
                  <div>
                    <p className="text-white font-bold">Sarah Amankwah</p>
                    <p className="text-primary-300 text-sm">12 years old, Volta Region</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Image Composition */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-4 pt-12">
                 <img 
                   src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80" 
                   alt="Happy children with new shoes" 
                   className="rounded-2xl shadow-2xl w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                 />
                 <img 
                   src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80" 
                   alt="Volunteers distributing shoes" 
                   className="rounded-2xl shadow-2xl w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                 />
               </div>
               <div className="space-y-4">
                 <img 
                   src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80" 
                   alt="Close up of shoes" 
                   className="rounded-2xl shadow-2xl w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                 />
                 <img 
                   src="https://images.unsplash.com/photo-1542601906990-b4d3fb7d5763?w=600&q=80" 
                   alt="Community event" 
                   className="rounded-2xl shadow-2xl w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                 />
               </div>
             </div>
             
             {/* Decorative Circle */}
             <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-500/20 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
