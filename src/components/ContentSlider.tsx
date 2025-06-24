import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

interface Content {
  id: string;
  title: string;
  poster: string;
  rating: number;
  year: number;
}

interface ContentSliderProps {
  title: string;
  items: Content[];
}

function ContentSlider({ title, items }: ContentSliderProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      
      sliderRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth',
      });
      
      setScrollPosition(scrollTo);
    }
  };

  return (
    <div className="relative py-4">
      <h2 className="text-2xl font-bold mb-4 px-4">{title}</h2>
      
      <div className="group relative">
        <motion.div
          ref={sliderRef}
          className="flex overflow-x-hidden scroll-smooth gap-4 px-4"
        >
          {items.map((item) => (
            <div key={item.id} className="flex-none w-[250px]">
              <MovieCard {...item} />
            </div>
          ))}
        </motion.div>

        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
          disabled={scrollPosition <= 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default ContentSlider;