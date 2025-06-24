import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import ContentSlider from '../components/ContentSlider';

const featuredContent = {
  title: "Stranger Things",
  description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
  backdrop: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=2831&auto=format&fit=crop"
};

const trendingMovies = [
  {
    id: "1",
    title: "Inception",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&auto=format",
    rating: 8.8,
    year: 2010
  },
  {
    id: "2",
    title: "The Dark Knight",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&auto=format",
    rating: 9.0,
    year: 2008
  },
  // Add more movies...
];

const popularSeries = [
  {
    id: "3",
    title: "Breaking Bad",
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&auto=format",
    rating: 9.5,
    year: 2008
  },
  {
    id: "4",
    title: "Game of Thrones",
    poster: "https://images.unsplash.com/photo-1599321955726-e48858a76f0d?w=500&auto=format",
    rating: 9.3,
    year: 2011
  },
  // Add more series...
];

function Home() {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[80vh] flex items-center"
      >
        <div className="absolute inset-0">
          <img
            src={featuredContent.backdrop}
            alt={featuredContent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl font-bold mb-4">{featuredContent.title}</h1>
            <p className="text-lg mb-8">{featuredContent.description}</p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-8 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                <Play className="w-5 h-5" /> Play Now
              </button>
              <button className="flex items-center gap-2 px-8 py-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                <Info className="w-5 h-5" /> More Info
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto">
        <ContentSlider title="Trending Movies" items={trendingMovies} />
        <ContentSlider title="Popular Series" items={popularSeries} />
      </div>
    </div>
  );
}

export default Home;