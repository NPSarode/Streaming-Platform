import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SeriesCardProps {
  id: number;
  title: string;
  poster_path: string;
  popularity: number;
  release_date: number;
}

function SeriesCard({ id, title, release_date, popularity, poster_path }: SeriesCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="relative group"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        className="w-full h-[300px] object-bottom rounded-lg"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
        <div className="absolute bottom-0 p-4 w-full">
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <div className="flex items-center justify-between text-sm">
            <span>{release_date}</span>
            <span className="text-yellow-400">★ {popularity}</span>
          </div>
          <div className="flex gap-2 mt-3">
            <Link
              to={`/watch-series/${id}`}
              className="flex-1 bg-red-600 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
            >
              <Play className="w-4 h-4" /> Play
            </Link>
            <button className="p-2 bg-white/20 rounded-md hover:bg-white/30 transition-colors">
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SeriesCard;