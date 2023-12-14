// MenuPage.js
import React, {useState, useEffect} from 'react';
import {useSocket} from "../../about/src/socket";
import {io} from "socket.io-client";
import {subscribe, publish} from 'home/EventBus';
import './menu.css';

let loadedMenu = false;
let token = ""
let userId = -1;

subscribe("login_to_menu", data => {
    console.log('MicrofrontendA received data:', data);
    // setToken(data.token);
    // setUserId(data.userId);

    token = data.token;
    userId = data.userId;

    // getOrders(data.token, data.userId)

});

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [inputValues, setInputValues] = useState({});
    const socket = io.connect('http://localhost:5080'); // Update with your server address and port


    useEffect(() => {
        if (!loadedMenu) {
            if (!socket) return;


            // Listen for messages from the server
            socket.on('get_food', (message) => {
                alert(JSON.stringify(message, null, 2));
                // alert(message.Body[0][2])
                // alert(message.Body[0][0])
                // alert(data.body)
                setMenuItems(message.Body);
                loadedMenu = true;
            });

            // Clean up socket connection on component unmount
            return () => {
                socket.off('get_food');
            };
        }
    }, [socket]);

    const getMenu = () => {
        // Fetch menu items from the REST API
        fetch('http://localhost:5080/menu')
            .catch(error => console.error('Error fetching menu items:', error));
    }

    const addOrder = async () => {
        // Fetch menu items from the REST API

        const foodList = selectedItems.map((item) => {
            return {
                food_id: item,
                quantity: inputValues[item] || 0, // If inputValues[item] is undefined, default to 0
            };
        });

        alert(foodList)

        const requestBody = {
            mail_or_token: token,
            password: "",
            user_id: userId,
            foods: foodList
        }

        try {

            // Make a GET request to the API endpoint
            const response = await fetch('http://localhost:5080/orders', {
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
    };

    const handleItemClick = (food_id) => {
        // Update the selectedItems state with the toggled value
        if (selectedItems.includes(food_id)) {
            // Create a new array excluding the item to be removed
            const updatedItems = selectedItems.filter((item) => item !== food_id);

            // Update the state with the new array
            setSelectedItems(updatedItems);
        } else {
            // Create a new array with the existing items and the new item
            const updatedItems = [...selectedItems, food_id];

            // Update the state with the new array
            setSelectedItems(updatedItems);
        }
    };

    const handleInputChange = (itemId, inputValue) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [itemId]: inputValue,
        }));
    };

    return (
        <div>
            <h1>Menu</h1>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Available</th>
                    <th>Order</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                {menuItems.map((item) => (
                    <tr>
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>
                        <td className={item[3] ? 'available-yes' : 'available-no'}>{item[3] ? 'Yes' : 'No'}</td>
                        <td>
                            <input
                                type="checkbox"
                                // checked={selectedItems[item[0]] || false}
                                disabled={!item[3]}
                                onChange={() => handleItemClick(item[0])}
                            />
                        </td>
                        <td>
                            <input
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                onChange={(e) => handleInputChange(item[0], e.target.value)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={getMenu}>Load Menu</button>
            <br/>
            <button onClick={addOrder}>Add Order</button>
        </div>
    );
};

export default MenuPage;