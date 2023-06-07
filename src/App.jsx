import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import UserProfilePage from "./pages/UserProfilePage";
import MoviesListPage from "./pages/MoviesListPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import AddComment from "./pages/MovieDetailsPage";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/Footer";
import "./App.css";
import { AuthProviderWrapper } from "./contexts/auth.context";
import { FilterProviderWrapper } from "./contexts/filter.context";

function App() {
  return (
    <>

      <AuthProviderWrapper>
      <FilterProviderWrapper>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/:listId" element={<MoviesListPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
          <Route path="/:movieId/addComment" element={<AddComment />}/> 
          <Route path="*" element={<ErrorPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
        </FilterProviderWrapper>
      </AuthProviderWrapper>
      <Footer />
    </>
  );
}

export default App;