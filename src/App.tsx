import { motion, useScroll, useTransform } from 'motion/react';
import { Ship, ShieldCheck, Globe, MapPin, ArrowRight, Menu, X, CheckCircle2, FileText, Briefcase, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import logo from './assets/logo-transparent.png';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-accent)] selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Products />
        <ValueProp />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-black/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src={logo} 
            alt="Navi EXIM Logo" 
            className="h-20 md:h-28 w-auto object-contain mix-blend-multiply scale-125 origin-left"
          />
          <span className="font-bold text-xl tracking-tight uppercase hidden">Navi EXIM</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['Home', 'About', 'Services', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-black/70 hover:text-black transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="text-sm font-medium px-5 py-2.5 rounded-full border border-black/20 hover:bg-black hover:text-white transition-all duration-300">
            Request Quote
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-black/5 p-6 flex flex-col gap-4 shadow-lg md:hidden">
          {['Home', 'About', 'Services', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-lg font-medium text-black/80"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="mt-4 text-sm font-medium px-5 py-3 rounded-full border border-black bg-black text-white w-full">
            Request Quote
          </button>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-[88px] font-bold tracking-tighter leading-[1.05] mb-6"
          >
            Global Trade.<br />From Mumbai.<br />Simplified.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-black/60 font-medium max-w-2xl mb-10 leading-relaxed"
          >
            Navi EXIM is your compliant, transparent partner for seamless export-import operations. Connecting Indian quality with international demand.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="bg-black text-white px-8 py-4 rounded-full font-medium text-base hover:bg-black/80 transition-colors flex items-center gap-2 group">
              Explore Our Solutions
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Hero Image Background */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute top-0 right-0 w-full md:w-[60%] h-full -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-paper)] via-[var(--color-paper)]/80 to-transparent z-10 md:block hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-paper)] via-transparent to-transparent z-10 md:hidden block" />
        <img 
          src="https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?q=80&w=2070&auto=format&fit=crop" 
          alt="Mumbai Port at Dawn" 
          className="w-full h-full object-cover object-right grayscale-[0.8] contrast-125 opacity-40 md:opacity-100"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="border-y border-black/5 bg-white py-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs font-bold tracking-widest uppercase text-black/50">
          Government of India Recognized Exporter
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 grayscale">
          <div className="flex items-center gap-2 font-bold text-sm tracking-tight"><FileText size={18} /> IEC</div>
          <div className="flex items-center gap-2 font-bold text-sm tracking-tight"><Briefcase size={18} /> GST</div>
          <div className="flex items-center gap-2 font-bold text-sm tracking-tight"><Building2 size={18} /> UDYAMI</div>
          <div className="flex items-center gap-2 font-bold text-sm tracking-tight"><Globe size={18} /> FIEO</div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: <Ship size={32} strokeWidth={1.5} />,
      title: "Seamless Export",
      description: "Full-stack logistics management from factory floor to international port."
    },
    {
      icon: <ShieldCheck size={32} strokeWidth={1.5} />,
      title: "Regulatory Compliance",
      description: "Expert handling of documentation, custom clearance, and trade regulations."
    },
    {
      icon: <Globe size={32} strokeWidth={1.5} />,
      title: "Global Sourcing",
      description: "Connecting you with verified Indian manufacturers for textiles, agro-commodities, and more."
    }
  ];

  return (
    <section id="services" className="py-32 bg-[var(--color-paper)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-20"
        >
          End-to-End Export Solutions.
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <div className="mb-6 text-black">{service.icon}</div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-black/60 leading-relaxed font-medium">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Products() {
  const products = [
    {
      title: "Premium Textiles",
      image: "https://images.unsplash.com/photo-1605289355680-75fb41239154?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Eco-Friendly Disposables",
      image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Agro-Commodities",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Engineering Goods",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-20"
        >
          Sourcing Indian Excellence.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-[4/3] md:aspect-square overflow-hidden bg-black/5 cursor-pointer"
            >
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-white text-2xl font-bold tracking-tight mb-2">{product.title}</h3>
                <div className="overflow-hidden">
                  <p className="text-white/80 font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2">
                    View Details <ArrowRight size={16} />
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueProp() {
  return (
    <section id="about" className="py-32 bg-[var(--color-paper)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1]">
              Your Gateway to India's Gateway.
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl text-black/70 leading-relaxed font-medium">
              Located in Mumbai, India's primary trade hub, Navi EXIM leverages proximity to Jawaharlal Nehru Port (JNPT) to ensure the fastest transit times and cost-efficient shipping logistics for our international partners.
            </p>
            <div className="mt-8 flex items-center gap-4 text-black font-bold">
              <MapPin size={24} className="text-[var(--color-accent)]" />
              <span>Mumbai, Maharashtra, India</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-32 bg-[#111111] text-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
        >
          Ready to Streamline Your Supply Chain?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-white/60 font-medium mb-12 max-w-2xl mx-auto"
        >
          Let's discuss how Navi EXIM can bridge your business to Indian markets.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button className="bg-[var(--color-accent)] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-600 transition-colors inline-flex items-center gap-2">
            Get a Free Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <img 
              src={logo} 
              alt="Navi EXIM Logo" 
              className="h-24 md:h-32 w-auto object-contain mb-6 mix-blend-multiply scale-125 origin-left"
            />
            <span className="font-bold text-2xl tracking-tight uppercase mb-6 hidden">Navi EXIM</span>
            <p className="text-black/60 font-medium max-w-sm mb-6">
              Your compliant, transparent partner for seamless export-import operations from India to the world.
            </p>
            <div className="flex flex-col gap-2 text-sm font-bold text-black/60">
              <div className="flex items-center gap-2"><MapPin size={16} /> Mumbai, Maharashtra, India</div>
              <div className="flex items-center gap-2"><span>Mob:</span> <a href="tel:+918692981240" className="hover:text-black transition-colors">+91 8692981240</a></div>
              <div className="flex items-center gap-2"><span>Email:</span> <a href="mailto:naviimports2010@gmail.com" className="hover:text-black transition-colors">naviimports2010@gmail.com</a></div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-black/40">Company</h4>
            <ul className="space-y-4 font-medium text-black/70">
              <li><a href="#" className="hover:text-black transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Products</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-black/40">Legal</h4>
            <ul className="space-y-4 font-medium text-black/70">
              <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-black/40">
          <p>Copyright © {new Date().getFullYear()} Navi EXIM. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span>IEC Code: CTUPG3828D</span>
            <span>GSTIN: 27CTUPG3828D1ZG</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
