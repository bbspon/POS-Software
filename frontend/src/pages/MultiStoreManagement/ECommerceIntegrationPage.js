import React from "react";

const features = [
  { title: "Real-Time Inventory Sync", description: "Keep stock levels updated automatically." },
  { title: "Unified Customer Data", description: "Track customer purchases across all channels." },
  { title: "Automated Order Processing", description: "Streamline order management and reduce errors." },
  { title: "Comprehensive Reports", description: "Get insights into sales performance and trends." },
  { title: "Multi-Channel Sales", description: "Sell seamlessly across online and offline stores." },
  { title: "Secure Payment Processing", description: "Ensure safe transactions with integrated payment gateways." },
];

const steps = [
  "Evaluate Your Current POS and E-Commerce Platform",
  "Define Integration Goals",
  "Choose the Best Integration Method (API, Middleware, or Extensions)",
  "Develop and Test the Integration",
  "Train Your Team on the New System",
  "Monitor and Optimize for Efficiency",
];

const EcommerceIntegration = () => {
  return (
    <div className="integration-container">
      <h1 className="integration-title">E-Commerce POS Integration</h1>
      <p className="integration-subtitle">
        Seamlessly connect your eCommerce platform with a POS system for better inventory, sales, and customer management.
      </p>

      {/* Features Section */}
      <div className="integration-features">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <h2 className="feature-title">{feature.title}</h2>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Steps Section */}
      <div className="integration-steps">
        <h2 className="steps-title">Steps to Integrate POS with E-Commerce</h2>
        <ul className="steps-list">
          {steps.map((step, index) => (
            <li key={index} className="step-item">{step}</li>
          ))}
        </ul>
      </div>
      <style>
        {`
        /* General Styling */
.integration-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.integration-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.integration-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
}

/* Features Section */
.integration-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.feature-card {
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-title {
  font-size: 1.3rem;
  color: #222;
  margin-bottom: 5px;
}

.feature-description {
  font-size: 1rem;
  color: #555;
}

/* Steps Section */
.integration-steps {
  margin-top: 40px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.steps-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.steps-list {
  list-style-type: decimal;
  padding-left: 20px;
  text-align: left;
}

.step-item {
  font-size: 1.1rem;
  background: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .integration-title {
    font-size: 2rem;
  }

  .integration-subtitle {
    font-size: 1rem;
  }

  .feature-title {
    font-size: 1.1rem;
  }

  .feature-description {
    font-size: 0.9rem;
  }

  .steps-title {
    font-size: 1.6rem;
  }

  .step-item {
    font-size: 1rem;
  }
}
`}
      </style>
    </div>
  );
};

export default EcommerceIntegration;
