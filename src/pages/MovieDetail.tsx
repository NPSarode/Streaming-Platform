import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Star, Clock, Calendar, X } from 'lucide-react';
import { useGetMovieById } from '../apis/movieDetails';
import { useState } from 'react';
import ReactPlayer from 'react-player';

function MovieDetail() {
  const { id } = useParams();

  const { data: movie } = useGetMovieById(id)

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
            alt={movie?.title}
            className="w-full h-full object-fill"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl font-bold mb-4">{movie?.original_title}</h1>
              <div className="flex items-center gap-6 text-sm mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  <span>{movie?.popularity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{movie?.runtime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{movie?.release_date}</span>
                </div>
              </div>
              <button onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-2 px-8 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                <Play className="w-5 h-5" fill="currentColor"  /> Play Now
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {isPlaying && (
        <VideoPlayer videoId={id} onClose={() => setIsPlaying(false)}/>
        // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        //   <motion.div
        //     initial={{ scale: 0.9, opacity: 0 }}
        //     animate={{ scale: 1, opacity: 1 }}
        //     className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
        //   >
        //     <button
        //       className="absolute top-4 right-4 text-white hover:text-red-600"
        //       onClick={() => setIsPlaying(false)}
        //     >
        //       <X className="w-6 h-6" />
        //     </button>
        //     <ReactPlayer
        //       url={"https://www.youtube.com/watch?v=8hP9D6kZseM"}
        //       controls
        //       playing
        //       width="100%"
        //       height="100%"
        //     />
        //   </motion.div>
        // </div>
      )}

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2"
          >
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-300 mb-6">{movie?.overview}</p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Director</h3>
                <p className="text-gray-300">{movie?.director}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Genre</h3>
                <div className="flex flex-wrap gap-2">
                  {movie?.genres.map((genre:any, idx:number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <div className="space-y-4">
              {/* {movieData?.cast?.map((actor:any) => (
                <div
                  key={actor}
                  className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {actor}
                </div>
              ))} */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;

function VideoPlayer({ videoId, onClose }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white hover:text-red-600"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Embedded Video */}
        <iframe
          src={`https://embed.su/embed/movie/${videoId}`}
          title={`name_${videoId}`}
          width="100%"
          height="100%"
          allow="autoplay; fullscreen"
          className="rounded-lg min-h-[70vh]"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}