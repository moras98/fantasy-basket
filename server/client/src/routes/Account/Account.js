import React from 'react'
import { useSelector } from 'react-redux';
// import { Route } from 'react-router-dom';

function Account() {
  const user = useSelector(state => state.user);
  return (
    <div style={{display: 'flex', backgroundColor: 'blue'}}>
      <p style={{fontSize: 40, color: 'black'}}>Account {user.username}</p>
    </div>
  );
}

export default Account;
