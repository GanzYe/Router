import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <div className="header d-flex">
      <h3>
        <Link to="/">
          QuizEX!
        </Link>
      </h3>
      <ul className="d-flex">
        {/* <li>
          <Link className="header-content" to="/quizzes/">Quizzes</Link>
        </li>
        <li>
          <Link className="header-content" to="/create/">Create Quiz</Link>
        </li>
        <li>
          <Link className="header-content" to="/goat/">G.O.A.T</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Header;