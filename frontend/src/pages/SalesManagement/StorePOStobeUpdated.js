import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-reader';

const StorePOStobeUpdated = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [onlineOrders, setOnlineOrders] = useState([]);
    const [lowStockAlerts, setLowStockAlerts] = useState([]);
    const [userRole, setUserRole] = useState('cashier'); // Example roles: cashier, manager, admin

    useEffect(() => {
        fetchProducts();
        fetchOnlineOrders();
    }, []);

    const fetchProducts = () => {
        // Mock API response
        const productData = [
            { id: '1001', name: 'Tomato', price: 1.5, stock: 5, barcode: '1234567890', qrCode: 'tomato_qr' },
            { id: '1002', name: 'Apple', price: 2.0, stock: 2, barcode: '0987654321', qrCode: 'apple_qr' },
        ];
        setProducts(productData);

        // Automatically trigger low-stock alerts
        const lowStockItems = productData.filter((product) => product.stock < 5);
        setLowStockAlerts(lowStockItems);
    };

    const fetchOnlineOrders = () => {
        // Mock API response (replace with actual API call)
        const orders = [
            { id: 'O1', customer: 'John Doe', total: 50, status: 'Pending' },
            { id: 'O2', customer: 'Jane Smith', total: 100, status: 'Completed' },
        ];
        setOnlineOrders(orders);
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const handleRefund = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
        alert('Refund processed successfully.');
    };

    return (
        <div className="store-pos-landing-page">
            <header className="page-header">Store POS with Full Integration</header>

            {/* Role-based access control */}
            {userRole === 'manager' || userRole === 'admin' ? (
                <div className="online-orders-section">
                    <h3>Online Orders</h3>
                    <ul>
                        {onlineOrders.map((order) => (
                            <li key={order.id}>
                                {order.customer} - ${order.total} ({order.status})
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}

            <div className="product-section">
                <h3>Available Products</h3>
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <h4>{product.name}</h4>
                            <p>Price: ${product.price.toFixed(2)}</p>
                            <p>Stock: {product.stock}</p>
                            <button onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                    ))}
                </div>

                {/* Low Stock Alerts */}
                {lowStockAlerts.length > 0 && (
                    <div className="low-stock-alerts">
                        <h4>Low Stock Alerts</h4>
                        <ul>
                            {lowStockAlerts.map((item) => (
                                <li key={item.id}>
                                    {item.name} - {item.stock} units left!
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="cart-section">
                <h3>Shopping Cart</h3>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => handleRefund(item.id)}>Refund</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <style>
                {`
                body {
    font-family: 'Arial, sans-serif';
    background-color: #f4f4f9;
    margin: 0;
    padding: 0;
}

.page-header {
    background-color: #d22f44;
    color: white;
    padding: 15px;
    text-align: center;
    font-size: 24px;
    border-radius: 8px;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.product-card {
    padding: 10px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.low-stock-alerts {
    background-color: #fff3cd;
    padding: 10px;
    border: 1px solid #ffeeba;
    margin-top: 20px;
    border-radius: 8px;
}

.online-orders-section {
    background-color: #e3f2fd;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin: 20px;
}

`}
            </style>
        </div>
    );
};

export default StorePOStobeUpdated;
