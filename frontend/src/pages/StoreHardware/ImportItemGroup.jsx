import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineDownload } from "react-icons/ai";
import Sidebar from "../../components/Sidebar";

const ImportItemGroup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [encoding, setEncoding] = useState("UTF-8 (Unicode)");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleReplace = () => {
    document.getElementById("fileInput").click();
  };

  const handleRemove = () => {
    setSelectedFile(null);
  };

  const handleDownloadSample = () => {
    const rows = [
      ["ItemGroupName", "Description", "ParentGroup", "TaxPercentage"],
      ["Electronics", "Electronic items", "Products", "18"],
      ["Mobile Phones", "Smartphones", "Electronics", "12"],
    ];

    const csvContent = rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "sample_item_groups.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="d-flex flex-row vh-100 vw-100 bg-light">
        <Sidebar />

        <div className="flex-grow-1 p-3 p-md-5" style={{ overflowY: "auto", margin: "5rem 0" }}>
          <h4 className="text-center fw-semibold mb-4">Item Group - Select File</h4>

          {/* Stepper */}
          <div className="d-flex justify-content-center mb-4">
            <div className="d-flex align-items-center">
              <div className="step active">1</div>
              <span className="mx-2 fw-semibold">Configure</span>
            </div>
            <div className="mx-3">—</div>
            <div className="d-flex align-items-center text-muted">
              <div className="step">2</div>
              <span className="mx-2">Map Fields</span>
            </div>
            <div className="mx-3">—</div>
            <div className="d-flex align-items-center text-muted">
              <div className="step">3</div>
              <span className="mx-2">Preview</span>
            </div>
          </div>

          {/* File Upload Box */}
          <div className="border rounded p-4 text-center" style={{ backgroundColor: "#f9f9f9" }}>
            <Form.Group controlId="formFile" className="mb-3 d-none">
              <Form.Control type="file" id="fileInput" onChange={handleFileChange} />
            </Form.Group>

            {!selectedFile ? (
              <div onClick={handleReplace} style={{ cursor: "pointer" }}>
                <AiOutlineDownload
                  className="me-1 mb-1"
                  style={{
                    fontSize: "60px",
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "50%",
                  }}
                />
                <h2>Drag and drop file to import</h2>
                <div className="mt-2 fw-semibold">Click to upload a file</div>
              </div>
            ) : (
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                  alt="file-icon"
                  style={{ height: "60px", marginBottom: "10px" }}
                />
                <div className="fw-bold mb-2">{selectedFile.name}</div>
                <Button variant="outline-primary" size="sm" onClick={handleReplace} className="me-2">
                  Replace File
                </Button>
                <Button variant="link" className="text-danger p-0" onClick={handleRemove}>
                  <FaTrashAlt className="me-1" />
                  Remove
                </Button>
              </div>
            )}

            <div className="mt-2 text-muted small">
              Maximum File Size: <b>25 MB</b> • File Format: <b>CSV</b>, <b>TSV</b>, or <b>XLS</b>
            </div>
            <div className="mt-2">
              Download a{" "}
              <Button
                variant="link"
                className="p-0 fw-semibold"
                style={{ textDecoration: "none" }}
                onClick={handleDownloadSample}
              >
                sample CSV
              </Button>{" "}
              and compare it to your import file to ensure it’s perfect.
            </div>
          </div> 

          <div className="d-flex flex-row justify-content-between pt-4 px-3">
           
              <span>Duplicate Handling: </span>
          

          <div>
              <div>
              <div className="d-flex align-items-center gap-2"><input type="checkbox" />
              <span className="fw-semibold small">Skip Duplicates</span></div>
              <p className="mb-0 small">Retains the items in Zakya and does not import the duplicates in the import file.</p>
            </div>

               <div className="mt-2">
              <div className="d-flex align-items-center gap-2" ><input type="checkbox" />
              <span className="fw-semibold small">Overwrite items</span></div>
              <p className="mb-0 small">Imports the duplicates in the import file and overwrites the existing items in Zakya.</p>
            </div>
          </div>
          </div>

          {/* Character Encoding */}
          <div className="mt-4">
            <Form.Label className="fw-semibold">Character Encoding</Form.Label>
            <Form.Select value={encoding} onChange={(e) => setEncoding(e.target.value)} className="w-auto">
              <option>UTF-8 (Unicode)</option>
              <option>UTF-16</option>
              <option>ISO-8859-1</option>
               <option>ISO-8859-2</option>
                <option>ISO-8859-9(Turkish) </option>
                <option>GB2321(simplified Chinese)</option>
                <option>Big5 (traditional Chinese) </option>
                <option>Shift-JIS (Japanese)</option>
            </Form.Select>
          </div>

          {/* Page Tips */}
          <div className="mt-4 bg-light rounded p-3">
            <h6 className="mb-2">💡 Page Tips</h6>
            <ul className="mb-0">
              <li>Import data with GST Treatment details by referring to the sample</li>
              <li>Convert unsupported file types using any online converter</li>
              <li>You can configure and save import settings for future use</li>
            </ul>
          </div>

          {/* Footer Buttons */}
          <div className="d-flex justify-content-between mt-5">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Next &gt;</Button>
          </div>

          {/* Step Style */}
          <style>{`
            .step {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background-color: #e9ecef;
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: 600;
            }
            .step.active {
              background-color: #007bff;
              color: white;
            }
          `}</style>
        </div>
      </div>
    </>
  );
};

export default ImportItemGroup;
