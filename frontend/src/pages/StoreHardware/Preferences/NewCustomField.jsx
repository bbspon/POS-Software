// import React, { useState } from "react";

// const NewCustomField = () => {
//   const [labelName, setLabelName] = useState("");
//   const [dataType, setDataType] = useState("");
//   const [isMandatory, setIsMandatory] = useState(false);
//   const [showInPDF, setShowInPDF] = useState(false);

//   const handleSave = () => {
//     // Handle form save logic here
//     console.log({ labelName, dataType, isMandatory, showInPDF });
//   };

//   const handleCancel = () => {
//     setLabelName("");
//     setDataType("");
//     setIsMandatory(false);
//     setShowInPDF(false);
//   };

//   return (
//     <>
//     <div style={{ width: "50%", margin: "auto", border: "1px solid #eee", padding: "20px", borderRadius: "6px" }}>
//       <div style={{ borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
//         <h5>New Custom Field - Packages</h5>
//         <button style={{ border: "none", background: "none", fontSize: "20px", cursor: "pointer" }}>&times;</button>
//       </div>

//       <form>
//         <div className="mb-3">
//           <label className="form-label" style={{ color: "red" }}>
//             Label Name*
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             value={labelName}
//             onChange={(e) => setLabelName(e.target.value)}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label" style={{ color: "red" }}>
//             Data Type*
//           </label>
//           <select
//             className="form-select"
//             value={dataType}
//             onChange={(e) => setDataType(e.target.value)}
//           >
//             <option value="">Select</option>
//             <option value="text">Text</option>
//             <option value="number">Number</option>
//             <option value="date">Date</option>
//           </select>
//         </div>

//         <div className="mb-3">
//           <label className="form-label me-3">Is Mandatory</label>
//           <div>
//             <label className="me-3">
//               <input
//                 type="radio"
//                 name="mandatory"
//                 value="yes"
//                 onChange={() => setIsMandatory(true)}
//               />{" "}
//               Yes
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="mandatory"
//                 value="no"
//                 defaultChecked
//                 onChange={() => setIsMandatory(false)}
//               />{" "}
//               No
//             </label>
//           </div>
//         </div>

//         <div className="mb-3">
//           <label className="form-label me-3">Show in All PDFs</label>
//           <div>
//             <label className="me-3">
//               <input
//                 type="radio"
//                 name="pdf"
//                 value="yes"
//                 onChange={() => setShowInPDF(true)}
//               />{" "}
//               Yes
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="pdf"
//                 value="no"
//                 defaultChecked
//                 onChange={() => setShowInPDF(false)}
//               />{" "}
//               No
//             </label>
//           </div>
//         </div>

//         <div className="mt-4">
//           <button
//             type="button"
//             className="btn btn-primary me-2"
//             onClick={handleSave}
//           >
//             Save
//           </button>
//           <button
//             type="button"
//             className="btn btn-light border"
//             onClick={handleCancel}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//     </>
//   );
// };

// export default NewCustomField;


import React from 'react'

function NewCustomField() {
  return (
    <div>NewCustomField</div>
  )
}

export default NewCustomField