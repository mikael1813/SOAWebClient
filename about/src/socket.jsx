// socket.jsx
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socketInstance;

export const useSocket = (serverUrl) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!socketInstance) {
            // Create a new socket instance if it doesn't exist
            const newSocket = io.connect(serverUrl);
            socketInstance = newSocket;
            setSocket(newSocket);

            return () => {
                // Disconnect the socket when the component unmounts
                newSocket.disconnect();
                socketInstance = null;
            };
        } else {
            // Use the existing socket instance
            setSocket(socketInstance);
        }
    }, [serverUrl]);

    return socket;
};