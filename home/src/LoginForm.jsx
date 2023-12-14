import React, {useState} from 'react';
import {publish} from './EventBus';

const LoginForm = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Validate the username and password (add your validation logic here).

        // Function to fetch data with parameters in the request body
        const fetchData = async () => {
            try {
                // Define parameters to be included in the request body
                const requestBody = {
                    mail_or_token: username,
                    password: password,
                };

                // Make a GET request to the API endpoint
                const response = await fetch('http://localhost:5080/user/login', {
                    method: 'POST', // Use the GET method
                    headers: {
                        'Content-Type': 'application/json', // Specify the content type of the request body
                    },
                    body: JSON.stringify(requestBody), // Convert the request body to JSON
                });


                if (!response.ok) {
                    if (response.status === 401) {
                        alert('Incorrect username or password');
                    } else {
                        alert('Bad status: ${response.status}');
                    }
                    return;
                }

                // Parse the response as JSON
                // const result = await response.json();
                const result = await response.json();

                const token = result.token;
                alert(token);
                const user_id = result.user_id;
                alert(user_id)
                publish("login_to_menu", {"token": token, "userId": user_id})
                publish("login_to_orders", {"token": token, "userId": user_id})
            } catch (error) {
                alert(error.message);
                console.error('Error fetching data:', error);
            } finally {
                // alert('Final');
            }
        };

        // Call the fetchData function
        fetchData();

    };

    return (
        <div>
            <h2>Login</h2>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <br/>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <br/>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginForm;