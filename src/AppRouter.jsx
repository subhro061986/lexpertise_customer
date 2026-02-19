import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import ResultPage from "./pages/ResultPage";
import DetailsPage from "./pages/DetailsPage";
import TopMenu from "./layout/TopMenu";
import AboutPage from "./pages/AboutUsPage";
import SearchResultsPage from "./pages/ResultPage";
import CaseDetailPage from "./pages/CaseDetailPage";
import PdfViewerPage from "./layout/PdfViewerPage";
import PrivateRoute from "./layout/PrivateRoute";

const Navigation = ({ onLoginClick, onSignupClick }) => {
  return (
    <Router>
      <TopMenu onLoginClick={onLoginClick} onSignupClick={onSignupClick} />

      <Routes>
        <Route path="/"               Component={HomePage} />
        {/* Private — must be logged in */}
        <Route
          path="/pdf-viewer"
          element={
            <PrivateRoute>
              <PdfViewerPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default Navigation;