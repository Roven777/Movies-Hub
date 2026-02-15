import { createHashRouter } from "react-router-dom";
import StartPage from "./pages/StartPage";
import HomePage from "./pages/HomePage";
import MovieDetail from "./pages/MovieDetail";
import SearchPage from "./components/SearchPage";

const router = createHashRouter([
  { path: "/", element: <StartPage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/movie/:id", element: <MovieDetail /> },
  { path: "/search", element: <SearchPage /> },
]);

export default router;
