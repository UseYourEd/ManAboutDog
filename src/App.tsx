/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logo from './logo.png';
import adoptionPic from './Adoption.jpg';
import winstonAndFelix from './winston-and-felix.jpg';
import winstonAndMylo from './winston-and-mylo.jpg';
import winstonAndSully from './winston-and-sully.jpg';
import connyAndMaddie from './winston-conny-and-maddie.jpg';
import { 
  Dog, 
  Home, 
  Footprints, 
  Clock, 
  Baby, 
  Trash2, 
  MapPin, 
  Mail, 
  Instagram, 
  Youtube,
  Camera,
  ShieldCheck,
  Menu,
  X,
  ChevronRight,
  Send,
  Star,
  Quote
} from 'lucide-react';

// --- Types ---
type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const SERVICES: Service[] = [
  {
    id: 'dog-sitting',
    title: 'Dog Sitting',
    description: 'At our house. A home away from home for your furry friend.',
    icon: <Dog className="w-6 h-6" />,
  },
  {
    id: 'house-sitting',
    title: 'House Sitting',
    description: 'At your house. We keep your pets comfortable in their own environment.',
    icon: <Home className="w-6 h-6" />,
  },
  {
    id: 'dog-walking',
    title: 'Dog Walking',
    description: 'Daily adventures to keep your dog healthy and happy.',
    icon: <Footprints className="w-6 h-6" />,
  },
  {
    id: 'drop-in',
    title: 'Drop-in Visits',
    description: 'All animals welcome! Quick check-ins for feeding and play.',
    icon: <Clock className="w-6 h-6" />,
  },
  {
    id: 'puppy-care',
    title: 'Puppy Care',
    description: 'Specialized attention for the newest members of your family.',
    icon: <Baby className="w-6 h-6" />,
  },
  {
    id: 'poop-scooper',
    title: 'Poop Scooper Service',
    description: 'Let us handle the dirty work. Clean yards, happy owners.',
    icon: <Trash2 className="w-6 h-6" />,
  },
  {
    id: 'photography',
    title: 'Pet Photography',
    description: 'Capture the perfect moment. In your house or outdoors.',
    icon: <Camera className="w-6 h-6" />,
  },
];

type Review = {
  id: number;
  author: string;
  date: string;
  service: string;
  rating: number;
  content: string;
  image?: string;
};

