import Hero from "@/components/home/Hero";
import BlankCanvas from "@/components/home/BlankCanvas";
import Stats from "@/components/home/Stats";
import EventShowcase from "@/components/home/EventShowcase";
import Included from "@/components/home/Included";
import Flexibility from "@/components/home/Flexibility";
import Location from "@/components/home/Location";
import ClosingCTA from "@/components/home/ClosingCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <BlankCanvas />
      <Stats />
      <EventShowcase />
      <Included />
      <Flexibility />
      <Location />
      <ClosingCTA />
    </main>
  );
}
