import React, { useState, useEffect } from 'react';
import { Star, Book, Users, TrendingUp, ChevronRight, Play, Quote, Heart, MessageCircle, Share2 } from 'lucide-react';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      text: "BookVerse transformed how I discover new reads. The community insights are incredible!",
      author: "Sarah Chen",
      role: "Avid Reader & Book Blogger",
      avatar: "SC"
    },
    {
      text: "Finally, a platform where thoughtful book discussions thrive. Love the recommendation engine!",
      author: "Marcus Rivera",
      role: "Literature Professor",
      avatar: "MR"
    },
    {
      text: "The review quality here is outstanding. I've found my next 20 favorite books through BookVerse.",
      author: "Elena Kowalski",
      role: "Book Club Organizer",
      avatar: "EK"
    }
  ];

  const featuredBooks = [
    { title: "The Midnight Library", author: "Matt Haig", rating: 4.8, reviews: 2847 },
    { title: "Klara and the Sun", author: "Kazuo Ishiguro", rating: 4.6, reviews: 1923 },
    { title: "Project Hail Mary", author: "Andy Weir", rating: 4.9, reviews: 3156 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Navigation */}


      {/* Hero Section */}
      <section className={`relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              Where
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent"> Stories</span>
              <br />Meet Souls
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
              Join a vibrant community of book lovers. Discover your next favorite read through intelligent recommendations and meaningful conversations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center">
                Start Your Journey
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group px-8 py-4 border-2 border-purple-400 rounded-full font-semibold hover:bg-purple-400/10 transition-all duration-300 flex items-center justify-center">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>
            <div className="flex items-center space-x-8 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">150K+</div>
                <div className="text-sm text-gray-400">Active Readers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">2M+</div>
                <div className="text-sm text-gray-400">Book Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">50K+</div>
                <div className="text-sm text-gray-400">Books Cataloged</div>
              </div>
            </div>
          </div>
          
          {/* Interactive Book Cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {featuredBooks.map((book, index) => (
                <div
                  key={index}
                  className={`p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:scale-105 transition-all duration-500 hover:bg-white/20 ${
                    index === 1 ? 'transform translate-y-8' : ''
                  }`}
                  style={{animationDelay: `${index * 200}ms`}}
                >
                  <div className="w-16 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-4 flex items-center justify-center">
                    <Book className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{book.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{book.author}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{book.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">{book.reviews.toLocaleString()} reviews</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center animate-pulse">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            Why Readers Choose
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> BookVerse</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the future of book discovery with AI-powered recommendations and a passionate community of literary enthusiasts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Smart Recommendations</h3>
            <p className="text-gray-300 leading-relaxed">
              Our AI analyzes your reading history, preferences, and community interactions to suggest books you'll absolutely love. Discover hidden gems tailored just for you.
            </p>
          </div>

          <div className="group p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Vibrant Community</h3>
            <p className="text-gray-300 leading-relaxed">
              Connect with fellow bibliophiles, join book clubs, participate in reading challenges, and engage in meaningful discussions about the stories that move us.
            </p>
          </div>

          <div className="group p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Quality Reviews</h3>
            <p className="text-gray-300 leading-relaxed">
              Read in-depth, thoughtful reviews from passionate readers. Our curation system ensures you get insights that matter, not just star ratings.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Loved by Readers Worldwide</h2>
        </div>
        
        <div className="relative h-64 overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ${
                index === currentTestimonial
                  ? 'opacity-100 translate-x-0'
                  : index < currentTestimonial
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="text-center">
                <Quote className="w-12 h-12 text-purple-400 mx-auto mb-6" />
                <blockquote className="text-2xl font-light mb-8 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? 'bg-purple-400 w-8' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              4.9★
            </div>
            <div className="text-gray-300">Average Rating</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              98%
            </div>
            <div className="text-gray-300">Recommendation Accuracy</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-gray-300">Active Community</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
              1M+
            </div>
            <div className="text-gray-300">Books Database</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="p-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-3xl border border-white/20">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Find Your Next
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Great Read?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of passionate readers who've already discovered their new favorite books through BookVerse. Your literary adventure starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-bold text-lg hover:scale-110 transition-all duration-300 flex items-center">
              Get Started Free
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <div className="flex items-center space-x-2 text-gray-400">
              <span className="text-sm">Free forever • No credit card required</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;