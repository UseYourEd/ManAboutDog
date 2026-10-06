/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logo from './logo.png';
import adoptionPic from './Adoption.jpg';
import winstonAndFelix from './winston-and-felix.jpg';
import winstonAndMylo from './winston-and-mylo.jpg';
import winstonAndSully from './winston-and-sully.jpg';
import connyAndMaddie from './winston-conny-and-maddie.jpg';
import winstonAndI from './winston-and-i.jpg';
import { 
  Dog, 
  Home, 
  Footprints, 
  PawPrint,
  Clock, 
  Baby, 
  Trash2, 
  MapPin, 
  Mail, 
  Instagram, 
  Youtube,
  Camera,
  ShieldCheck,
  HeartPulse,
  Menu,
  X,
  ChevronRight,
  Send,
  Star,
  Quote,
  ExternalLink,
  Play
} from 'lucide-react';

const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/man_aboutdog/',
  instagramEmbed: 'https://www.instagram.com/man_aboutdog/embed',
  youtube: 'https://www.youtube.com/@Man_AboutDog',
};

type YouTubeVideo = {
  id: string;
  title: string;
  published: string;
  link: string;
  thumbnail: string;
};

const INITIAL_YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    id: '58Nqq3GYcPk',
    title: 'A beagle called Daisy just loves attention #dog #dogs #dogshorts',
    published: '2026-07-21T09:00:25+00:00',
    link: 'https://www.youtube.com/shorts/58Nqq3GYcPk',
    thumbnail: 'https://i.ytimg.com/vi/58Nqq3GYcPk/hqdefault.jpg',
  },
  {
    id: 'SH3Vc1j6UK0',
    title: 'Beagle cosies up to Bulldog x #dog #dogs #dogshorts',
    published: '2026-07-20T06:00:36+00:00',
    link: 'https://www.youtube.com/shorts/SH3Vc1j6UK0',
    thumbnail: 'https://i.ytimg.com/vi/SH3Vc1j6UK0/hqdefault.jpg',
  },
  {
    id: 'zcOMBmZCieI',
    title: 'cocker spaniel takes a bulldog x for a walk #dog #dogs #dogshorts',
    published: '2026-07-18T18:45:28+00:00',
    link: 'https://www.youtube.com/shorts/zcOMBmZCieI',
    thumbnail: 'https://i.ytimg.com/vi/zcOMBmZCieI/hqdefault.jpg',
  },
  {
    id: '1-Ph8y_-TWs',
    title: 'Beagle demands belly rubs - #dog #dogs #dogshorts',
    published: '2026-07-18T07:00:19+00:00',
    link: 'https://www.youtube.com/shorts/1-Ph8y_-TWs',
    thumbnail: 'https://i.ytimg.com/vi/1-Ph8y_-TWs/hqdefault.jpg',
  },
  {
    id: 'clGa5WpRbo8',
    title: 'Dinner time - feeding the #dogs',
    published: '2026-07-16T06:15:32+00:00',
    link: 'https://www.youtube.com/watch?v=clGa5WpRbo8',
    thumbnail: 'https://i.ytimg.com/vi/clGa5WpRbo8/hqdefault.jpg',
  },
];

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
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>(INITIAL_YOUTUBE_VIDEOS);
  const [activeVideoId, setActiveVideoId] = useState<string>(INITIAL_YOUTUBE_VIDEOS[0].id);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  useEffect(() => {
    fetch('./youtube-feed.php')
      .then((res) => {
        if (!res.ok) throw new Error('PHP feed unavailable');
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.videos) && data.videos.length > 0) {
          setYoutubeVideos(data.videos);
          setActiveVideoId(data.videos[0].id);
        }
      })
      .catch(() => {
        // Uses pre-populated latest videos from @Man_AboutDog when PHP is not running locally
      });
  }, []);

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
    <div className="relative min-h-screen bg-[#fcfaf7] font-['Montserrat'] text-slate-900 selection:bg-orange-100">
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
              <img src={logo} alt="ManAboutDog Logo" className="h-12 w-auto" />
              <span className="text-xl font-bold tracking-tight text-slate-900">
                ManAbout<span className="text-orange-500">Dog</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium hover:text-orange-500 transition-colors">Services</a>
              <a href="#about" className="text-sm font-medium hover:text-orange-500 transition-colors">About Us</a>
              <a href="#reviews" className="text-sm font-medium hover:text-orange-500 transition-colors">Reviews</a>
              <a href="#social" className="text-sm font-medium hover:text-orange-500 transition-colors">Socials</a>
              
              <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all"
                  title="Follow @man_aboutdog on Instagram"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                  title="Subscribe to @Man_AboutDog on YouTube"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
              </div>

              <a 
                href="#contact" 
                className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
              >
                Contact
              </a>
            </div>

            {/* Mobile Socials + Menu Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 hover:text-orange-500 transition-colors"
                title="Instagram"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 hover:text-red-600 transition-colors"
                title="YouTube"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <button 
                className="p-2 text-slate-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
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
                <a href="#social" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Socials</a>
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

      {/* Decorative Globals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {/* A trail of human and dog prints */}
        <div className="absolute top-[5%] left-[10%] opacity-[0.04] -rotate-12">
          <PawPrint size={100} />
        </div>
        <div className="absolute top-[12%] right-[15%] opacity-[0.04] rotate-45">
          <Footprints size={80} />
        </div>
        <div className="absolute top-[25%] left-[25%] opacity-[0.04] -rotate-45">
          <PawPrint size={140} />
        </div>
        <div className="absolute top-[38%] right-[20%] opacity-[0.04] rotate-12">
          <Footprints size={120} />
        </div>
        <div className="absolute top-[50%] left-[8%] opacity-[0.04] rotate-90 inline-block text-orange-950">
          <PawPrint size={100} />
        </div>
        <div className="absolute top-[62%] right-[12%] opacity-[0.04] -rotate-12">
          <PawPrint size={110} />
        </div>
        <div className="absolute top-[75%] left-[30%] opacity-[0.05] rotate-[160deg] text-slate-900">
          <Footprints size={100} />
        </div>
        <div className="absolute top-[88%] right-[25%] opacity-[0.04] rotate-45 text-slate-900">
          <PawPrint size={130} />
        </div>
        <div className="absolute top-[96%] left-[40%] opacity-[0.04] rotate-[-20deg]">
          <Footprints size={90} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-orange-100 text-orange-600 rounded-full">
                Serving Ireland; Belfast and Dublin based.
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-slate-900 leading-[1.1] mb-8">
                Belfast born and breed<br />
                Dublin trained.<br />
                <span className="text-3xl md:text-4xl lg:text-5xl italic text-orange-500 mt-4 block">Barking mad about both.</span>
              </h1>
              <p className="max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                Professional, dependable dog lover, escaped from the corporate world to bring you and your pet the best care.
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 text-slate-500 text-sm font-semibold">
                <a href="/Insurance%20Certificate.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span>Fully Insured</span>
                </a>
                <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></div>
                <a href="/1st%20aid%20Certificate.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span>Canine First Aid Level 2 certified</span>
                </a>
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
              className="relative mt-8 lg:mt-0 max-w-sm mx-auto sm:max-w-md lg:max-w-none w-full"
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
      <section id="services" className="py-24 bg-white relative z-10">
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

      {/* Peace of Mind Section */}
      <section className="py-24 bg-orange-500 text-white relative z-10 overflow-hidden shadow-2xl shadow-orange-500/20">
        {/* Decorative background paw */}
        <div className="absolute -right-20 -bottom-20 opacity-[0.05] rotate-45 pointer-events-none text-black">
          <PawPrint size={400} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-medium mb-4">Peace of Mind</h2>
            <div className="w-20 h-1 bg-orange-200 mx-auto rounded-full mb-6"></div>
            <p className="max-w-2xl mx-auto text-lg text-orange-50 mb-10 leading-relaxed font-medium">
              We treat your pets like our own. Official business means uncompromising safety and care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.a
              href="/Insurance%20Certificate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="block bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 text-center hover:bg-white/15 transition-all shadow-xl"
            >
              <div className="w-16 h-16 bg-white text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-orange-100 opacity-0 hover:opacity-100 transition-opacity"></div>
                <ShieldCheck className="w-8 h-8 relative z-10" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Fully Insured</h3>
              <p className="text-orange-50 leading-relaxed">
                Comprehensive insurance coverage for all our services, giving you absolute confidence when your best friend is in our care.
              </p>
            </motion.a>

            <motion.a
              href="/1st%20aid%20Certificate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="block bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 text-center hover:bg-white/15 transition-all shadow-xl"
            >
              <div className="w-16 h-16 bg-white text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-orange-100 opacity-0 hover:opacity-100 transition-opacity"></div>
                <HeartPulse className="w-8 h-8 relative z-10" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Canine First Aid Level 2 Certified</h3>
              <p className="text-orange-50 leading-relaxed">
                Professionally trained and certified in Canine First Aid Level 2. Always prepared to handle any situation with expertise.
              </p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-[#fcfaf7] relative z-10">
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
                  src={winstonAndI} 
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

      {/* Social Media Feed Section */}
      <section id="social" className="py-24 bg-[#fcfaf7] relative z-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-medium mb-4">Socials - see the fun we have</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-6"></div>
            <p className="max-w-2xl mx-auto text-slate-500 font-medium">
              Keep up with our latest adventures with Winston and the pack on Instagram and YouTube.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Instagram Feed Area */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col">
              <div className="flex items-center justify-between gap-4 mb-6">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold group-hover:text-orange-500 transition-colors">Instagram</h3>
                    <p className="text-xs text-slate-400 font-semibold">@man_aboutdog</p>
                  </div>
                </a>

                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-xs font-bold hover:bg-orange-500 hover:text-white transition-all"
                >
                  Follow Us
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex-grow rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 min-h-[480px]">
                <iframe
                  src={SOCIAL_LINKS.instagramEmbed}
                  title="ManAboutDog Instagram Feed"
                  className="w-full h-full min-h-[480px] border-0"
                  loading="lazy"
                  allowTransparency={true}
                />
              </div>
            </div>

            {/* YouTube Feed Area */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col">
              <div className="flex items-center justify-between gap-4 mb-6">
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <Youtube className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold group-hover:text-red-600 transition-colors">YouTube</h3>
                    <p className="text-xs text-slate-400 font-semibold">@Man_AboutDog</p>
                  </div>
                </a>

                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-xs font-bold hover:bg-red-600 hover:text-white transition-all"
                >
                  Subscribe
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Active Video Player */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md mb-5">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoId}`}
                  title="ManAboutDog Latest YouTube Video"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Recent Channel Uploads Selector */}
              <div className="flex-grow flex flex-col">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-left">
                  Latest Uploads
                </p>
                <div className="space-y-2.5 overflow-y-auto max-h-[210px] pr-1">
                  {youtubeVideos.slice(0, 5).map((video) => {
                    const isSelected = video.id === activeVideoId;
                    return (
                      <button
                        key={video.id}
                        type="button"
                        onClick={() => setActiveVideoId(video.id)}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all border ${
                          isSelected
                            ? 'bg-orange-50/80 border-orange-200 text-slate-900 shadow-sm'
                            : 'bg-slate-50/70 border-transparent hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="relative w-20 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                            <Play className={`w-4 h-4 ${isSelected ? 'text-orange-400 fill-orange-400' : 'text-white fill-white'}`} />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold line-clamp-2 leading-snug">
                            {video.title}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
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
              <img src={logo} alt="ManAboutDog Logo" className="h-10 w-auto" />
              <span className="text-lg font-bold tracking-tight">
                ManAbout<span className="text-orange-500">Dog</span>
              </span>
            </div>

            <div className="text-slate-500 text-sm font-medium">
              © 2026 ManAboutDog. Proudly serving Belfast & Dublin.
            </div>

            <div className="flex items-center gap-6">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-orange-500 transition-colors"
                title="Follow @man_aboutdog on Instagram"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-red-600 transition-colors"
                title="Subscribe to @Man_AboutDog on YouTube"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

