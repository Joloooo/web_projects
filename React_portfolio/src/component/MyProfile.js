import React, { useEffect, useState } from 'react';
import apiClient from '../component/ApiClient'; // Use the configured Axios client

const MyProfile = () => {
  const [profileData, setProfileData] = useState([]);
  const [currentView, setCurrentView] = useState('AccountInfo');
  const [loading, setLoading] = useState(true); // Loading state
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1024);
  const [showNavbar, setShowNavbar] = useState(true); // Mobile navbar visibility
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [messages, setMessages] = useState({ password: '', accountInfo: '', personalInfo: '' }); // Message state

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await apiClient.get('/loggedUserData');
        const data = response.data;
        console.log(data); // Log the data
        setProfileData(Object.entries(data));
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setMessages((prev) => ({ ...prev, accountInfo: 'Failed to load profile data.' }));
      } finally {
        setLoading(false); // Data loading complete
      }
    };

    getProfileData();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (index, newValue) => {
    setProfileData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index][1] = newValue; // Update the value at the specific index
      return updatedData;
    });
  };

  const saveProfileUpdates = async (updatedData, section) => {
    try {
      const token = localStorage.getItem('token'); // Assume token is stored here
      const response = await apiClient.post('/updateProfile', updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setMessages((prev) => ({ ...prev, [section]: 'Profile updated successfully!' }));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessages((prev) => ({ ...prev, [section]: 'Failed to update profile. Please try again.' }));
    }
  };

  const handleSave = async (section) => {
    const updatedData = profileData.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

    await saveProfileUpdates(updatedData, section);
  };

  const goBack = () => setShowNavbar(true);

  const renderContent = (content) => (
    <div className={`active-content ${isMobileView ? '' : 'flex'}`}>
      {isMobileView && <button className="back-button" onClick={goBack}>Back</button>}
      {content}
    </div>
  );

  const setViewAndClearMessages = (view) => {
    setCurrentView(view); // Set the current view
    setMessages({ password: '', accountInfo: '', personalInfo: '' }); // Clear all messages
};

  const passwordForm = (
    <div className="myProfile-input-div">
        <h3>Manage your profile Info</h3>
        <div className="myProfile-input-div-password">
            <p>
                <span>Old Password:</span>
                <input
                    type="password"
                    placeholder="Enter old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
            </p>
            <p>
                <span>New Password:</span>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </p>
            <p>
                <span>Repeat New Password:</span>
                <input
                    type="password"
                    placeholder="Repeat new password"
                    value={repeatNewPassword}
                    onChange={(e) => setRepeatNewPassword(e.target.value)}
                />
            </p>
            <div className="savebuttonDiv">
                <button
                    className="saveButton"
                    disabled={loading}
                    onClick={async () => {
                        if (newPassword !== repeatNewPassword) {
                            setMessages((prev) => ({ ...prev, password: { type: 'error', text: 'Passwords do not match!' } }));
                            return;
                        }
                        try {
                            await saveProfileUpdates({ password: newPassword }, 'password');
                            setMessages((prev) => ({ ...prev, password: { type: 'success', text: 'Password updated successfully!' } }));
                        } catch (error) {
                            setMessages((prev) => ({ ...prev, password: { type: 'error', text: 'Failed to update password. Please try again.' } }));
                        }
                    }}
                >
                    Save
                </button>
            </div>
            {messages.password && (
                <div className={messages.password.type === 'success' ? 'success-message' : 'error-message'}>
                    {messages.password.text}
                </div>
            )}
        </div>
    </div>
);

  const AccountInfoForm = (
    <div>
      <h3>Manage your profile Info</h3>
      {profileData.length > 0 ? (
        profileData.slice(0, 3).map((values, index) => (
          <div className="myProfile-input-div" key={values[0]}>
            <p>
              <span>{values[0].charAt(0).toUpperCase() + values[0].slice(1)}:</span>
              <input
                placeholder="N/A"
                value={values[1]}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </p>
          </div>
        ))
      ) : (
        [0, 1, 2].map((index) => (
          <div key={index}>
            <p>
              <span className="smallloader">Loading...</span>
              <input className="smallloader" placeholder="Loading..." disabled />
            </p>
          </div>
        ))
      )}
      <div className="savebuttonDiv">
        <button className="saveButton" disabled={loading} onClick={() => handleSave('accountInfo')}>
          Save
        </button>
      </div>
      {messages.accountInfo && <div className="success-message">{messages.accountInfo}</div>}
    </div>
  );

  const personalInfoForm = (
    <div className="myProfile-input-div">
      <h3>Manage your profile Info</h3>
      {profileData.length > 0 ? (
        profileData.slice(3, 7).map((values, index) => (
          <div key={values[0]}>
            <p>
              <span>{values[0].charAt(0).toUpperCase() + values[0].slice(1)}:</span>
              <input
                placeholder="N/A"
                value={values[1]}
                onChange={(e) => handleInputChange(index + 3, e.target.value)}
              />
            </p>
          </div>
        ))
      ) : (
        [0, 1, 2, 3].map((index) => (
          <div key={index}>
            <p>
              <span className="smallloader">Loading...</span>
              <input className="smallloader" placeholder="Loading..." disabled />
            </p>
          </div>
        ))
      )}
      <div className="savebuttonDiv">
        <button className="saveButton" disabled={loading} onClick={() => handleSave('personalInfo')}>
          Save
        </button>
      </div>
      {messages.personalInfo && <div className="success-message">{messages.personalInfo}</div>}
    </div>
  );

  if (loading) {
    return (
      <div className="myProfile">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className={`myProfile ${isMobileView && !showNavbar ? 'show-content' : ''}`}>
        {isMobileView && showNavbar ? (
            <div className="myProfile-navbar">
                <button onClick={() => { setViewAndClearMessages('password'); setShowNavbar(false); }}>Password</button>
                <button onClick={() => { setViewAndClearMessages('AccountInfo'); setShowNavbar(false); }}>Account Info</button>
                <button onClick={() => { setViewAndClearMessages('personalInfo'); setShowNavbar(false); }}>Personal Info</button>
            </div>
        ) : (
            <>
                <div className="myProfile-navbar">
                    <button onClick={() => setViewAndClearMessages('password')}>Password</button>
                    <button onClick={() => setViewAndClearMessages('AccountInfo')}>Account Info</button>
                    <button onClick={() => setViewAndClearMessages('personalInfo')}>Personal Info</button>
                </div>
                <div className="myProfile-content">
                    {currentView === 'password' && renderContent(passwordForm)}
                    {currentView === 'AccountInfo' && renderContent(AccountInfoForm)}
                    {currentView === 'personalInfo' && renderContent(personalInfoForm)}
                </div>
            </>
        )}
    </div>
);
};

export default MyProfile;
