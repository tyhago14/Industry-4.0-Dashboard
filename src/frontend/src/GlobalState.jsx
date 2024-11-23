import React, { createContext, /* useEffect ,*/ useState } from 'react';
import { callCloudFunction } from './firebase';

// Create the initial context
export const AppContext = createContext();

// Create the provider component
export const GlobalState = ({ children }) => {
  // Define your global state variables
  const [count, setCount] = useState(0);
  const [DadosHistoricos, setDadosHistoricos] = useState([]);
  
  const callDados = () => {
    console.log("Chamou CloudFunction")
    callCloudFunction((data) => {
      setDadosHistoricos(data);
      console.log('Response from Cloud Function:', data);
      console.log('Response energy:', data[0]);
      console.log('Response OEE:', data[1]);
    }, "BzYH8GdnP7PHQvJuMQ9YDeBf2lz1", "canvão", "Celula 1"); 
  }

/*     useEffect(() => {
      callDados(); // Call the function initially
      const interval = setInterval(callDados, 60000); // Call the function every 1 minute
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);   */

  // Define functions to update the state
  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);

  // Make the state and update functions accessible to the components
  const state = { count,   DadosHistoricos };
  const actions = { increment, decrement,  callDados  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};
