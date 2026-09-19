import HeroSection from '../components/HeroSection';
import CatalogFeatureSection from '../components/CatalogFeatureSection';
import TrustStrip from '../components/TrustStrip';
import FeaturesSection from '../components/FeaturesSection';
import ShowcaseSection from '../components/ShowcaseSection';
import PricingSection from '../components/PricingSection';
import PromoSection from '../components/PromoSection';
import BookingSection from '../components/BookingSection';
import TrackingSection from '../components/TrackingSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FaqSection from '../components/FaqSection';
import CtaSection from '../components/CtaSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CatalogFeatureSection />
      <TrustStrip />
      <FeaturesSection />
      <ShowcaseSection />
      <PricingSection />
      <PromoSection />
      <TestimonialsSection />
      <FaqSection />
      <BookingSection />
      <TrackingSection />
      <CtaSection />
    </>
  );
}