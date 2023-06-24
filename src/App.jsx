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
import Rate from "./pages/MovieDetailsPage";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/Footer";
import "./App.css";
import { AuthProviderWrapper } from "./contexts/auth.context";
import { FilterProviderWrapper } from "./contexts/filter.context";
import { Container, Row, Col } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div className="page-wrapper">
      <Container>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <AuthProviderWrapper>
              <FilterProviderWrapper>
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/profile" element={<UserProfilePage />} />
                  <Route path="/lists/:listId" element={<MoviesListPage />} />
                  <Route
                    path="/movies/:movieId"
                    element={<MovieDetailsPage />}
                  />
                  <Route path="/:movieId/addComment" element={<AddComment />} />
                  <Route path="/:movieId/rate" element={<Rate />} />
                  <Route path="*" element={<ErrorPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/logout" element={<LogoutPage />} />
                </Routes>
              </FilterProviderWrapper>
            </AuthProviderWrapper>
            <Footer />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
