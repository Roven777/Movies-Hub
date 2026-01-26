const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

/* GENERIC FETCH HELPER */
async function fetchFromTMDB(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}`);
  const data = await res.json();
  return data.results || [];
}

/* TRENDING */
export async function fetchTrendingMovies() {
  return fetchFromTMDB("/trending/movie/week?");
}

/* POPULAR */
export async function fetchPopularMovies() {
  return fetchFromTMDB("/movie/popular?");
}

/* TOP RATED */
export async function fetchTopRatedMovies() {
  return fetchFromTMDB("/movie/top_rated?");
}
// MOVIE DETAILS
export async function fetchMovieDetails(id) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
  );
  return res.json();
}
/* MOVIE CAST */
export async function fetchMovieCredits(movieId) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.cast || [];
}
