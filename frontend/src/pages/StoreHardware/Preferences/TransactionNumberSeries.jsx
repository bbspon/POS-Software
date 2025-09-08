import React ,{ useState } from 'react'
import { Button, Table, Form, Modal, Container, Row, Col} from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge';
import { FaStar } from 'react-icons/fa';

import { MdCancel } from "react-icons/md";



function TransactionNumberSeries() {
   const [transactionNumberSeries, setTransactionNumberSeries] = useState(true)
   const [newTransactionNumberSeries, setNewTransactionNumberSeries] = useState(false)

   const handleTransactionNumberSeriesOpen = () => {
      setTransactionNumberSeries(false)
      setNewTransactionNumberSeries(true)
   }

   const handleTransactionNumberSeriesClose = () => {
      setTransactionNumberSeries(true)
      setNewTransactionNumberSeries(false)
   }
  const [seriesName, setSeriesName] = useState("");
  const handleCancel = () => {
    setSeriesName("");
  };
  const getPreview = (prefix, start) => {
    return prefix + start;
  };

  const handleSave = () => {
    alert("Series Saved!");
    // Add save logic
  };
   const modulesData = [
  { module: "Credit Note", prefix: "CN-", startingNumber: "00001" },
  { module: "Customer Payment", prefix: "", startingNumber: "1" },
  { module: "Purchase Order", prefix: "PO-", startingNumber: "00001" },
  { module: "Sales Order", prefix: "SO-", startingNumber: "00001" },
  { module: "Vendor Payment", prefix: "", startingNumber: "1" },
  { module: "Vendor Credits", prefix: "DN-", startingNumber: "00001" },
  { module: "Bill Of Supply", prefix: "BOS-", startingNumber: "000001" },
  { module: "Invoice", prefix: "INV-", startingNumber: "000001" },
  { module: "Sales Return", prefix: "RET-", startingNumber: "00001" },
  { module: "Session", prefix: "SE-", startingNumber: "00001" },
];
  return (
<>
 {transactionNumberSeries && (
       <div className="d-flex flex-row vh-100 bg-light">
            
                <div
                  className="p-4 flex flex-row"
                  style={{ gap: "2rem", width: "100%" }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">Transaction Number Series</h5>
                    <Button variant="primary" onClick={handleTransactionNumberSeriesOpen} >+ New Series</Button>
                  </div>

                  <div className="mb-2 d-flex align-items-center gap-2">
                    <h6 className="mb-0">All Series</h6>
                    <Badge bg="secondary">1</Badge>
                  </div>

                  <Table bordered hover responsive>
                    <thead
                      style={{
                        backgroundColor: "#f9fafb",
                        borderBottom: "1px solid #ccc",
                        fontSize: "12px",
                      }}
                    >
                      <tr>
                        <th>SERIES NAME</th>
                        <th>SALES RETURN</th>
                        <th>SESSION</th>
                        <th>VENDOR PAYMENT</th>
                        <th>VENDOR CREDITS</th>
                        <th>PURCHASE ORDER</th>
                        <th>CREDIT NOTE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <a
                            href="#"
                            className="text-primary text-decoration-none d-flex align-items-start gap-1"
                          >
                            Default Transaction Series
                          </a>{" "}
                          <FaStar className="text-warning" />
                        </td>
                        <td>RET-00001</td>
                        <td>SE-00001</td>
                        <td>1</td>
                        <td>DN-00001</td>
                        <td>PO-00001</td>
                        <td>CN-00001</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              
    </div>

 )}

 {newTransactionNumberSeries && (
       <div className="d-flex flex-row vh-100 bg-light">
        <div className="container mt-1" >
           <div className="bg-white shadow rounded p-2 px-3" >
                   <div className="d-flex justify-content-between ">
            <h4>New Series</h4>  
             <MdCancel style={{ fontSize: "30px" }} onClick={handleTransactionNumberSeriesClose}/>
          </div>

          <Form.Group className="mb-3 mt-3 font-d">
            <Form.Label style={{ color: "red" }}>Series Name*</Form.Label>

            <Form.Control
              type="text"
              placeholder=""
              value={seriesName}
              onChange={(e) => setSeriesName(e.target.value)}
            />
          </Form.Group>

          <Table bordered className="mt-3">
            <thead style={{ backgroundColor: "#f8f9fa" }}>
              <tr>
                <th>MODULE</th>
                <th>PREFIX</th>
                <th>STARTING NUMBER</th>
                <th>PREVIEW</th>
              </tr>
            </thead>
            <tbody>
              {modulesData.map((item, index) => (
                <tr key={index}>
                  <td>{item.module}</td>
                  <td>{item.prefix}</td>
                  <td>{item.startingNumber}</td>
                  <td>{getPreview(item.prefix, item.startingNumber)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-start gap-2 mt-3 mb-3">
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="light" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
           </div>
        </div>
      </div>
 )}
</>
  )
}

export default TransactionNumberSeries