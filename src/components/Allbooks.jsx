import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Clock, Users, Heart, BookOpen, ChevronDown, X } from 'lucide-react';

const BookBrowser = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Sample book data
  const bookData = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      rating: 4.8,
      reviewCount: 45623,
      genre: "Fiction",
      pages: 400,
      publishYear: 2017,
      description: "Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself. Why her? Why now?",
      coverColor: "from-pink-400 to-rose-500",
      tags: ["Romance", "Historical Fiction", "LGBTQ+"],
      topReviews: [
        { user: "Sarah M.", rating: 5, text: "Absolutely captivating! One of the best books I've read this year.", date: "2024-11-15" },
        { user: "Mike R.", rating: 5, text: "The character development is incredible. Evelyn Hugo is unforgettable.", date: "2024-10-28" },
        { user: "Emma L.", rating: 4, text: "Great storytelling, though the ending felt a bit rushed.", date: "2024-12-03" }
      ]
    },
    {
      id: 2,
      title: "Project Hail Mary",
      author: "Andy Weir",
      rating: 4.9,
      reviewCount: 38912,
      genre: "Science Fiction",
      pages: 496,
      publishYear: 2021,
      description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it.",
      coverColor: "from-blue-400 to-cyan-500",
      tags: ["Space", "Hard Sci-Fi", "Thriller"],
      topReviews: [
        { user: "Alex K.", rating: 5, text: "Mind-blowing science fiction! Weir has outdone himself.", date: "2024-12-01" },
        { user: "Lisa P.", rating: 5, text: "Couldn't put it down. The science is fascinating and accessible.", date: "2024-11-20" },
        { user: "Tom B.", rating: 4, text: "Great concept and execution, though some parts dragged a bit.", date: "2024-11-18" }
      ]
    },
    {
      id: 3,
      title: "The Song of Achilles",
      author: "Madeline Miller",
      rating: 4.7,
      reviewCount: 52341,
      genre: "Historical Fiction",
      pages: 416,
      publishYear: 2011,
      description: "Greece in the age of heroes. Patroclus, an awkward young prince, has been exiled to the court of King Peleus and his perfect son Achilles. Despite their differences, Achilles befriends the shamed prince, and as they grow into young men skilled in the arts of war and medicine, their bond blossoms into something deeper.",
      coverColor: "from-amber-400 to-orange-500",
      tags: ["Mythology", "Romance", "Ancient Greece"],
      topReviews: [
        { user: "Jennifer S.", rating: 5, text: "Beautifully written retelling of the Iliad. Emotional and powerful.", date: "2024-11-30" },
        { user: "David W.", rating: 5, text: "Miller's prose is absolutely gorgeous. A masterpiece.", date: "2024-11-25" },
        { user: "Rachel T.", rating: 4, text: "Lovely story, though it broke my heart completely.", date: "2024-12-05" }
      ]
    },
    {
      id: 4,
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      rating: 4.3,
      reviewCount: 28765,
      genre: "Literary Fiction",
      pages: 352,
      publishYear: 2021,
      description: "Klara and the Sun is a magnificent new novel from the Nobel laureate Kazuo Ishiguro—author of Never Let Me Go and the Booker Prize-winning The Remains of the Day. Klara and the Sun, the first novel by Kazuo Ishiguro since he was awarded the Nobel Prize in Literature, tells the story of Klara, an Artificial Friend.",
      coverColor: "from-yellow-400 to-amber-500",
      tags: ["AI", "Literary", "Philosophical"],
      topReviews: [
        { user: "Maria G.", rating: 5, text: "Ishiguro's exploration of AI consciousness is haunting and beautiful.", date: "2024-12-02" },
        { user: "James H.", rating: 4, text: "Thoughtful and melancholic, typical Ishiguro brilliance.", date: "2024-11-28" },
        { user: "Anna C.", rating: 4, text: "Beautiful writing, though the pacing is quite slow.", date: "2024-11-22" }
      ]
    },
    {
      id: 5,
      title: "The Midnight Library",
      author: "Matt Haig",
      rating: 4.6,
      reviewCount: 67234,
      genre: "Fiction",
      pages: 288,
      publishYear: 2020,
      description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
      coverColor: "from-indigo-400 to-purple-500",
      tags: ["Philosophy", "Self-Discovery", "Fantasy"],
      topReviews: [
        { user: "Sophie R.", rating: 5, text: "Life-changing book about choices and regrets. Absolutely beautiful.", date: "2024-12-04" },
        { user: "Kevin M.", rating: 4, text: "Thought-provoking concept, though a bit repetitive at times.", date: "2024-11-26" },
        { user: "Laura D.", rating: 5, text: "Perfect for anyone questioning their life choices. Inspiring!", date: "2024-11-29" }
      ]
    },
    {
      id: 6,
      title: "Educated",
      author: "Tara Westover",
      rating: 4.8,
      reviewCount: 89123,
      genre: "Memoir",
      pages: 384,
      publishYear: 2018,
      description: "Tara Westover was seventeen the first time she set foot in a classroom. Born to survivalists in the mountains of Idaho, she prepared for the end of the world by stockpiling home-canned peaches and sleeping with her 'head-for-the-hills bag'. In the summer she stewed herbs for her mother, a midwife and healer.",
      coverColor: "from-green-400 to-teal-500",
      tags: ["Education", "Family", "True Story"],
      topReviews: [
        { user: "Robert L.", rating: 5, text: "Incredibly powerful memoir. Westover's journey is inspiring and heartbreaking.", date: "2024-12-01" },
        { user: "Nicole P.", rating: 5, text: "One of the best memoirs ever written. Couldn't put it down.", date: "2024-11-27" },
        { user: "Chris K.", rating: 5, text: "A testament to the power of education and resilience.", date: "2024-12-06" }
      ]
    },
    {
      id: 7,
      title: "Dune",
      author: "Frank Herbert",
      rating: 4.5,
      reviewCount: 156789,
      genre: "Science Fiction",
      pages: 688,
      publishYear: 1965,
      description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange, a drug capable of extending life and enhancing consciousness.",
      coverColor: "from-orange-400 to-red-500",
      tags: ["Space Opera", "Politics", "Classic"],
      topReviews: [
        { user: "Mark T.", rating: 5, text: "The grandfather of all space operas. Complex and rewarding.", date: "2024-11-24" },
        { user: "Jessica F.", rating: 4, text: "Dense but incredibly rich world-building. A true classic.", date: "2024-11-21" },
        { user: "Paul S.", rating: 5, text: "Herbert created something truly magnificent. Epic in every sense.", date: "2024-12-07" }
      ]
    },
    {
      id: 8,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      rating: 4.4,
      reviewCount: 73451,
      genre: "Thriller",
      pages: 336,
      publishYear: 2019,
      description: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house overlooking a park in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.",
      coverColor: "from-red-400 to-pink-500",
      tags: ["Psychological", "Mystery", "Suspense"],
      topReviews: [
        { user: "Amanda R.", rating: 5, text: "Absolutely gripping! The twist at the end blew my mind.", date: "2024-12-03" },
        { user: "Steven G.", rating: 4, text: "Great psychological thriller with a shocking conclusion.", date: "2024-11-23" },
        { user: "Michelle B.", rating: 4, text: "Kept me guessing until the very end. Well crafted mystery.", date: "2024-11-30" }
      ]
    }
  ];

  const genres = ['All', 'Fiction', 'Science Fiction', 'Historical Fiction', 'Literary Fiction', 'Memoir', 'Thriller'];

  useEffect(() => {
    setBooks(bookData);
    setFilteredBooks(bookData);
  }, []);

  useEffect(() => {
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'year':
          return b.publishYear - a.publishYear;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredBooks(filtered);
  }, [searchTerm, selectedGenre, sortBy, books]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < fullStars
                ? 'text-yellow-400 fill-current'
                : i === fullStars && hasHalfStar
                ? 'text-yellow-400 fill-current opacity-50'
                : 'text-gray-400'
            }`}
          />
        ))}
      </div>
    );
  };

  const BookCard = ({ book }) => (
    <div 
      className="group bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer"
      onClick={() => setSelectedBook(book)}
    >
      <div className={`w-full h-48 bg-gradient-to-br ${book.coverColor} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}>
        <BookOpen className="w-16 h-16 text-white/80" />
        <div className="absolute top-2 right-2 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white flex items-center">
          <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
          {book.rating}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
        {book.title}
      </h3>
      
      <p className="text-gray-300 mb-3">by {book.author}</p>
      
      <div className="flex items-center justify-between mb-3">
        {renderStars(book.rating)}
        <span className="text-sm text-gray-400">{book.reviewCount.toLocaleString()} reviews</span>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {book.tags.slice(0, 2).map((tag, index) => (
          <span key={index} className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      
      <p className="text-sm text-gray-400 line-clamp-3 mb-4">{book.description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>{book.pages} pages</span>
        <span>{book.publishYear}</span>
      </div>
    </div>
  );

  const BookModal = ({ book, onClose }) => {
    const navigateLocal = useNavigate();

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-slate-900/90 backdrop-blur-sm border-b border-white/10 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">{book.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Book Cover & Basic Info */}
              <div>
                <div className={`w-full h-80 bg-gradient-to-br ${book.coverColor} rounded-lg mb-4 flex items-center justify-center`}>
                  <BookOpen className="w-24 h-24 text-white/80" />
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{book.title}</h3>
                    <p className="text-gray-300">by {book.author}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {renderStars(book.rating)}
                    <span className="text-white font-semibold">{book.rating}</span>
                  </div>
                  
                  <div className="text-sm text-gray-400 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{book.reviewCount.toLocaleString()} reviews</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{book.pages} pages</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Published {book.publishYear}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {book.tags.map((tag, index) => (
                      <span key={index} className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Description & Reviews */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3">Description</h4>
                  <p className="text-gray-300 leading-relaxed">{book.description}</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Top Reviews</h4>
                  <div className="space-y-4">
                    {book.topReviews.map((review, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold">
                              {review.user.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-white font-medium">{review.user}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {renderStars(review.rating)}
                            <span className="text-sm text-gray-400">{review.date}</span>
                          </div>
                        </div>
                        <p className="text-gray-300">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  {/* Navigate to book/:id for adding review. Close modal first, then navigate */}
                  <button onClick={() => { onClose(); navigateLocal(`/book/${book.id}`); }} className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white hover:scale-105 transition-transform">
                    Add Review
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Discover Books
              </h1>
              <p className="text-gray-400 mt-1">{filteredBooks.length} books available</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search books, authors, tags..."
                  className="pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre} className="bg-slate-800">{genre}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sort by</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="rating" className="bg-slate-800">Highest Rated</option>
                    <option value="reviews" className="bg-slate-800">Most Reviews</option>
                    <option value="year" className="bg-slate-800">Newest First</option>
                    <option value="title" className="bg-slate-800">Title A-Z</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredBooks.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">No books found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>

      {/* Book Modal */}
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
};

export default BookBrowser;
