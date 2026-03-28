import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Ship, ShieldCheck, Globe, MapPin, ArrowRight, Menu, X, CheckCircle2, FileText, Briefcase, Building2, Phone, Mail, Linkedin, Leaf, Recycle, Target, Anchor } from 'lucide-react';
import { useState, useEffect } from 'react';
import logo from './assets/logo-transparent.png';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-accent)] selection:text-white overflow-x-hidden">
      <Navbar 
        onOpenQuote={() => setIsQuoteModalOpen(true)} 
        onOpenContact={() => setIsContactModalOpen(true)}
      />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Products />
        <About />
        <CTA onOpenQuote={() => setIsQuoteModalOpen(true)} />
      </main>
      <Footer />

      <AnimatePresence>
        {isQuoteModalOpen && (
          <QuoteModal onClose={() => setIsQuoteModalOpen(false)} />
        )}
        {isContactModalOpen && (
          <ContactModal onClose={() => setIsContactModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function Navbar({ onOpenQuote, onOpenContact }: { onOpenQuote: () => void, onOpenContact: () => void }) {
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
              href={item === 'Contact' ? '#' : `#${item.toLowerCase()}`}
              onClick={(e) => {
                if (item === 'Contact') {
                  e.preventDefault();
                  onOpenContact();
                }
              }}
              className="text-sm font-medium text-black/70 hover:text-black transition-colors"
            >
              {item}
            </a>
          ))}
          <button 
            onClick={onOpenQuote}
            className="text-sm font-medium px-5 py-2.5 rounded-full border border-black/20 hover:bg-black hover:text-white transition-all duration-300"
          >
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
              href={item === 'Contact' ? '#' : `#${item.toLowerCase()}`}
              className="text-lg font-medium text-black/80"
              onClick={(e) => {
                if (item === 'Contact') {
                  e.preventDefault();
                  onOpenContact();
                }
                setMobileMenuOpen(false);
              }}
            >
              {item}
            </a>
          ))}
          <button 
            onClick={() => {
              onOpenQuote();
              setMobileMenuOpen(false);
            }}
            className="mt-4 text-sm font-medium px-5 py-3 rounded-full border border-black bg-black text-white w-full"
          >
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
      icon: <Leaf size={32} strokeWidth={1.5} />,
      title: "Agricultural & Organic Produce",
      description: "Direct procurement of premium fruits, dry fruits, and organic staples from massive hubs like Mumbai's APMC market, ensuring farm-to-port freshness."
    },
    {
      icon: <Recycle size={32} strokeWidth={1.5} />,
      title: "Green Manufacturing & Textiles",
      description: "Sourcing eco-friendly packaging, biodegradable alternatives, and sustainable textiles through our extensively vetted network of Indian manufacturers."
    },
    {
      icon: <Target size={32} strokeWidth={1.5} />,
      title: "Bespoke Custom Procurement",
      description: "Have a specific eco-friendly product in mind? We conduct deep-dive research, background checks, and price negotiations to meet your exact volume needs."
    },
    {
      icon: <Anchor size={32} strokeWidth={1.5} />,
      title: "Strategic Port Logistics",
      description: "Leveraging our proximity to Nhava Sheva (JNPT)—India's largest container port—we guarantee rapid turnaround times and transparent, friction-free freight movement."
    }
  ];

  return (
    <section id="services" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Bespoke Sourcing. Sustainable Solutions.
          </h2>
          <p className="text-xl text-black/60 max-w-2xl font-medium leading-relaxed">
            We replace the typical friction of global trade with rigorous groundwork and transparent, demand-driven exporting.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 md:p-10 rounded-3xl bg-[var(--color-paper)] border border-black/5 hover:border-black/20 hover:shadow-xl transition-all duration-500"
            >
              <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-[var(--color-accent)] shadow-sm group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all duration-500">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{service.title}</h3>
              <p className="text-black/70 leading-relaxed font-medium text-lg">{service.description}</p>
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

function About() {
  return (
    <section id="about" className="py-32 bg-[var(--color-paper)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1] mb-8">
              Your Eyes & Ears in India.
            </h2>
            <div className="space-y-6 text-lg text-black/70 font-medium leading-relaxed">
              <p>
                Finding reliable, high-quality, eco-friendly products in a market as vast as India can be complex. Navi EXIM simplifies it.
              </p>
              <p>
                Operating out of Mumbai—India's bustling trade capital—we act as your dedicated B2B sourcing partner. We don't just sell from a fixed catalog; we listen to your exact requirements and hit the ground running to find the perfect sustainable match for your business.
              </p>
            </div>
            
            <div className="mt-12 p-8 bg-black/5 rounded-3xl border border-black/10">
              <h3 className="text-2xl font-bold tracking-tight mb-6">Company Credentials</h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-black/5">
                  <span className="text-black/60 font-medium">Company Name</span>
                  <span className="font-bold text-black">Navi EXIM</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-black/5">
                  <span className="text-black/60 font-medium">IEC Code</span>
                  <span className="font-bold text-black">CTUPG3828D</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-black/5">
                  <span className="text-black/60 font-medium">GST Registration No</span>
                  <span className="font-bold text-black">27CTUPG3828D1ZG</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3">
                  <span className="text-black/60 font-medium">UDYAMI REG. NUMBER</span>
                  <span className="font-bold text-black">UDYAMI-MH-18-0426826</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-3xl font-bold tracking-tight mb-4">Demand-Driven Exporting</h3>
              <p className="text-lg text-black/70 font-medium leading-relaxed">
                We specialize in fulfilling custom buyer requirements with a strict focus on products that are kind to the environment. If you need it, we can source it.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold tracking-tight mb-4">Why Partner With Us?</h3>
              <ul className="space-y-4 text-lg text-black/70 font-medium">
                <li className="flex gap-4">
                  <CheckCircle2 className="shrink-0 text-[var(--color-accent)] mt-1" size={24} />
                  <span><strong className="text-black">Deep-Dive Research:</strong> Our biggest strength is our ability to thoroughly investigate and vet suppliers. We do the heavy lifting of background checks, quality verification, and price negotiation so you don't have to.</span>
                </li>
                <li className="flex gap-4">
                  <CheckCircle2 className="shrink-0 text-[var(--color-accent)] mt-1" size={24} />
                  <span><strong className="text-black">Clear Communication:</strong> We believe in absolute transparency. From the initial inquiry to final delivery, you get clear, consistent updates without language or cultural barriers.</span>
                </li>
                <li className="flex gap-4">
                  <CheckCircle2 className="shrink-0 text-[var(--color-accent)] mt-1" size={24} />
                  <span><strong className="text-black">Strategic Logistics:</strong> Situated near Nhava Sheva (JNPT), India's largest container port, we ensure rapid turnaround times and efficient freight movement.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-black/10 shadow-sm">
              <h3 className="text-2xl font-bold tracking-tight mb-2">The Organization</h3>
              <div className="mt-6">
                <h4 className="text-xl font-bold text-black">Nalandeep Govande</h4>
                <p className="text-[var(--color-accent)] font-bold text-sm tracking-wider uppercase mb-4">Managing Director</p>
                <p className="text-black/70 font-medium leading-relaxed">
                  With over 5 years of corporate experience as a Business Analyst and an Engineering degree from Mumbai University, Nalandeep brings a highly analytical, data-driven approach to global sourcing. His expertise in deep research and strategic planning drives Navi EXIM's rigorous supplier vetting process.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTA({ onOpenQuote }: { onOpenQuote: () => void }) {
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
          <button 
            onClick={onOpenQuote}
            className="bg-[var(--color-accent)] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
          >
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

function QuoteModal({ onClose }: { onClose: () => void }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-black/5 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="text-2xl font-bold tracking-tight">Request a Quote</h3>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Quote request submitted successfully!'); onClose(); }}>
            <div>
              <label className="block text-sm font-bold text-black/70 mb-1">Name</label>
              <input type="text" required className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" placeholder="Your full name" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black/70 mb-1">Mobile No</label>
                <input type="tel" required className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div>
                <label className="block text-sm font-bold text-black/70 mb-1">Email</label>
                <input type="email" required className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-black/70 mb-1">Address</label>
              <textarea required rows={2} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none" placeholder="Your company address"></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-black/70 mb-1">Requirement</label>
              <textarea required rows={3} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none" placeholder="Please describe the products you are looking for..."></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-black/70 mb-1">Quantity</label>
              <input type="text" required className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" placeholder="e.g., 1000 pieces, 20 FT Container" />
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-black/80 transition-colors">
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-black/5 flex items-center justify-between bg-white">
          <h3 className="text-2xl font-bold tracking-tight">Contact Us</h3>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 flex flex-col gap-4">
          <a href="tel:+918692981240" className="flex items-center gap-4 p-4 rounded-xl border border-black/10 hover:border-black/30 hover:bg-black/5 transition-all group">
            <div className="bg-black/5 p-3 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-black/50 uppercase tracking-wider mb-1">Mobile No</p>
              <p className="font-medium text-lg text-black">+91 8692981240</p>
            </div>
          </a>

          <a href="mailto:naviimports2010@gmail.com" className="flex items-center gap-4 p-4 rounded-xl border border-black/10 hover:border-black/30 hover:bg-black/5 transition-all group">
            <div className="bg-black/5 p-3 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-black/50 uppercase tracking-wider mb-1">Email</p>
              <p className="font-medium text-lg text-black break-all">naviimports2010@gmail.com</p>
            </div>
          </a>

          <a href="https://www.linkedin.com/company/navi-exim" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-black/10 hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/5 transition-all group">
            <div className="bg-black/5 p-3 rounded-full group-hover:bg-[#0A66C2] group-hover:text-white transition-colors">
              <Linkedin size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-black/50 uppercase tracking-wider mb-1">LinkedIn</p>
              <p className="font-medium text-lg text-[#0A66C2]">Navi EXIM Profile</p>
            </div>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
