// import './Css.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import ResultPage from './pages/ResultPage';
import DetailsPage from './pages/DetailsPage';




const Navigation=()=> {
  return (
    <Router>
        <Routes>
            <Route exact path="/" Component={HomePage}/>
            <Route exact path="/pricing" Component={PricingPage}/>
            <Route exact path="/result" Component={ResultPage}/>
            <Route exact path="/details" Component={DetailsPage}/>
        </Routes>
    </Router>
  );
}

export default Navigation;
