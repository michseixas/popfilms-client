import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import MoviesListPage from "./pages/MoviesListPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/Footer";
import './App.css'

function App() {
 

  return (
    <>
    <Navbar />
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/profile" element={<UserProfilePage />} />
    <Route path="/moviesListType" element={<MoviesListPage />} />
    <Route path="/movieListId" element={<MovieDetailsPage />} />
    <Route path="*" element={<ErrorPage />} />
    </Routes>
    <Footer /> 
    </>
  )
}

export default App
