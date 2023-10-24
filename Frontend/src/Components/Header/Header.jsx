import React, { useState, useEffect } from 'react';
import logo from "../../logo.png";
import { Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";

const Header = () => {
  // Initialize the toggle state from local storage
  const [isFamilyFriendly, setIsFamilyFriendly] = useState(
    localStorage.getItem('familyFriendly') === 'true'
  );

  // Event handler to toggle the state and update local storage
  const toggleFamilyFriendly = () => {
    const newValue = !isFamilyFriendly;
    setIsFamilyFriendly(newValue);
    // Store the new value in local storage
    localStorage.setItem('familyFriendly', newValue.toString());
  };

  // Effect to sync the state with local storage on component mount
  useEffect(() => {
    const storedValue = localStorage.getItem('familyFriendly');
    if (storedValue !== null) {
      setIsFamilyFriendly(storedValue === 'true');
    }
  }, []);

  return (
    <nav className="header">
      <img src={logo} alt="logo" />
      <div>
        <Link to="/tvshows">TV Shows</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/recent">Recently Added</Link>
        <Link to="/mylist">My List</Link>
      </div>
      <ImSearch />

      {/* Family-Friendly Toggle Button */}
      <label>
        <input
          type="checkbox"
          checked={isFamilyFriendly}
          onChange={toggleFamilyFriendly}
        />
        Family Friendly
      </label>
    </nav>
  );
}

export default Header;
