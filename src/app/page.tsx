import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MomoBand from '@/components/sections/MomoBand';
import Problem from '@/components/sections/Problem';
import BigIdea from '@/components/sections/BigIdea';
import Marquee from '@/components/sections/Marquee';
import Impact from '@/components/sections/Impact';
import Sdgs from '@/components/sections/Sdgs';
import Film from '@/components/sections/Film';
import Inspiration from '@/components/sections/Inspiration';
import Founder from '@/components/sections/Founder';
import Gallery from '@/components/sections/Gallery';
import GetInvolved from '@/components/sections/GetInvolved';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MomoBand />
        <Problem />
        <BigIdea />
        <Marquee />
        <Impact />
        <Sdgs />
        <Film />
        <Inspiration />
        <Founder />
        <Gallery />
        <GetInvolved />
      </main>
      <Footer />
    </>
  );
}
