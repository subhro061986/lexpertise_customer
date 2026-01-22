// import './Css.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';




const Navigation=()=> {
  return (
    <Router>
        <Routes>
            <Route exact path="/" Component={HomePage}/>
        </Routes>
    </Router>
  );
}

export default Navigation;
