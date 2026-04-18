import React, { useState, useEffect } from 'react';
import { RESUME_DATA } from '../constants';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = RESUME_DATA.testimonials || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-indigo-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">What Leaders Say</h2>
          <p className="text-slate-500">Feedback from executives and partners I've worked with.</p>
        </div>

        <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-indigo-100">
          <Quote className="absolute top-8 left-8 text-indigo-100 w-16 h-16 -z-0" />
          
          <div className="relative z-10 min-h-[200px] flex flex-col justify-center">
            <p className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed mb-8 text-center italic">
              "{testimonials[currentIndex].quote}"
            </p>
            
            <div className="flex items-center justify-center gap-4">
              {testimonials[currentIndex].imageUrl ? (
                <img 
                  src={testimonials[currentIndex].imageUrl} 
                  alt={testimonials[currentIndex].name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-indigo-100"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
              )}
              <div className="text-left">
                <div className="font-bold text-slate-900">{testimonials[currentIndex].name}</div>
                <div className="text-sm text-indigo-600 font-medium">
                  {testimonials[currentIndex].title}, {testimonials[currentIndex].company}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-indigo-600 w-8' : 'bg-indigo-200 hover:bg-indigo-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 transition-all z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 transition-all z-20"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
