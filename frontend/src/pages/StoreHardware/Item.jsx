import React, { useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Badge,
} from "react-bootstrap";
import { FaImage, FaPlus, FaTimes } from "react-icons/fa";
import { BsQuestionOctagon } from "react-icons/bs";
import Sidebar from "../../components/Sidebar";
import axios from "axios"; // uses baseURL + auth header
import api from "../../services/axiosInstance";
const emptyKV = () => ({ key: "", value: "" });
const emptyColor = () => ({ name: "", img: "" });
const emptyReview = () => ({
  rating: 0,
  title: "",
  comment: "",
  reviewer: "",
  location: "",
  date: "",
  likes: 0,
  dislikes: 0,
});

export default function Itemspage() {
  // BASIC
  const [type, setType] = useState("Goods"); // UI only
  const [name, setName] = useState("");
  const [SKU, setSKU] = useState("");
  const [unit, setUnit] = useState(""); // stored into specs
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [brand, setBrand] = useState("");
  const [returnable, setReturnable] = useState(false); // stored into specs

  // PRICE / STOCK
  const [sellingPrice, setSellingPrice] = useState(""); // priceInfo.sale
  const [mrp, setMrp] = useState("");
  const [discountText, setDiscountText] = useState("");
  const [stock, setStock] = useState("");
  const [costPrice, setCostPrice] = useState(""); // stored into specs

  // DETAILS
  const [description, setDescription] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [dimUnit, setDimUnit] = useState("cm"); // specs
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg"); // specs
  const [manufacturer, setManufacturer] = useState("");
  const [preferredVendor, setPreferredVendor] = useState("");
  const [sellerId, setSellerId] = useState(""); // DB seller_id

  // IDENTIFIERS (stored inside specs[])
  const [UPC, setUPC] = useState("");
  const [MPN, setMPN] = useState("");
  const [EAN, setEAN] = useState("");
  const [ISBN, setISBN] = useState("");

  // INVENTORY meta (stored in specs)
  const [inventoryAccount, setInventoryAccount] = useState("");
  const [openingStock, setOpeningStock] = useState("");
  const [reorderPoint, setReorderPoint] = useState("");
  const [openingRate, setOpeningRate] = useState("");

  // TAGS / SPECS
  const [tagsText, setTagsText] = useState("");
  const [specs, setSpecs] = useState([emptyKV()]);

  // FLAGS
  const [isVariant, setIsVariant] = useState(false);
  const [isReview, setIsReview] = useState(false);
  const [gstInvoice, setGstInvoice] = useState(false);
  const [deliveryIn1Day, setDeliveryIn1Day] = useState(false);
  const [assured, setAssured] = useState(false);
  const [bestseller, setBestseller] = useState(false);
  const [ram, setRam] = useState("");

  // UI section
  const [sellerName, setSellerName] = useState("");
  const [sellerRating, setSellerRating] = useState("");
  const [sellerReviewsCount, setSellerReviewsCount] = useState("");
  const [offers, setOffers] = useState([]);
  const [offerText, setOfferText] = useState("");
  const [highlights, setHighlights] = useState([]);
  const [highlightText, setHighlightText] = useState("");
  const [sizes, setSizes] = useState([]);
  const [sizeText, setSizeText] = useState("");
  const [colorOptions, setColorOptions] = useState([emptyColor()]);
  const [reviews, setReviews] = useState([]); // optional, advanced

  // MEDIA
  const [productImgFile, setProductImgFile] = useState(null);
  const [productImgUrl, setProductImgUrl] = useState(""); // allow URL
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryUrlsText, setGalleryUrlsText] = useState("");

  // helpers
  const addSpec = () => setSpecs((x) => [...x, emptyKV()]);
  const removeSpec = (i) => setSpecs((x) => x.filter((_, idx) => idx !== i));

  const addColor = () => setColorOptions((x) => [...x, emptyColor()]);
  const removeColor = (i) =>
    setColorOptions((x) => x.filter((_, idx) => idx !== i));

  const addOffer = () => {
    if (offerText.trim()) {
      setOffers((x) => [...x, offerText.trim()]);
      setOfferText("");
    }
  };
  const removeOffer = (i) => setOffers((x) => x.filter((_, idx) => idx !== i));

  const addHighlight = () => {
    if (highlightText.trim()) {
      setHighlights((x) => [...x, highlightText.trim()]);
      setHighlightText("");
    }
  };
  const removeHighlight = (i) =>
    setHighlights((x) => x.filter((_, idx) => idx !== i));

  const addSize = () => {
    if (sizeText.trim()) {
      setSizes((x) => [...x, sizeText.trim()]);
      setSizeText("");
    }
  };
  const removeSize = (i) => setSizes((x) => x.filter((_, idx) => idx !== i));

  // build specs from “extra UI” so we don’t lose any of your existing fields
  const mergedSpecs = useMemo(() => {
    const base = [
      { key: "Unit", value: unit },
      { key: "Returnable", value: String(returnable) },
      { key: "Manufacturer", value: manufacturer },
      { key: "PreferredVendor", value: preferredVendor },
      { key: "UPC", value: UPC },
      { key: "MPN", value: MPN },
      { key: "EAN", value: EAN },
      { key: "ISBN", value: ISBN },
      { key: "CostPriceINR", value: costPrice },
      { key: "InventoryAccount", value: inventoryAccount },
      { key: "OpeningStock", value: openingStock },
      { key: "ReorderPoint", value: reorderPoint },
      { key: "OpeningRatePerUnit", value: openingRate },
      { key: "DimensionUnit", value: dimUnit },
      { key: "WeightUnit", value: weightUnit },
      // free-form extra specs
      ...specs.filter((s) => s.key?.trim()),
    ];
    return base.filter((s) => String(s.value).trim() !== "");
  }, [
    unit,
    returnable,
    manufacturer,
    preferredVendor,
    UPC,
    MPN,
    EAN,
    ISBN,
    costPrice,
    inventoryAccount,
    openingStock,
    reorderPoint,
    openingRate,
    dimUnit,
    weightUnit,
    specs,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", name);
    fd.append("SKU", SKU);
    fd.append("brand", brand);
    fd.append("category_id", categoryId);
    fd.append("subcategory_id", subcategoryId);
    fd.append("stock", stock || 0);
    fd.append("description", description || "");

    fd.append("weight", weight || 0);
    fd.append("length", length || 0);
    fd.append("width", width || 0);
    fd.append("height", height || 0);

    // pricing
    fd.append("price", sellingPrice || 0); // compatibility
    fd.append("mrp", mrp || 0);
    fd.append("sale", sellingPrice || 0);
    fd.append("discountText", discountText || "");

    // arrays
    if (tagsText.trim()) fd.append("tags", tagsText);
    if (offers.length)
      fd.append(
        "ui",
        JSON.stringify({
          seller: {
            name: sellerName || "",
            rating: Number(sellerRating || 0),
            reviewsCount: Number(sellerReviewsCount || 0),
          },
          offers,
          highlights,
          colorOptions,
          sizes,
          reviews, // optional
        })
      );
    else {
      fd.append(
        "ui",
        JSON.stringify({
          seller: {
            name: sellerName || "",
            rating: Number(sellerRating || 0),
            reviewsCount: Number(sellerReviewsCount || 0),
          },
          offers: [],
          highlights,
          colorOptions,
          sizes,
          reviews,
        })
      );
    }

    // flags
    fd.append("is_variant", isVariant);
    fd.append("is_review", isReview);
    fd.append("gstInvoice", gstInvoice);
    fd.append("deliveryIn1Day", deliveryIn1Day);
    fd.append("assured", assured);
    fd.append("bestseller", bestseller);
    fd.append("ram", ram || 0);
    if (sellerId) fd.append("seller_id", sellerId);

    // specs
    fd.append("specs", JSON.stringify(mergedSpecs));

    // media
    if (productImgFile) {
      fd.append("product_img", productImgFile);
    } else if (productImgUrl.trim()) {
      fd.append("product_img", productImgUrl.trim());
    }
    if (galleryFiles?.length) {
      [...galleryFiles].forEach((f) => fd.append("gallery_imgs", f));
    }
    if (galleryUrlsText.trim()) {
      // also allow adding URLs (comma sep)
      fd.append("gallery_imgs", galleryUrlsText.trim());
    }

    try {
      const { data } = await api.post("/api/items", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Item saved");
      console.log("Saved item", data);
    } catch (err) {
      console.error("Save failed", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Failed to save");
    }
  };

  return (
    <div className="d-flex flex-row vh-100 bg-light">
      <div className="d-none d-md-block bg-white shadow-sm vh-100">
        <Sidebar />
      </div>

      <div
        className="flex-grow-1"
        style={{ overflowY: "auto", margin: "6rem 10px" }}
      >
        <Container fluid className="bg-white rounded shadow-sm p-4">
          <h4 className="mb-4 border-bottom pb-2">New Item</h4>
          <Form onSubmit={handleSubmit}>
            {/* Top: image + basics */}
            <Row className="mb-4">
              <Col md={3}>
                <Form.Group className="border p-3 h-100">
                  <div className="text-center">
                    <FaImage size={32} />
                    <p className="mt-2 mb-2">
                      Drag image(s) here or
                      <label
                        className="text-primary ms-1"
                        style={{ cursor: "pointer" }}
                      >
                        Browse
                        <input
                          type="file"
                          hidden
                          onChange={(e) =>
                            setProductImgFile(e.target.files?.[0] || null)
                          }
                        />
                      </label>
                      <br />
                      <small className="text-muted">
                        Up to 15 images, max 5MB each, 7000×7000px
                      </small>
                    </p>
                    <Form.Control
                      type="text"
                      placeholder="or paste Product Image URL"
                      value={productImgUrl}
                      onChange={(e) => setProductImgUrl(e.target.value)}
                      className="mb-2"
                    />
                    <Form.Label>Gallery Images</Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      onChange={(e) => setGalleryFiles(e.target.files)}
                      className="mb-2"
                    />
                    <Form.Control
                      type="text"
                      placeholder="or paste gallery URLs, comma separated"
                      value={galleryUrlsText}
                      onChange={(e) => setGalleryUrlsText(e.target.value)}
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col md={9}>
                <Row className="mb-3 align-items-center">
                  <Form.Label column md={2}>
                    Type <BsQuestionOctagon />
                  </Form.Label>
                  <Col md={10}>
                    <Form.Check
                      inline
                      type="radio"
                      label="Goods"
                      name="type"
                      checked={type === "Goods"}
                      onChange={() => setType("Goods")}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Service"
                      name="type"
                      checked={type === "Service"}
                      onChange={() => setType("Service")}
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Form.Label column md={2}>
                    Name*
                  </Form.Label>
                  <Col md={10}>
                    <Form.Control
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter item name"
                      required
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Form.Label column md={2}>
                    SKU* <BsQuestionOctagon />
                  </Form.Label>
                  <Col md={10}>
                    <Form.Control
                      value={SKU}
                      onChange={(e) => setSKU(e.target.value)}
                      placeholder="Enter SKU"
                      required
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Form.Label column md={2}>
                    Unit <BsQuestionOctagon />
                  </Form.Label>
                  <Col md={10}>
                    <Form.Control
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      placeholder="Enter unit"
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Form.Label column md={2}>
                    Category
                  </Form.Label>
                  <Col md={5}>
                    <Form.Control
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      placeholder="Category ObjectId"
                    />
                  </Col>
                  <Form.Label column md={2}>
                    Subcategory
                  </Form.Label>
                  <Col md={3}>
                    <Form.Control
                      value={subcategoryId}
                      onChange={(e) => setSubcategoryId(e.target.value)}
                      placeholder="Subcategory ObjectId"
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Form.Label column md={2}>
                    Brand
                  </Form.Label>
                  <Col md={10}>
                    <Form.Control
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      placeholder="Select or Add Brand"
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={{ span: 10, offset: 2 }}>
                    <Form.Check
                      label="Returnable Item"
                      checked={returnable}
                      onChange={(e) => setReturnable(e.target.checked)}
                      inline
                    />
                    <BsQuestionOctagon />
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Dimensions & branding */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Label>Dimensions</Form.Label>
                <InputGroup className="mb-1">
                  <Form.Control
                    placeholder="L"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                  />
                  <Form.Control
                    placeholder="W"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                  />
                  <Form.Control
                    placeholder="H"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                  <Form.Select
                    style={{ maxWidth: "80px" }}
                    value={dimUnit}
                    onChange={(e) => setDimUnit(e.target.value)}
                  >
                    <option>cm</option>
                    <option>in</option>
                  </Form.Select>
                </InputGroup>
                <small className="text-muted">Length × Width × Height</small>
              </Col>
              <Col md={6}>
                <Form.Label>Weight</Form.Label>
                <InputGroup>
                  <Form.Control
                    placeholder="Weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  <Form.Select
                    style={{ maxWidth: "80px" }}
                    value={weightUnit}
                    onChange={(e) => setWeightUnit(e.target.value)}
                  >
                    <option>kg</option>
                    <option>g</option>
                    <option>lbs</option>
                    <option>oz</option>
                  </Form.Select>
                </InputGroup>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Manufacturer</Form.Label>
                  <Form.Control
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    placeholder="Select or Add Manufacturer"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Preferred Vendor</Form.Label>
                  <Form.Control
                    value={preferredVendor}
                    onChange={(e) => setPreferredVendor(e.target.value)}
                    placeholder="Select or Add Vendor"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              {[
                ["UPC", UPC, setUPC],
                ["MPN", MPN, setMPN],
                ["EAN", EAN, setEAN],
                ["ISBN", ISBN, setISBN],
              ].map(([label, val, setter], i) => (
                <Col md={6} key={i}>
                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-items-center gap-2">
                      {label} <BsQuestionOctagon />
                    </Form.Label>
                    <Form.Control
                      value={val}
                      onChange={(e) => setter(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              ))}
            </Row>

            {/* Sales & Purchase */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Check
                  type="checkbox"
                  label="Sales Information"
                  className="mb-2 fw-bold"
                  defaultChecked
                />
                <Form.Group className="mb-3">
                  <Form.Label>Selling Price (INR)</Form.Label>
                  <InputGroup>
                    <span className="input-group-text">INR</span>
                    <Form.Control
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>MRP</Form.Label>
                  <Form.Control
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Discount Text</Form.Label>
                  <Form.Control
                    placeholder="e.g., 10% off"
                    value={discountText}
                    onChange={(e) => setDiscountText(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-danger">Account*</Form.Label>
                  <Form.Select>
                    <option>Sales</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Check
                  type="checkbox"
                  label="Purchase Information"
                  className="mb-2 fw-bold"
                />
                <Form.Group className="mb-3">
                  <Form.Label>Cost Price (INR)*</Form.Label>
                  <InputGroup>
                    <span className="input-group-text">INR</span>
                    <Form.Control
                      value={costPrice}
                      onChange={(e) => setCostPrice(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-danger">Account*</Form.Label>
                  <Form.Select>
                    <option>Cost of Goods Sold</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Seller (Vendor) ID</Form.Label>
                  <Form.Control
                    placeholder="Mongo ObjectId of vendor"
                    value={sellerId}
                    onChange={(e) => setSellerId(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={6} className="mt-4">
                <Form.Check
                  type="checkbox"
                  label="Track Inventory for this item"
                  className="mb-2 fw-bold"
                  defaultChecked
                />
                <p className="px-4 vw-100">
                  You cannot enable/disable inventory tracking once you’ve
                  created transactions for this item
                </p>
                <Form.Group className="mb-3">
                  <Form.Label>Inventory Account*</Form.Label>
                  <Form.Select
                    value={inventoryAccount}
                    onChange={(e) => setInventoryAccount(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option>Finished Goods</option>
                    <option>Inventory Asset</option>
                    <option>Work In Progress</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Opening Stock</Form.Label>
                  <Form.Control
                    value={openingStock}
                    onChange={(e) => setOpeningStock(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Reorder Point</Form.Label>
                  <Form.Control
                    value={reorderPoint}
                    onChange={(e) => setReorderPoint(e.target.value)}
                  />
                </Form.Group>
                <Row className="mt-4">
                  <Form.Group>
                    <Form.Label>Opening Stock Rate per Unit</Form.Label>
                    <Form.Control
                      value={openingRate}
                      onChange={(e) => setOpeningRate(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Row className="mt-4">
                  <Form.Group as={Col}>
                    <Form.Label>Stock (Qty)</Form.Label>
                    <Form.Control
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </Form.Group>
                </Row>
              </Col>
            </Row>

            {/* Flags & Tags */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Check
                  type="switch"
                  id="isVariant"
                  label="Has Variants"
                  checked={isVariant}
                  onChange={(e) => setIsVariant(e.target.checked)}
                />
                <Form.Check
                  type="switch"
                  id="isReview"
                  label="Allow Reviews"
                  checked={isReview}
                  onChange={(e) => setIsReview(e.target.checked)}
                />
                <Form.Check
                  type="switch"
                  id="gst"
                  label="GST Invoice"
                  checked={gstInvoice}
                  onChange={(e) => setGstInvoice(e.target.checked)}
                />
                <Form.Check
                  type="switch"
                  id="deliver1"
                  label="Delivery in 1 Day"
                  checked={deliveryIn1Day}
                  onChange={(e) => setDeliveryIn1Day(e.target.checked)}
                />
                <Form.Check
                  type="switch"
                  id="assured"
                  label="Assured"
                  checked={assured}
                  onChange={(e) => setAssured(e.target.checked)}
                />
                <Form.Check
                  type="switch"
                  id="bestseller"
                  label="Bestseller"
                  checked={bestseller}
                  onChange={(e) => setBestseller(e.target.checked)}
                />
                <Form.Group className="mt-3">
                  <Form.Label>RAM (if applicable)</Form.Label>
                  <Form.Control
                    value={ram}
                    onChange={(e) => setRam(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Tags (comma separated)</Form.Label>
                  <Form.Control
                    placeholder="rice, basmati, 5kg"
                    value={tagsText}
                    onChange={(e) => setTagsText(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Specs editor */}
            <Row className="mb-4">
              <Col>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Form.Label className="m-0">Extra Specifications</Form.Label>
                  <Button size="sm" variant="outline-primary" onClick={addSpec}>
                    <FaPlus /> Add Row
                  </Button>
                </div>
                {specs.map((s, idx) => (
                  <Row key={idx} className="mb-2">
                    <Col md={5}>
                      <Form.Control
                        placeholder="Key"
                        value={s.key}
                        onChange={(e) =>
                          setSpecs((v) =>
                            v.map((x, i) =>
                              i === idx ? { ...x, key: e.target.value } : x
                            )
                          )
                        }
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        placeholder="Value"
                        value={s.value}
                        onChange={(e) =>
                          setSpecs((v) =>
                            v.map((x, i) =>
                              i === idx ? { ...x, value: e.target.value } : x
                            )
                          )
                        }
                      />
                    </Col>
                    <Col md={1} className="d-flex align-items-center">
                      <Button variant="link" onClick={() => removeSpec(idx)}>
                        <FaTimes />
                      </Button>
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>

            {/* UI seller and marketing */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Label>Seller Card</Form.Label>
                <Row className="mb-2">
                  <Col>
                    <Form.Control
                      placeholder="Seller Name"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}>
                    <Form.Control
                      placeholder="Seller Rating"
                      value={sellerRating}
                      onChange={(e) => setSellerRating(e.target.value)}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      placeholder="Reviews Count"
                      value={sellerReviewsCount}
                      onChange={(e) => setSellerReviewsCount(e.target.value)}
                    />
                  </Col>
                </Row>

                <Form.Label className="mt-3">Offers</Form.Label>
                <InputGroup className="mb-2">
                  <Form.Control
                    placeholder="Add offer text"
                    value={offerText}
                    onChange={(e) => setOfferText(e.target.value)}
                  />
                  <Button onClick={addOffer}>Add</Button>
                </InputGroup>
                <div className="mb-2">
                  {offers.map((o, i) => (
                    <Badge key={i} bg="light" text="dark" className="me-2 mb-2">
                      {o}{" "}
                      <FaTimes role="button" onClick={() => removeOffer(i)} />
                    </Badge>
                  ))}
                </div>

                <Form.Label className="mt-3">Highlights</Form.Label>
                <InputGroup className="mb-2">
                  <Form.Control
                    placeholder="Add highlight"
                    value={highlightText}
                    onChange={(e) => setHighlightText(e.target.value)}
                  />
                  <Button onClick={addHighlight}>Add</Button>
                </InputGroup>
                <div className="mb-2">
                  {highlights.map((o, i) => (
                    <Badge key={i} bg="info" className="me-2 mb-2">
                      {o}{" "}
                      <FaTimes
                        role="button"
                        onClick={() => removeHighlight(i)}
                      />
                    </Badge>
                  ))}
                </div>

                <Form.Label className="mt-3">Sizes</Form.Label>
                <InputGroup className="mb-2">
                  <Form.Control
                    placeholder="Add size (e.g., 1kg, 5kg)"
                    value={sizeText}
                    onChange={(e) => setSizeText(e.target.value)}
                  />
                  <Button onClick={addSize}>Add</Button>
                </InputGroup>
                <div className="mb-2">
                  {sizes.map((o, i) => (
                    <Badge key={i} bg="secondary" className="me-2 mb-2">
                      {o}{" "}
                      <FaTimes role="button" onClick={() => removeSize(i)} />
                    </Badge>
                  ))}
                </div>
              </Col>

              <Col md={6}>
                <Form.Label>Color Options</Form.Label>
                {colorOptions.map((c, idx) => (
                  <Row key={idx} className="mb-2">
                    <Col md={4}>
                      <Form.Control
                        placeholder="Name"
                        value={c.name}
                        onChange={(e) =>
                          setColorOptions((v) =>
                            v.map((x, i) =>
                              i === idx ? { ...x, name: e.target.value } : x
                            )
                          )
                        }
                      />
                    </Col>
                    <Col md={7}>
                      <Form.Control
                        placeholder="Image URL"
                        value={c.img}
                        onChange={(e) =>
                          setColorOptions((v) =>
                            v.map((x, i) =>
                              i === idx ? { ...x, img: e.target.value } : x
                            )
                          )
                        }
                      />
                    </Col>
                    <Col md={1} className="d-flex align-items-center">
                      <Button variant="link" onClick={() => removeColor(idx)}>
                        <FaTimes />
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Button size="sm" variant="outline-primary" onClick={addColor}>
                  <FaPlus /> Add Color
                </Button>
              </Col>
            </Row>

            <div className="text-end">
              <Button type="submit" variant="primary">
                Save
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="ms-2"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
}
