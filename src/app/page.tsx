import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Certificates from "@/components/Certificates";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import AuthPreview from "@/components/AuthPreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Certificates />
      <Services />
      <HowItWorks />
      <Testimonials />
      <CTABanner />
      <AuthPreview />
      <Footer />
    </>
  );
}
