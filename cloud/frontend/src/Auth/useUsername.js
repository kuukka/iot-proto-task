import { useState } from 'react';

export default function useUsername() {
  const getUsername = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.name
  };

  const [username, setUsername] = useState(getUsername());  
  
  const saveUsername = userName => {
    sessionStorage.setItem('token', JSON.stringify(userName));
    setUsername(userName.name);
  };

  return {
    setUsername: saveUsername,
    username
  }
}