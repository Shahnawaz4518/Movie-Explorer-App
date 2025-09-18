'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Star, Heart, Calendar, Clock, Globe, Film, Moon, Sun } from 'lucide-react';
import { tmdbService, MovieDetails } from '@/lib/tmdb';
import Image from 'next/image';

export default function MovieDetailPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const params = useParams();
  const movieId = params.id as string;
  
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  const fetchMovieDetails = async () => {
    setLoading(true);
    try {
      const movieDetails = await tmdbService.getMovieDetails(parseInt(movieId));
      setMovie(movieDetails);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setError('Failed to load movie details');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (!movie) return;
    
    const newFavorites = favorites.includes(movie.id)
      ? favorites.filter(id => id !== movie.id)
      : [...favorites, movie.id];
    
    setFavorites(newFavorites);
    localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            </div>
            <div className="md:col-span-2 space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Film className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Movie Not Found</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {error || 'The movie you are looking for does not exist.'}
              </p>
              <Button onClick={() => router.push('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Movies
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-4">
                <Film className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Movie Details</h1>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="md:col-span-1">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={tmdbService.getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Movie Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-lg text-gray-600 dark:text-gray-400 italic mb-4">
                  {movie.tagline}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ({movie.vote_count.toLocaleString()} votes)
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                {movie.runtime > 0 && (
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
                <Badge variant="outline">{movie.status}</Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={toggleFavorite}
                variant={favorites.includes(movie.id) ? "default" : "outline"}
              >
                <Heart
                  className={`h-4 w-4 mr-2 ${
                    favorites.includes(movie.id) ? 'fill-current' : ''
                  }`}
                />
                {favorites.includes(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
              {movie.homepage && (
                <Button variant="outline" asChild>
                  <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-2" />
                    Visit Website
                  </a>
                </Button>
              )}
            </div>

            {/* Overview */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {/* Genres */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre.id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Production Companies */}
            {movie.production_companies.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Production Companies</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {movie.production_companies.map((company) => (
                    <div key={company.id} className="flex items-center space-x-2">
                      {company.logo_path && (
                        <Image
                          src={tmdbService.getImageUrl(company.logo_path, 'w92')}
                          alt={company.name}
                          width={30}
                          height={30}
                          className="rounded"
                        />
                      )}
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {company.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Production Countries */}
            {movie.production_countries.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Production Countries</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.production_countries.map((country) => (
                    <Badge key={country.iso_3166_1} variant="outline">
                      {country.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Spoken Languages */}
            {movie.spoken_languages.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.spoken_languages.map((language) => (
                    <Badge key={language.iso_639_1} variant="outline">
                      {language.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}