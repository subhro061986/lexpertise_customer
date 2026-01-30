import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import ResultPage from "./pages/ResultPage";
import DetailsPage from "./pages/DetailsPage";
import TopMenu from "./layout/TopMenu";

const Navigation = ({ onLoginClick }) => {
  return (
    <Router>
      <TopMenu onLoginClick={onLoginClick} />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/pricing" Component={PricingPage} />
        <Route path="/result" Component={ResultPage} />
        <Route path="/details" Component={DetailsPage} />
      </Routes>
    </Router>
  );
};

export default Navigation;
