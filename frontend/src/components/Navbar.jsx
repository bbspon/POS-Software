import React from "react";
import {
  Container,
  Dropdown,
  Row,
  Col,
  Nav,
  Tab,
  Form,
  Button,
  ButtonGroup,
  Table,
  Badge,
} from "react-bootstrap";

function Navbar() {
  return (
    <>
      <div style={{ height: "100%", width: "350px", overflow: "auto" }}>
        <Nav variant="pills" className="flex-column px-3">
          <h5 className="px-3">Preferences</h5>
          <Nav.Link>General</Nav.Link>
          <Nav.Link> Customers and Vendors </Nav.Link>
          <Nav.Link>Transaction Number Series</Nav.Link>
          <hr />

          <h6 className="text-muted px-2">ITEMS</h6>
          <Nav.Link>Items</Nav.Link>
          <Nav.Link>Inventory Adjustments</Nav.Link>

          <h6 className="text-muted px-2 mt-3">SALES</h6>
          <Nav.Link>Sales Orders</Nav.Link>
          <Nav.Link>Packages</Nav.Link>
          <Nav.Link>Shipments</Nav.Link>
          <Nav.Link>Delivery Challans</Nav.Link>
          <Nav.Link>Invoices</Nav.Link>
          <Nav.Link>Payments Received</Nav.Link>
          <Nav.Link>Sales Returns</Nav.Link>
          <Nav.Link>Credit Notes</Nav.Link>
          <h6 className="text-muted px-2 mt-3">PURCHASES</h6>
          <Nav.Link>Bills</Nav.Link>
          <Nav.Link>Payments Made</Nav.Link>
          <Nav.Link>Purchase Orders</Nav.Link>
          <Nav.Link>Purchase Receive</Nav.Link>
          <Nav.Link>Vendor Credits</Nav.Link>
        </Nav>

        <div
          className="mt-3"
          style={{
            border: "1px solid black ",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <h6 className="text-muted  mt-3 font-weight-bold">Custom Modules</h6>
          <p>
            You can now create Custom Modules with the required fields to cater
            to your business needs.
          </p>
          <a
            href=""
            className="text-primary"
            style={{
              textDecoration: "none",
              borderBottom: "1px solid black",
            }}
          >
            view more
          </a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
