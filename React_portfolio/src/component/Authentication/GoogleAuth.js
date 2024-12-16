import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import PropTypes from 'prop-types'; // Import PropTypes for validation

const GoogleAuth = ({ onSuccess, onError }) => {
  return (
    <GoogleOAuthProvider clientId="427179292131-6p4dkl1v9gjmmr2cf363d39a922vl3ri.apps.googleusercontent.com" lang="en">
      <div className="google-auth">
        <GoogleLogin onSuccess={onSuccess} onError={onError} />
      </div>
    </GoogleOAuthProvider>
  );
};

// Define prop types for validation
GoogleAuth.propTypes = {
  onSuccess: PropTypes.func.isRequired, // Callback for successful sign-in
  onError: PropTypes.func.isRequired,  // Callback for failed sign-in
};

export default GoogleAuth;
