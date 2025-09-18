import axios from 'axios';

const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  original_language: string;
  original_title: string;
}

export interface MovieDetails extends Movie {
  genres: Array<{
    id: number;
    name: string;
  }>;
  runtime: number;
  status: string;
  tagline: string;
  homepage: string;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Mock movie data for when API key is not available
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    poster_path: null,
    backdrop_path: null,
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    vote_average: 9.3,
    vote_count: 2800000,
    release_date: "1994-09-23",
    genre_ids: [18],
    popularity: 150.5,
    adult: false,
    original_language: "en",
    original_title: "The Shawshank Redemption"
  },
  {
    id: 2,
    title: "The Godfather",
    poster_path: null,
    backdrop_path: null,
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    vote_average: 9.2,
    vote_count: 1900000,
    release_date: "1972-03-24",
    genre_ids: [18, 80],
    popularity: 120.3,
    adult: false,
    original_language: "en",
    original_title: "The Godfather"
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster_path: null,
    backdrop_path: null,
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    vote_average: 9.0,
    vote_count: 2700000,
    release_date: "2008-07-18",
    genre_ids: [28, 80, 18],
    popularity: 140.7,
    adult: false,
    original_language: "en",
    original_title: "The Dark Knight"
  },
  {
    id: 4,
    title: "Pulp Fiction",
    poster_path: null,
    backdrop_path: null,
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    vote_average: 8.9,
    vote_count: 2100000,
    release_date: "1994-10-14",
    genre_ids: [18, 80],
    popularity: 110.2,
    adult: false,
    original_language: "en",
    original_title: "Pulp Fiction"
  },
  {
    id: 5,
    title: "Forrest Gump",
    poster_path: null,
    backdrop_path: null,
    overview: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    vote_average: 8.8,
    vote_count: 2300000,
    release_date: "1994-07-06",
    genre_ids: [18, 10749],
    popularity: 100.8,
    adult: false,
    original_language: "en",
    original_title: "Forrest Gump"
  },
  {
    id: 6,
    title: "Inception",
    poster_path: null,
    backdrop_path: null,
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    vote_average: 8.8,
    vote_count: 2400000,
    release_date: "2010-07-16",
    genre_ids: [28, 80, 18, 53],
    popularity: 130.4,
    adult: false,
    original_language: "en",
    original_title: "Inception"
  },
  {
    id: 7,
    title: "The Matrix",
    poster_path: null,
    backdrop_path: null,
    overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    vote_average: 8.7,
    vote_count: 2000000,
    release_date: "1999-03-31",
    genre_ids: [28, 80],
    popularity: 90.6,
    adult: false,
    original_language: "en",
    original_title: "The Matrix"
  },
  {
    id: 8,
    title: "Goodfellas",
    poster_path: null,
    backdrop_path: null,
    overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.",
    vote_average: 8.7,
    vote_count: 1300000,
    release_date: "1990-09-21",
    genre_ids: [18, 80],
    popularity: 85.3,
    adult: false,
    original_language: "en",
    original_title: "Goodfellas"
  },
  {
    id: 9,
    title: "The Silence of the Lambs",
    poster_path: null,
    backdrop_path: null,
    overview: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    vote_average: 8.6,
    vote_count: 1600000,
    release_date: "1991-02-14",
    genre_ids: [18, 80, 53, 9648],
    popularity: 95.7,
    adult: false,
    original_language: "en",
    original_title: "The Silence of the Lambs"
  },
  {
    id: 10,
    title: "Schindler's List",
    poster_path: null,
    backdrop_path: null,
    overview: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    vote_average: 8.9,
    vote_count: 1400000,
    release_date: "1993-12-15",
    genre_ids: [18, 36, 10752],
    popularity: 80.4,
    adult: false,
    original_language: "en",
    original_title: "Schindler's List"
  },
  {
    id: 11,
    title: "Fight Club",
    poster_path: null,
    backdrop_path: null,
    overview: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    vote_average: 8.8,
    vote_count: 2100000,
    release_date: "1999-10-15",
    genre_ids: [18, 80],
    popularity: 105.9,
    adult: false,
    original_language: "en",
    original_title: "Fight Club"
  },
  {
    id: 12,
    title: "The Lord of the Rings: The Return of the King",
    poster_path: null,
    backdrop_path: null,
    overview: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    vote_average: 8.9,
    vote_count: 1800000,
    release_date: "2003-12-17",
    genre_ids: [18, 12, 14],
    popularity: 115.2,
    adult: false,
    original_language: "en",
    original_title: "The Lord of the Rings: The Return of the King"
  },
  {
    id: 13,
    title: "The Empire Strikes Back",
    poster_path: null,
    backdrop_path: null,
    overview: "After the Rebels are overpowered by the Empire, Luke Skywalker begins his Jedi training with Yoda, while his friends are pursued by Darth Vader.",
    vote_average: 8.7,
    vote_count: 1300000,
    release_date: "1980-05-21",
    genre_ids: [18, 12, 878],
    popularity: 75.8,
    adult: false,
    original_language: "en",
    original_title: "The Empire Strikes Back"
  },
  {
    id: 14,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    poster_path: null,
    backdrop_path: null,
    overview: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    vote_average: 8.8,
    vote_count: 1900000,
    release_date: "2001-12-19",
    genre_ids: [18, 12, 14],
    popularity: 110.6,
    adult: false,
    original_language: "en",
    original_title: "The Lord of the Rings: The Fellowship of the Ring"
  },
  {
    id: 15,
    title: "Interstellar",
    poster_path: null,
    backdrop_path: null,
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    vote_average: 8.6,
    vote_count: 1900000,
    release_date: "2014-11-07",
    genre_ids: [18, 12, 878],
    popularity: 125.3,
    adult: false,
    original_language: "en",
    original_title: "Interstellar"
  },
  {
    id: 16,
    title: "Parasite",
    poster_path: null,
    backdrop_path: null,
    overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    vote_average: 8.5,
    vote_count: 800000,
    release_date: "2019-05-30",
    genre_ids: [18, 53, 35],
    popularity: 95.1,
    adult: false,
    original_language: "ko",
    original_title: "기생충"
  },
  {
    id: 17,
    title: "The Green Mile",
    poster_path: null,
    backdrop_path: null,
    overview: "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
    vote_average: 8.6,
    vote_count: 1200000,
    release_date: "1999-12-10",
    genre_ids: [18, 14],
    popularity: 85.7,
    adult: false,
    original_language: "en",
    original_title: "The Green Mile"
  },
  {
    id: 18,
    title: "Se7en",
    poster_path: null,
    backdrop_path: null,
    overview: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
    vote_average: 8.6,
    vote_count: 1800000,
    release_date: "1995-09-22",
    genre_ids: [18, 53, 80],
    popularity: 90.4,
    adult: false,
    original_language: "en",
    original_title: "Se7en"
  },
  {
    id: 19,
    title: "The Departed",
    poster_path: null,
    backdrop_path: null,
    overview: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
    vote_average: 8.5,
    vote_count: 1200000,
    release_date: "2006-09-26",
    genre_ids: [18, 53, 80],
    popularity: 88.9,
    adult: false,
    original_language: "en",
    original_title: "The Departed"
  },
  {
    id: 20,
    title: "Whiplash",
    poster_path: null,
    backdrop_path: null,
    overview: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    vote_average: 8.5,
    vote_count: 900000,
    release_date: "2014-10-10",
    genre_ids: [18],
    popularity: 70.2,
    adult: false,
    original_language: "en",
    original_title: "Whiplash"
  }
];