const REVIEWS: Review[] = [
  {
    id: 1,
    author: 'mikebuckland4',
    date: 'Apr 14, 2026',
    service: 'Boarding',
    rating: 5,
    content: 'Very experienced and great with dogs. Was able and willing to look after Nala even after she ended up coming into season days before the trip, which goes above and beyond. Nala looked like she had the best time too. Couldn’t recommend higher!'
  },
  {
    id: 2,
    author: 'Angel L.',
    date: 'Mar 16, 2026',
    service: 'Dog Walking',
    rating: 5,
    content: 'Eddie was great. Teddy got sick and needed to go to the vet (I don\'t have a car). We contacted Eddie on the same day and he came, gave us a lift, stayed on the phone until we were ready to go back and took us back home. He was super helpful and really saved us today.'
  },
  {
    id: 3,
    author: 'Michael D.',
    date: 'Feb 17, 2026',
    service: 'Boarding',
    rating: 5,
    content: 'Highly recommend, Eddie was great and kept us updated with photos and videos. His dog Winston was also great company for our pup. Would definitely book with Eddie again.'
  },
  {
    id: 4,
    author: 'Kelly R.',
    date: 'Aug 19, 2025',
    service: 'Boarding',
    rating: 5,
    content: 'Really friendly guy loved our babies as his own lots of reassurance the whole time they had the best time staying over thank you so much highly recommended and will definitely use again in the future 🙂'
  },
  {
    id: 5,
    author: 'Stuart M.',
    date: 'Jul 06, 2025',
    service: 'Boarding',
    rating: 5,
    content: 'Very friendly guy (and dog lol) Great communication during before and during dog sitting. Will definitely use again'
  },
  {
    id: 6,
    author: 'Janice M.',
    date: 'May 30, 2025',
    service: 'Boarding',
    rating: 5,
    content: 'Thank you Eddie and Winston for taking such good care of Walter. The daily updates were very reassuring, seeing the fun he was having with his new friends and knowing that he was settled and happy. Highly recommended'
  },
  {
    id: 7,
    author: 'Elaine M.',
    date: 'Apr 26, 2025',
    service: 'Boarding',
    rating: 5,
    content: 'Lovely guy took care of my pup like his own and sent lots of updates and pics. I’d definitely use Eddie again. Thank you!'
  },
  {
    id: 8,
    author: 'Deborah H.',
    date: 'Aug 02, 2024',
    service: 'Boarding',
    rating: 5,
    content: 'Edward was amazing with my German Shepard Felix for the week I was on holidays, treated him so well with lovely walks and attention and his fog Winston and felix made such good friends too! Definitely recommend if you want a home from home for your dog!'
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      const response = await fetch('./contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', service: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] font-['Montserrat'] text-slate-900 selection:bg-orange-100">
      {/* Google Fonts Import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
          
          .font-serif {
            font-family: 'Cormorant Garamond', serif;
          }
        `}
      </style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Man About Dog Logo" className="h-12 w-auto" />
              <span className="text-xl font-bold tracking-tight uppercase text-slate-900">
                Man About <span className="text-orange-500">Dog</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium hover:text-orange-500 transition-colors">Services</a>
              <a href="#about" className="text-sm font-medium hover:text-orange-500 transition-colors">About Us</a>
              <a href="#reviews" className="text-sm font-medium hover:text-orange-500 transition-colors">Reviews</a>
              <a 
                href="#contact" 
                className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
              >
                Contact
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <a href="#services" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Services</a>
                <a href="#about" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>About Us</a>
                <a href="#reviews" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Reviews</a>
                <a 
                  href="#contact" 
                  className="block w-full text-center bg-slate-900 text-white py-3 rounded-xl font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Decorative Paw Prints */}
        <div className="absolute top-40 left-10 opacity-5 -rotate-12 hidden lg:block">
          <Footprints size={120} />
        </div>
        <div className="absolute bottom-20 left-1/2 opacity-5 rotate-12 hidden lg:block">
          <Footprints size={160} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-orange-100 text-orange-600 rounded-full">
                Serving Belfast & Dublin
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-slate-900 leading-[1.1] mb-8">
                Belfast's Most <br />
                <span className="italic text-orange-500">Trusted</span> Companion.
              </h1>
              <p className="max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                Professional, trustworthy, and warm pet care services tailored for the modern dog owner. Giving your best friend the care they deserve.
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 text-slate-500 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span>Fully Insured</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span>Pet First Aid (Coming 2026)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a 
                  href="#contact" 
                  className="w-full sm:w-auto px-8 py-4 bg-orange-500 text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-200 flex items-center justify-center gap-2 group"
                >
                  Book Now
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#services" 
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-all"
                >
                  Our Services
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative z-10 border-8 border-white">
                <img 
                  src={adoptionPic} 
                  alt="Dog Adoption" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-orange-500 rounded-[2rem] translate-x-6 translate-y-6 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-medium mb-4">Tailored Care for Every Need</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 bg-[#fcfaf7] rounded-3xl border border-transparent hover:border-orange-200 hover:bg-white hover:shadow-2xl hover:shadow-orange-100 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-orange-500 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-[#fcfaf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                <img 
                  src={connyAndMaddie} 
                  alt="Eddie and Winston" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-orange-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white">
                  <Dog className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Team</p>
                  <p className="text-lg font-bold">Eddie & Winston</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-medium mb-8">About Us</h2>
              
              <div className="space-y-10">
                <div className="relative pl-8 border-l-2 border-orange-500">
                  <span className="absolute -left-3 top-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</span>
                  <h3 className="text-2xl font-bold mb-3">2 Legs: Eddie Hamilton</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    After being made redundant from my corporate job (a blessing in disguise!!), I started working with dogs via Rover to make ends meet. After two years and gaining many regular customers, it's time to push my own brand and take the plunge with my own insurance.
                  </p>
                </div>

                <div className="relative pl-8 border-l-2 border-slate-900">
                  <span className="absolute -left-3 top-0 w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center text-white text-xs font-bold">4</span>
                  <h3 className="text-2xl font-bold mb-3">4 Legs: Winston</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Winston is a Bulldog cross adopted from Dog's Trust in Ballymena. DoB 07/03/24. He loves welcoming friends old and new to stay.
                  </p>
                </div>
              </div>

              {/* Mini Gallery */}
              <div className="grid grid-cols-3 gap-4 mt-12">
                {[winstonAndFelix, winstonAndMylo, winstonAndSully].map((img, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer">
                    <img src={img} alt={`Dog friend ${i+1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-medium mb-4">Customer Reviews</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 font-medium">What our happy pack members say</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REVIEWS.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#fcfaf7] p-8 rounded-[2rem] border border-slate-100 flex flex-col h-full hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < review.rating ? 'text-orange-500 fill-orange-500' : 'text-slate-300'}`} 
                      />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-orange-100" />
                </div>
                
                <p className="text-slate-700 leading-relaxed mb-6 italic flex-grow">
                  "{review.content}"
                </p>
                
                <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{review.author}</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{review.service} • {review.date}</p>
                  </div>
                  <div className="text-orange-500 font-bold text-sm">
                    5 Woofs
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract paw print background element */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif font-medium mb-6">Schedule a <br /><span className="text-orange-500">Meet and Greet</span>.</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Humans to meet. And dogs to meet if yours will be staying or walking with Winston and I.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-orange-500">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 uppercase tracking-widest font-bold">Location</p>
                    <p className="text-lg">Belfast & Dublin</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-orange-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 uppercase tracking-widest font-bold">Email</p>
                    <p className="text-lg">hello@manaboutdog.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 md:p-12 text-slate-900 shadow-2xl">
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Wag-tastic!</h3>
                  <p className="text-slate-600">We've received your message and will be in touch soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formStatus === 'error' && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                      There was an error sending your message. Please try again or email us directly.
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Email</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Service Interested In</label>
                    <select 
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                    >
                      <option value="">Select a service</option>
                      {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                      <option value="other">Other / Multiple</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Message</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your dog..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    disabled={formStatus === 'submitting'}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Man About Dog Logo" className="h-10 w-auto" />
              <span className="text-lg font-bold tracking-tight uppercase">
                Man About <span className="text-orange-500">Dog</span>
              </span>
            </div>

            <div className="text-slate-500 text-sm font-medium">
              © 2026 Man About Dog. Proudly serving Belfast & Dublin.
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors" title="Instagram"><Instagram size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors" title="YouTube"><Youtube size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors" title="TikTok">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

