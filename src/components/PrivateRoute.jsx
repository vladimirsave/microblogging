import React from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';

const PrivateRoute = ({ currentUser, children }) => {
    return currentUser ? children : <Navigate to = '/login'></Navigate>;
  };

  export default PrivateRoute