// Mock movie details
const mockMovieDetails: { [key: number]: MovieDetails } = {
  1: {
    id: 1,
    title: "The Shawshank Redemption",
    poster_path: null,
    backdrop_path: null,
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    vote_average: 9.3,
    vote_count: 2800000,
    release_date: "1994-09-23",
    genre_ids: [18],
    popularity: 150.5,
    adult: false,
    original_language: "en",
    original_title: "The Shawshank Redemption",
    genres: [{ id: 18, name: "Drama" }],
    runtime: 142,
    status: "Released",
    tagline: "Fear can hold you prisoner. Hope can set you free.",
    homepage: "https://www.warnerbros.com/movies/shawshank-redemption",
    production_companies: [
      {
        id: 1,
        name: "Castle Rock Entertainment",
        logo_path: null,
        origin_country: "US"
      }
    ],
    production_countries: [
      { iso_3166_1: "US", name: "United States" }
    ],
    spoken_languages: [
      { english_name: "English", iso_639_1: "en", name: "English" }
    ]
  },
  2: {
    id: 2,
    title: "The Godfather",
    poster_path: null,
    backdrop_path: null,
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    vote_average: 9.2,
    vote_count: 1900000,
    release_date: "1972-03-24",
    genre_ids: [18, 80],
    popularity: 120.3,
    adult: false,
    original_language: "en",
    original_title: "The Godfather",
    genres: [
      { id: 18, name: "Drama" },
      { id: 80, name: "Crime" }
    ],
    runtime: 175,
    status: "Released",
    tagline: "An offer you can't refuse.",
    homepage: "https://www.paramount.com/movies/the-godfather",
    production_companies: [
      {
        id: 2,
        name: "Paramount Pictures",
        logo_path: null,
        origin_country: "US"
      }
    ],
    production_countries: [
      { iso_3166_1: "US", name: "United States" }
    ],
    spoken_languages: [
      { english_name: "English", iso_639_1: "en", name: "English" },
      { english_name: "Italian", iso_639_1: "it", name: "Italiano" }
    ]
  }
};

