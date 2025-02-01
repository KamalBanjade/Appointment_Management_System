import React from "react";
import MyRoutes from "./MyRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import store, { persistor } from './Redux/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from "react-toastify";
import { toastConfig } from './toastConfig'; 

const App = () => {
  return (
    <div>
      <ToastContainer 
        position="top-right" 
        {...toastConfig} 
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <MyRoutes />
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;
