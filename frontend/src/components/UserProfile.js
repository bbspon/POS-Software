
// import React, { useState } from 'react';

// const UserProfilePage = () => {
//   // Mock user data (can be replaced with API calls)
//   const [userData, setUserData] = useState({
//     profilePicture: 'https://via.placeholder.com/150',
//     fullName: 'John Doe',
//     email: 'john.doe@example.com',
//     phone: '123-456-7890',
//     dateOfBirth: '1990-01-15',
//     gender: 'Male',
//     address: '123 Main Street, City A',
//     notifications: {
//       email: true,
//       sms: false,
//       push: true
//     }
//   });

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmNewPassword: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData({ ...passwordData, [name]: value });
//   };

//   const handleSaveProfile = () => {
//     alert('Profile updated successfully!');
//   };

//   const handleChangePassword = () => {
//     if (passwordData.newPassword !== passwordData.confirmNewPassword) {
//       alert('New password and confirm password do not match.');
//     } else {
//       alert('Password changed successfully!');
//     }
//   };

//   return (
//     <div className="user-profile-page">
//       <h1 className="page-title">User Profile</h1>

//       {/* Profile Picture Section */}
//       <div className="profile-picture-section">
//         <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
//         <button className="upload-button">Upload New Picture</button>
//       </div>

//       {/* Personal Information Section */}
//       <div className="personal-info-section">
//         <h2>Personal Information</h2>
//         <label>Full Name</label>
//         <input type="text" name="fullName" value={userData.fullName} onChange={handleInputChange} />

//         <label>Email</label>
//         <input type="email" name="email" value={userData.email} onChange={handleInputChange} />

//         <label>Phone</label>
//         <input type="text" name="phone" value={userData.phone} onChange={handleInputChange} />

//         <label>Date of Birth</label>
//         <input type="date" name="dateOfBirth" value={userData.dateOfBirth} onChange={handleInputChange} />

//         <label>Gender</label>
//         <select name="gender" value={userData.gender} onChange={handleInputChange}>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>

//         <label>Address</label>
//         <textarea name="address" value={userData.address} onChange={handleInputChange}></textarea>

//         <button onClick={handleSaveProfile} className="save-button">Save Profile</button>
//       </div>

//       {/* Change Password Section */}
//       <div className="change-password-section">
//         <h2>Change Password</h2>
//         <label>Current Password</label>
//         <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} />

//         <label>New Password</label>
//         <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} />

//         <label>Confirm New Password</label>
//         <input type="password" name="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} />

//         <button onClick={handleChangePassword} className="change-password-button">Change Password</button>
//       </div>

//       {/* Notification Preferences Section */}
//       <div className="notifications-section">
//         <h2>Notification Preferences</h2>
//         <label>
//           <input type="checkbox" checked={userData.notifications.email} onChange={() => setUserData({ ...userData, notifications: { ...userData.notifications, email: !userData.notifications.email } })} />
//           Email Notifications
//         </label>
//         <label>
//           <input type="checkbox" checked={userData.notifications.sms} onChange={() => setUserData({ ...userData, notifications: { ...userData.notifications, sms: !userData.notifications.sms } })} />
//           SMS Notifications
//         </label>
//         <label>
//           <input type="checkbox" checked={userData.notifications.push} onChange={() => setUserData({ ...userData, notifications: { ...userData.notifications, push: !userData.notifications.push } })} />
//           Push Notifications
//         </label>
//       </div>
//       <style>
//         {`
//         .user-profile-page {
//   padding: 20px;
//   font-family: Arial, sans-serif;
// }

// .page-title {
//   font-size: 28px;
//   font-weight: bold;
//   margin-bottom: 20px;
// }

// .profile-picture-section {
//   display: flex;
//   align-items: center;
//   gap: 20px;
//   margin-bottom: 20px;
// }

// .profile-picture {
//   width: 150px;
//   height: 150px;
//   border-radius: 50%;
//   border: 2px solid #ccc;
//   object-fit: cover;
// }

// .upload-button {
//   background-color: #007bff;
//   color: white;
//   padding: 8px 12px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// }

// .upload-button:hover {
//   background-color: #0056b3;
// }

// .personal-info-section,
// .change-password-section,
// .notifications-section {
//   margin-bottom: 30px;
// }

