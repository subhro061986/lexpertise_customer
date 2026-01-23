// import './Css.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';




const Navigation=()=> {
  return (
    <Router>
        <Routes>
            <Route exact path="/" Component={HomePage}/>
            <Route exact path="/pricing" Component={PricingPage}/>
        </Routes>
    </Router>
  );
}

export default Navigation;
