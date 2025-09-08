import React ,{ useState } from 'react'
import {
  Container,
  Dropdown,
 
  Form,
  Button,
  ButtonGroup,
  
} from "react-bootstrap";
import Navbar from '../../../components/Navbar';
function Gereral() {

    //Gernal
    const [stockMode, setStockMode] = useState("physical");
    const [addressFormat, setAddressFormat] = useState(
      `
      \${CONTACT.CONTACT_DISPLAYNAME},
  \${CONTACT.CONTACT_ADDRESS},
  \${CONTACT.CONTACT_CITY},
  \${CONTACT.CONTACT_CODE}, \${CONTACT.CONTACT_STATE}
  \${CONTACT.CONTACT_COUNTRY}`
    );
      const handleModeChange = (e) => {
    setStockMode(e.target.value);
  };
  return (
   <>
               <div className='d-flex flex-row vh-100 bg-light p-2'>
                {/* <Navbar /> */}
              <div className="col-sm-9 px-2">
                  <h5 className="border-bottom pb-2 ">General</h5>

                  <div className="px-3">
                    <label className="form-label fw-bold mt-3">
                      Select the modules you would like to enable.
                    </label>

                    <div className="mt-3">
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="deliveryChallans"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="deliveryChallans"
                        >
                          Delivery Challans
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="picklists"
                        />
                        <label className="form-check-label" htmlFor="picklists">
                          Picklists
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="px-3">
                    <label className="form-label fw-bold mt-3">
                      PDF Attachment
                    </label>

                    <div className="mt-3">
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="deliveryChallans"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="deliveryChallans"
                        >
                          Attach an invoice PDF to email notifications which
                          contain invoice payment links.
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="picklists"
                        />
                        <label className="form-check-label" htmlFor="picklists">
                          I would like to encrypt the PDF files that I send.
                        </label>
                      </div>
                      <span className="text-muted px-4">
                        This will ensure that the PDF files cannot be edited or
                        converted into another file format
                      </span>
                    </div>
                  </div>

                  <div className="px-3">
                    <label className="form-label fw-bold mt-3">
                      Do you give discounts?
                    </label>

                    <div className="mt-3">
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="deliveryChallans"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="deliveryChallans"
                        >
                          I don't give discounts
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="picklists"
                        />
                        <label className="form-check-label" htmlFor="picklists">
                          At Line Item Level
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="picklists"
                        />
                        <label className="form-check-label" htmlFor="picklists">
                          At Transaction Level
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="px-3">
                    <label className="form-label fw-bold mt-3">
                      Select any additional charges you'll like to add
                    </label>

                    <div className="mt-3">
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="deliveryChallans"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="deliveryChallans"
                        >
                          Adjustments
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="picklists"
                        />
                        <label className="form-check-label" htmlFor="picklists">
                          Shipping Charges
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="px-3">
                    <label className="form-label fw-bold mt-3">
                      Rounding off in Sales Transactions
                    </label>

                    <div
                      className="mt-3 "
                      style={{
                        borderBottom: "1px solid #ccc",
                        paddingBottom: "10px",
                      }}
                    >
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="deliveryChallans"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="deliveryChallans"
                        >
                          No Rounding
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="picklists"
                        />
                        <label className="form-check-label" htmlFor="picklists">
                          Round off the total to the nearest whole number
                        </label>
                      </div>
                    </div>
                  </div>

                  <div
                    className="px-3 mt-3"
                    style={{
                      borderBottom: "1px solid #ccc",
                      paddingBottom: "10px",
                    }}
                  >
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="deliveryChallans"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="deliveryChallans"
                      >
                        I want to add a field for salesperson
                      </label>
                    </div>
                  </div>

                  <div className="p-4">
                    <h5 className="mb-3">Mode of Stock Tracking</h5>
                    <Form>
                      <div className="mb-3">
                        <Form.Check
                          type="radio"
                          id="physical-stock"
                          name="stockMode"
                          value="physical"
                          checked={stockMode === "physical"}
                          onChange={handleModeChange}
                          label="Physical Stock - The stock on hand will be calculated based on Receives & Shipments"
                        />
                        <Form.Check
                          type="radio"
                          id="accounting-stock"
                          name="stockMode"
                          value="accounting"
                          onChange={handleModeChange}
                          label="Accounting Stock - The stock on hand will be calculated based on Bills & Invoices"
                        />
                      </div>

                      {stockMode === "physical" && (
                        <div className="alert alert-warning py-2">
                          The physical stock gets updated automatically when you
                          raise <strong>standalone bills and invoices.</strong>{" "}
                          <span
                            className="text-primary"
                            style={{ cursor: "pointer" }}
                          >
                            Change
                          </span>
                        </div>
                      )}

                      <hr />

                      <div className="mb-3">
                        <h5>
                          Organization Address Format{" "}
                          <small className="text-muted">
                            (Displayed in PDF only)
                          </small>
                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <Dropdown as={ButtonGroup}>
                            <Button variant="light" disabled>
                              Insert Placeholders
                            </Button>
                            <Dropdown.Toggle split variant="light" />
                            <Dropdown.Menu>
                              <Dropdown.Item>
                                ${"{ORGANIZATION.NAME}"}
                              </Dropdown.Item>
                              <Dropdown.Item>
                                ${"{ORGANIZATION.ADDRESS}"}
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                          <Button variant="link" className="p-0">
                            Preview
                          </Button>
                        </div>
                        <Form.Control
                          as="textarea"
                          rows={6}
                          value={addressFormat}
                          onChange={(e) => setAddressFormat(e.target.value)}
                        />
                      </div>

                      <Button variant="primary">Save</Button>
                    </Form>
                  </div>
                </div>
               </div>
              
   </>
  )
}

export default Gereral