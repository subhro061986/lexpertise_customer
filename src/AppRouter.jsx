import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import ResultPage from "./pages/ResultPage";
import DetailsPage from "./pages/DetailsPage";
import TopMenu from "./layout/TopMenu";
import AboutPage from "./pages/AboutUsPage";
import SearchResultsPage from "./pages/ResultPage";

const Navigation = ({ onLoginClick, onSignupClick }) => {
  return (
    <Router>
      <TopMenu
        onLoginClick={onLoginClick}
        onSignupClick={onSignupClick}
      />

      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/pricing" Component={PricingPage} />
        <Route path="/result" Component={ResultPage} />
        <Route path="/details" Component={DetailsPage} />
        <Route path="/about" Component={AboutPage} />
        <Route path="/search-results" Component={SearchResultsPage} />
      </Routes>
    </Router>
  );
};

export default Navigation;
