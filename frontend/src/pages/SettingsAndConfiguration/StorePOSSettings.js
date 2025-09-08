// import React from 'react';

// const StorePOSSettingsPage = () => {
//     return (
//         <div>
//             <h1>POS Settings</h1>
//             <p>Configure store settings, payment options, and user roles.
//                 Make sure to keepyour settig
//             </p>

//             <div className="settings-section">
//                 <h3>General Settings</h3>
//                 <p>Update store name, location, and tax settings.
//                     Make sure to keep your store information up to date to ensure accurate transactions.
//                 </p>

//                 <h3>Payment Settings</h3>
//                 <p>Configure accepted payment methods and discounts.
//                     Make sure to keep your payment setting up to date to ensure smooth transactions.
//                 </p>

//                 <h3>User Roles</h3>
//                 <p>Manage user roles, permissons, and shift tracking.
//                     Making changes to user roles will affect the permissins of the users in you store.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default StorePOSSettingsPage;

import React, { useState } from "react";

const StorePOSSettingsPage = () => {
    const [settings, setSettings] = useState({
        storeName: "",
        location: "",
        taxRate: "",
        currency: "USD",
        paymentMethods: [],
        userRoles: [],
        receiptFooter: "",
        enableDiscounts: false,
        enableReturns: true
    });

    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({ 
            ...settings, 
            [name]: type === "checkbox" ? checked : value 
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Settings updated successfully!");
    };

    return (
        <div className="settings-container">
            <h1>POS Settings</h1>
            <p>Configure your POS system for smooth transactions and operations.</p>

            <form onSubmit={handleSubmit} className="settings-form">

                {/* General Settings */}
                <div className="settings-section">
                    <h3 onClick={() => toggleSection("general")}>General Settings</h3>
                    {activeSection === "general" && (
                        <div className="settings-content">
                            <label>Store Name:</label>
                            <input type="text" name="storeName" value={settings.storeName} onChange={handleChange} placeholder="Enter store name" required />

                            <label>Store Location:</label>
                            <input type="text" name="location" value={settings.location} onChange={handleChange} placeholder="Enter store location" required />

                            <label>Tax Rate (%):</label>
                            <input type="number" name="taxRate" value={settings.taxRate} onChange={handleChange} placeholder="Enter tax rate" required />

                            <label>Currency:</label>
                            <select name="currency" value={settings.currency} onChange={handleChange}>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="INR">INR</option>
                                <option value="GBP">GBP</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Payment Settings */}
                <div className="settings-section">
                    <h3 onClick={() => toggleSection("payment")}>Payment Settings</h3>
                    {activeSection === "payment" && (
                        <div className="settings-content">
                            <label>Accepted Payment Methods:</label>
                            <select name="paymentMethods" multiple onChange={handleChange}>
                                <option value="Credit Card">Credit Card</option>
                                <option value="Cash">Cash</option>
                                <option value="UPI">UPI</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Google Pay">Google Pay</option>
                            </select>

                            <label>
                                <input type="checkbox" name="enableDiscounts" checked={settings.enableDiscounts} onChange={handleChange} />
                                Enable Discounts
                            </label>

                            <label>
                                <input type="checkbox" name="enableReturns" checked={settings.enableReturns} onChange={handleChange} />
                                Enable Returns
                            </label>
                        </div>
                    )}
                </div>

                {/* User Roles */}
                <div className="settings-section">
                    <h3 onClick={() => toggleSection("roles")}>User Roles</h3>
                    {activeSection === "roles" && (
                        <div className="settings-content">
                            <label>Manage User Roles:</label>
                            <select name="userRoles" multiple onChange={handleChange}>
                                <option value="Admin">Admin</option>
                                <option value="Cashier">Cashier</option>
                                <option value="Manager">Manager</option>
                                <option value="Staff">Staff</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Receipt Settings */}
                <div className="settings-section">
                    <h3 onClick={() => toggleSection("receipt")}>Receipt Settings</h3>
                    {activeSection === "receipt" && (
                        <div className="settings-content">
                            <label>Receipt Footer Message:</label>
                            <textarea name="receiptFooter" value={settings.receiptFooter} onChange={handleChange} placeholder="Enter receipt footer message"></textarea>
                        </div>
                    )}
                </div>

                {/* Save Button */}
                <button type="submit" className="save-button">Save Settings</button>
            </form>
            <style>
                {`
                .settings-container {
    max-width: 700px;
    margin: 40px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    color: #333;
}

p {
    text-align: center;
    color: #666;
    margin-bottom: 20px;
}

.settings-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.settings-section {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
    transition: 0.3s;
}

.settings-section h3 {
    cursor: pointer;
    color: #007bff;
    margin-bottom: 10px;
}

.settings-content {
    padding: 10px 0;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input, select, textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

textarea {
    resize: vertical;
    min-height: 60px;
}

input[type="checkbox"] {
    width: auto;
    margin-right: 10px;
}

.save-button {
    background-color: #28a745;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s ease;
}

.save-button:hover {
    background-color: #218838;
}
`}
            </style>
        </div>
    );
};

export default StorePOSSettingsPage;





// import React, { useState } from "react";

// const StorePOSSettingsPage = () => {
//     const [settings, setSettings] = useState({
//         storeName: "",
//         location: "",
//         taxRate: "",
//         paymentMethods: [],
//         userRoles: [],
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setSettings({ ...settings, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         alert("Settings saved successfully!");
//     };

//     return (
//         <div className="settings-container">
//             <h1>POS Settings</h1>
//             <p>Configure store settings, payment options, and user roles.</p>

//             <form onSubmit={handleSubmit} className="settings-form">
//                 {/* General Settings */}
//                 <div className="settings-section">
//                     <h3>General Settings</h3>
//                     <label>Store Name:</label>
//                     <input
//                         type="text"
//                         name="storeName"
//                         value={settings.storeName}
//                         onChange={handleChange}
//                         placeholder="Enter store name"
//                         required
//                     />

//                     <label>Store Location:</label>
//                     <input
//                         type="text"
//                         name="location"
//                         value={settings.location}
//                         onChange={handleChange}
//                         placeholder="Enter store location"
//                         required
//                     />

//                     <label>Tax Rate (%):</label>
//                     <input
//                         type="number"
//                         name="taxRate"
//                         value={settings.taxRate}
//                         onChange={handleChange}
//                         placeholder="Enter tax rate"
//                         required
//                     />
//                 </div>

//                 {/* Payment Settings */}
//                 <div className="settings-section">
//                     <h3>Payment Settings</h3>
//                     <label>Accepted Payment Methods:</label>
//                     <select name="paymentMethods" multiple onChange={handleChange}>
//                         <option value="Credit Card">Credit Card</option>
//                         <option value="Cash">Cash</option>
//                         <option value="UPI">UPI</option>
//                         <option value="PayPal">PayPal</option>
//                     </select>
//                 </div>

//                 {/* User Roles */}
//                 <div className="settings-section">
//                     <h3>User Roles</h3>
//                     <label>Manage User Roles:</label>
//                     <select name="userRoles" multiple onChange={handleChange}>
//                         <option value="Admin">Admin</option>
//                         <option value="Cashier">Cashier</option>
//                         <option value="Manager">Manager</option>
//                     </select>
//                 </div>

//                 {/* Save Button */}
//                 <button type="submit" className="save-button">Save Settings</button>
//             </form>

//             <style>
//                 {`
//                 .settings-container {
//     max-width: 600px;
//     margin: 40px auto;
//     padding: 20px;
//     background-color: #fff;
//     border-radius: 8px;
//     box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
// }

// h1 {
//     text-align: center;
//     color: #333;
// }

// .settings-form {
//     display: flex;
//     flex-direction: column;
//     gap: 20px;
// }

// .settings-section {
//     padding: 15px;
//     border-radius: 6px;
//     background-color: #f9f9f9;
//     box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
// }

// h3 {
//     margin-bottom: 10px;
//     color: #555;
// }

// label {
//     display: block;
//     font-weight: bold;
//     margin-bottom: 5px;
// }

// input, select {
//     width: 100%;
//     padding: 8px;
//     margin-bottom: 10px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
// }

// select {
//     cursor: pointer;
// }

// .save-button {
//     background-color: #28a745;
//     color: white;
//     padding: 10px;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     font-size: 16px;
// }

// .save-button:hover {
//     background-color: #218838;
// }

//                 `}
//             </style>
//         </div>
//     );
// };

// export default StorePOSSettingsPage;
