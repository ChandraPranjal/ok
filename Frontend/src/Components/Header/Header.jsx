import React, { useState, useEffect } from 'react';
import logo from "../../logo.png";
import { Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import Vocal from '@untemps/react-vocal'
import 'react-chat-widget/lib/styles.css';


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
  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };
  const [result, setResult] = useState('')

  const _onVocalStart = () => {
    setResult('')
  }

  const _onVocalResult = (result) => {
    setResult(result)
  }
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
      <span style={{ position: 'relative' }}>
        <Vocal
          onStart={_onVocalStart}
          onResult={_onVocalResult}
          style={{ width: 16, position: 'absolute', right: 10, top: -2 }}
        />
        <input defaultValue={result} style={{ width: 300, height: 40 }} />
      </span>

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
