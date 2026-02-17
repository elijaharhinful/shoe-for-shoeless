import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Impact from '@/components/Impact';
import DonationCards from '@/components/DonationCards';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Mission />
      <Impact />
      <DonationCards />
      <Footer />
    </div>
  );
}
