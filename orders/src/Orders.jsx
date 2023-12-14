// MenuPage.js
import React, {useState, useEffect} from 'react';
import {io} from "socket.io-client";
import '../../menu/src/menu.css';
import {subscribe, publish} from 'home/EventBus';

let loadedOrders = false;
let token = ""
let userId = -1;
// let menuItems = [];

subscribe("login_to_orders", data => {
    console.log('MicrofrontendA received data:', data);
    // setToken(data.token);
    // setUserId(data.userId);

    token = data.token;
    userId = data.userId;

    // getOrders(data.token, data.userId)

});

const OrdersPage = () => {
    // const [token, setToken] = useState("");
    // const [userId, setUserId] = useState(-1);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const socket = io.connect('http://localhost:5080'); // Update with your server address and port


    useEffect(() => {
        if (!loadedOrders) {
            if (!socket) return;

            // alert(token)
            // alert(userId)

            // Fetch menu items from the REST API
            // fetch('http://localhost:5080/menu')
            //     .catch(error => console.error('Error fetching menu items:', error));
            //
            // // Listen for messages from the server
            socket.on('get_orders', (message) => {

                alert(JSON.stringify(message, null, 2));

                setMenuItems(message.Body);

                loadedOrders = true;
            });

            // Clean up socket connection on component unmount
            return () => {
                socket.off('get_orders');
            };
        }
    }, [socket]);

    const getOrders = async () => {
        try {
            // Define parameters to be included in the request body
            const requestBody = {
                mail_or_token: token,
                password: "",
                user_id: userId
            };

            // Make a GET request to the API endpoint
            const response = await fetch('http://localhost:5080/orders/orders', {
                method: 'POST', // Use the GET method
                headers: {
                    'Content-Type': 'application/json', // Specify the content type of the request body
                },
                body: JSON.stringify(requestBody), // Convert the request body to JSON
            });

            if (!response.ok) {
                if (response.status === 401) {
                    alert('Expired authentification');
                } else {
                    alert('Bad status: ${response.status}');
                }
                return;
            }

            // Parse the response as JSON
            // const result = await response.json();
            const result = await response.json();

        } catch (error) {
            alert(error.message);
            console.error('Error fetching data:', error);
        } finally {
            // alert('Final');
        }
    }

    const handleItemClick = (order_id) => {
        // Update the selectedItems state with the toggled value
        if (selectedItems.includes(order_id)) {
            // Create a new array excluding the item to be removed
            const updatedItems = selectedItems.filter((item) => item !== order_id);

            // Update the state with the new array
            setSelectedItems(updatedItems);
        } else {
            // Create a new array with the existing items and the new item
            const updatedItems = [...selectedItems, order_id];

            // Update the state with the new array
            setSelectedItems(updatedItems);
        }
    };

    const cancelOrdersHelper = () => {
        selectedItems.map((item) => (
            cancelOrders(item)
        ));
    };

    const cancelOrders = async (order_id) => {
        try {
            // Define parameters to be included in the request body
            const requestBody = {
                mail_or_token: token,
                password: "",
                order_id: order_id,
                status: "Canceled"
            };

            // Make a GET request to the API endpoint
            const response = await fetch('http://localhost:5080/orders', {
                method: 'PUT', // Use the GET method
                headers: {
                    'Content-Type': 'application/json', // Specify the content type of the request body
                },
                body: JSON.stringify(requestBody), // Convert the request body to JSON
            });

            if (!response.ok) {
                if (response.status === 401) {
                    alert('Expired authentification');
                } else {
                    alert('Bad status: ${response.status}');
                }
                return;
            }

            // Parse the response as JSON
            // const result = await response.json();
            const result = await response.json();

        } catch (error) {
            alert(error.message);
            console.error('Error fetching data:', error);
        } finally {
            // alert('Final');
        }
    }

    return (
        <div>
            <h1>Orders</h1>
            <table>
                <thead>
                <tr>
                    <th>Food</th>
                    <th>Price</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Select</th>
                </tr>
                </thead>
                <tbody>
                {menuItems.map((item) => (
                    <tr>
                        <td>
                            <table>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                </tr>
                                </thead>
                                <tbody>
                                {item.foods.map((food) => (
                                    <tr>
                                        <td>{food.name}
                                        </td>
                                        <td>{food.quantity}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                        </td>
                        <td>{item.price}</td>
                        <td>{item.status}</td>
                        <td>{item.time}</td>
                        <td>
                            <input
                                type="checkbox"
                                // item.status === "Delivered" ||
                                disabled={item.status === "Canceled"}
                                onChange={() => handleItemClick(item.id)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={getOrders}>Button</button>
            <br/>
            <button onClick={cancelOrdersHelper}>Cancel Orders</button>
        </div>
    );
};

export default OrdersPage;