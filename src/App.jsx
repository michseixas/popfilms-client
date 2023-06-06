import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import UserProfilePage from "./pages/UserProfilePage";
import MoviesListPage from "./pages/MoviesListPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/Footer";
import "./App.css";
import { AuthProviderWrapper } from "./contexts/auth.context";

function App() {
  return (
    <>

      <AuthProviderWrapper>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/moviesListType" element={<MoviesListPage />} />
          <Route path="/movieListId:movieId" element={<MovieDetailsPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </AuthProviderWrapper>
      <Footer />
    </>
  );
}

export default App;
