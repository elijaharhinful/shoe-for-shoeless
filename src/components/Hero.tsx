'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const backgroundImages = [
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80',
  'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=1920&q=80',
  'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1920&q=80',
];

const donationAmounts = [25, 50, 100, 250, 500];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [donationFrequency, setDonationFrequency] = useState<'one-time' | 'monthly'>('one-time');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <div className="lg:col-span-7 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-400/90 backdrop-blur-sm text-gray-900 font-bold text-xs uppercase tracking-wider rounded-full mb-8 shadow-lg">
                <span>15 Years of Impact</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-6 leading-[1.1] tracking-tight">
                Walking toward a <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                  brighter future.
                </span>
              </h1>
              <p className="text-lg md:text-xl mb-10 text-gray-200 leading-relaxed max-w-xl font-light">
                We provide quality footwear to school children in remote areas of Ghana, ensuring every step they take toward education is safe, comfortable, and dignified.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group px-8 py-4 bg-yellow-400 text-gray-900 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] hover:scale-105 flex items-center justify-center">
                  Donate Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-semibold text-lg hover:bg-white/20 transition-all flex items-center justify-center hover:border-white/40">
                  Learn Our Story
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Donation Card */}
          <div className="lg:col-span-5 relative hidden lg:block">
             <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl rounded-3xl transform rotate-3 scale-95 opacity-50 blur-xl"></div>
              <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 relative overflow-hidden border border-white/40">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Make a Donation</h3>
                    <p className="text-sm text-gray-500">Support our mission today</p>
                  </div>
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    {['One-time', 'Monthly'].map((freq) => (
                      <button
                        key={freq}
                        onClick={() => setDonationFrequency(freq as any)}
                        className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                          donationFrequency === freq
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`py-3 rounded-xl font-bold text-lg transition-all border-2 relative overflow-hidden ${
                        selectedAmount === amount && !customAmount
                          ? 'border-yellow-400 bg-yellow-50 text-gray-900'
                          : 'border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                  <div className={`relative rounded-xl border-2 transition-all ${customAmount ? 'border-primary-500 bg-white' : 'border-transparent bg-gray-50'}`}>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                    <input
                      type="number"
                      placeholder="Custom"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(0);
                      }}
                      className="w-full h-full bg-transparent pl-7 pr-2 rounded-xl focus:outline-none font-bold text-lg text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Checkbox */}
                <label className="flex items-start space-x-3 mb-6 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-primary-500 peer-checked:border-primary-500 peer-checked:text-white transition-all flex items-center justify-center">
                      <Check size={12} strokeWidth={4} />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors leading-tight">
                    Add <span className="font-bold text-gray-900">$2.45</span> to cover transaction costs so 100% of my donation goes to the cause.
                  </span>
                </label>

                {/* Donate Button */}
                <button className="w-full py-4 bg-success-600 bg-teal-600 text-white rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Complete Donation
                </button>

                <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  Secure SSL Encryption
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

       {/* Scroll Indicator */}
       <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
