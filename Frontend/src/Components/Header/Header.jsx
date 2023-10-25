import React, { useState, useEffect } from 'react';
import logo from "../../logo.png";
import { Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import Vocal from '@untemps/react-vocal'
import 'react-chat-widget/lib/styles.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';

const names = [
  'en',
  'ja',
  'fr'
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

const Header = () => {
  const [personName, setPersonName] = React.useState(["ja"]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    
  };

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
  useEffect(()=>{
    localStorage.setItem('lang', JSON.stringify(personName))
  },[personName])
  return (

    <nav className="header">
      <img src={logo} alt="logo" />
      <div>
        <Link to="/tvshows">TV Shows</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/recent">Recently Added</Link>
        <Link to="/mylist">My List</Link>
      </div>

      <Typography sx={{maxWidth:100, }}>
      <FormControl sx={{ m: 1, width: 100 }}>
        <InputLabel id="demo-multiple-checkbox-label">Lang</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Select Language" placeholder='Select Language'/>}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl></Typography>
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