class TMDBService {
  private api = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
      api_key: TMDB_API_KEY,
    },
  });

  private hasValidApiKey(): boolean {
    return TMDB_API_KEY && TMDB_API_KEY !== 'your_tmdb_api_key_here';
  }

  private getMockMovieResponse(page: number = 1): MovieResponse {
    const moviesPerPage = 20;
    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const pageMovies = mockMovies.slice(startIndex, endIndex);
    
    return {
      page,
      results: pageMovies,
      total_pages: Math.ceil(mockMovies.length / moviesPerPage),
      total_results: mockMovies.length
    };
  }

  private searchMockMovies(query: string, page: number = 1): MovieResponse {
    const filteredMovies = mockMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.overview.toLowerCase().includes(query.toLowerCase())
    );
    
    const moviesPerPage = 20;
    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const pageMovies = filteredMovies.slice(startIndex, endIndex);
    
    return {
      page,
      results: pageMovies,
      total_pages: Math.ceil(filteredMovies.length / moviesPerPage),
      total_results: filteredMovies.length
    };
  }

  async getPopularMovies(page: number = 1): Promise<MovieResponse> {
    if (!this.hasValidApiKey()) {
      // Return mock data when no API key is available
      return this.getMockMovieResponse(page);
    }

    try {
      const response = await this.api.get('/movie/popular', {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      // Fallback to mock data
      return this.getMockMovieResponse(page);
    }
  }

  async searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
    if (!this.hasValidApiKey()) {
      // Return mock search results when no API key is available
      return this.searchMockMovies(query, page);
    }

    try {
      const response = await this.api.get('/search/movie', {
        params: { query, page },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      // Fallback to mock search
      return this.searchMockMovies(query, page);
    }
  }

  async getMovieDetails(id: number): Promise<MovieDetails> {
    if (!this.hasValidApiKey()) {
      // Return mock movie details when no API key is available
      const mockDetail = mockMovieDetails[id];
      if (mockDetail) {
        return mockDetail;
      }
      
      // Create basic mock details for any movie ID
      const movie = mockMovies.find(m => m.id === id);
      if (movie) {
        return {
          ...movie,
          genres: [{ id: 18, name: "Drama" }],
          runtime: 120,
          status: "Released",
          tagline: "A great movie experience",
          homepage: "",
          production_companies: [],
          production_countries: [],
          spoken_languages: [{ english_name: "English", iso_639_1: "en", name: "English" }]
        };
      }
      
      throw new Error('Movie not found');
    }

    try {
      const response = await this.api.get(`/movie/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }

  getImageUrl(path: string | null, size: string = 'w500'): string {
    if (!path) return '/placeholder-movie.svg';
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  }
}

export const tmdbService = new TMDBService();