// h2 {
//   font-size: 22px;
//   font-weight: bold;
//   margin-bottom: 10px;
// }

// label {
//   display: block;
//   margin-bottom: 5px;
//   font-weight: bold;
// }

// input[type="text"],
// input[type="email"],
// input[type="password"],
// input[type="date"],
// select,
// textarea {
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 15px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// }

// textarea {
//   height: 80px;
// }

// .save-button,
// .change-password-button {
//   background-color: #28a745;
//   color: white;
//   padding: 10px 15px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// }

// .save-button:hover,
// .change-password-button:hover {
//   background-color: #218838;
// }

// .notifications-section label {
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   margin-bottom: 10px;
// }`}
//       </style>
//     </div>
//   );
// };

// export default UserProfilePage;




import React, { useState } from "react";

const UserProfilePage = () => {
  // User data state
  const [userData, setUserData] = useState({
    profilePicture: "https://via.placeholder.com/150",
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    dateOfBirth: "1990-01-15",
    gender: "Male",
    address: "123 Main Street, City A",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Handle user input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  // Save profile function
  const handleSaveProfile = () => {
    alert("Profile updated successfully!");
  };

  // Change password function
  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("New password and confirm password do not match.");
    } else {
      alert("Password changed successfully!");
    }
  };

  return (
    <div className="user-profile">
      <h1 className="title">User Profile</h1>

      {/* Profile Picture */}
      <div className="profile-section">
        <img src={userData.profilePicture} alt="Profile" className="profile-pic" />
        <button className="btn upload-btn">Upload New Picture</button>
      </div>

      {/* Personal Information */}
      <div className="info-section">
        <h2>Personal Information</h2>
        <label>Full Name</label>
        <input type="text" name="fullName" value={userData.fullName} onChange={handleInputChange} />

        <label>Email</label>
        <input type="email" name="email" value={userData.email} onChange={handleInputChange} />

        <label>Phone</label>
        <input type="text" name="phone" value={userData.phone} onChange={handleInputChange} />

        <label>Date of Birth</label>
        <input type="date" name="dateOfBirth" value={userData.dateOfBirth} onChange={handleInputChange} />

        <label>Gender</label>
        <select name="gender" value={userData.gender} onChange={handleInputChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Address</label>
        <textarea name="address" value={userData.address} onChange={handleInputChange}></textarea>

        <button onClick={handleSaveProfile} className="btn save-btn">Save Profile</button>
      </div>

      {/* Change Password */}
      <div className="password-section">
        <h2>Change Password</h2>
        <label>Current Password</label>
        <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} />

        <label>New Password</label>
        <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} />

        <label>Confirm New Password</label>
        <input type="password" name="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} />

        <button onClick={handleChangePassword} className="btn password-btn">Change Password</button>
      </div>

      {/* Notification Preferences */}
      <div className="notifications-section">
        <h2>Notification Preferences</h2>
        <label>
          <input type="checkbox" checked={userData.notifications.email} onChange={() => setUserData({ ...userData, notifications: { ...userData.notifications, email: !userData.notifications.email } })} />
          Email Notifications
        </label>
        <label>
          <input type="checkbox" checked={userData.notifications.sms} onChange={() => setUserData({ ...userData, notifications: { ...userData.notifications, sms: !userData.notifications.sms } })} />
          SMS Notifications
        </label>
        <label>
          <input type="checkbox" checked={userData.notifications.push} onChange={() => setUserData({ ...userData, notifications: { ...userData.notifications, push: !userData.notifications.push } })} />
          Push Notifications
        </label>
      </div>
      <style>
        {`
        .user-profile {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #ccc;
  object-fit: cover;
}

.upload-btn {
  background-color: #007bff;
}

.info-section, .password-section, .notifications-section {
  margin-top: 20px;
}

h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

input, select, textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  height: 80px;
}

.btn {
  display: block;
  width: 100%;
  margin-top: 15px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: white;
  cursor: pointer;
}

.save-btn {
  background-color: #28a745;
}

.password-btn {
  background-color: #dc3545;
}

.notifications-section label {
  display: flex;
  align-items: center;
  gap: 10px;
}
`}
      </style>
    </div>
  );
};

export default UserProfilePage;
