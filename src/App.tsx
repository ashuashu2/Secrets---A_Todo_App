import React from "react";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { Home } from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";
import { useAuth } from "./context/authContext";
import { RequiresAuth } from "./components/RequiresAuth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={ <RequiresAuth login={isLoggedIn}> {<Home />} </RequiresAuth> } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <ToastContainer
            position="bottom-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
    </div>

    
  );
}

export default App;
