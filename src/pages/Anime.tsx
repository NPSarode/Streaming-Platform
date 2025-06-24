import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import MovieCard from '../components/MovieCard';

// In a real app, fetch this data from an API
const animeData = [
  {
    id: "a1",
    title: "Attack on Titan",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format",
    rating: 9.0,
    year: 2013
  },
  {
    id: "a2",
    title: "Death Note",
    poster: "https://images.unsplash.com/photo-1612036782180-6f0822045d23?w=500&auto=format",
    rating: 9.0,
    year: 2006
  },
  {
    id: "a3",
    title: "One Punch Man",
    poster: "https://images.unsplash.com/photo-1560972550-aba3456b5564?w=500&auto=format",
    rating: 8.8,
    year: 2015
  },
  {
    id: "a4",
    title: "My Hero Academia",
    poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format",
    rating: 8.4,
    year: 2016
  }
];

const genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Sci-Fi", "Slice of Life"];

function Anime() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const filteredAnime = animeData.filter(anime => 
    anime.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold"
          >
            Anime
          </motion.h1>

          {/* Search and Filter */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-64"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none cursor-pointer w-full sm:w-48"
              >
                <option value="All">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>

        {/* Anime Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredAnime.map((anime, index) => (
            <motion.div
              key={anime.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MovieCard {...anime} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredAnime.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-gray-400">No anime found matching your search.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Anime;