import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainBoard from "./components/MainBoard";
import Home from "./components/Home";
import Login from "./components/Login";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import "./App.css";
const App = () => {
  const activeMenu = false;
  return (
    <div>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="settings" position="Top">
              <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                style={{ background: "blue", borderRadius: "50%" }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {/* side menu  */}
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              Side BAr
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">Side bar </div>
          )}
          <div
            className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${
              activeMenu ? "md:ml-72" : "flex-2"
            } `}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              NavBar
            </div>
            {/* navigation bar  */}
          </div>
          <div>
            <Routes>
              {/* this is dashboards  */}
              <Route path="/" element="Ecommerce"></Route>
              <Route path="/ecommerce" element="Ecommerce"></Route>
              {/* pages */}
              <Route path="/orders" element="Orders"></Route>
              <Route path="/employees" element="Emp"></Route>
              <Route path="/customers" element="Customers"></Route>
              {/* Apps  */}
              <Route path="/kanban" element="Customers"></Route>
              <Route path="/editor" element="Customers"></Route>
              <Route path="/calender" element="Customers"></Route>
              <Route path="/color-picker" element="Customers"></Route>
              {/* charts */}
              <Route path="/line" element="Customers"></Route>
              <Route path="/area" element="Customers"></Route>
              <Route path="/bar" element="Customers"></Route>
              <Route path="/pie" element="Customers"></Route>
              <Route path="/financial" element="Customers"></Route>
              <Route path="/color-mapping" element="Customers"></Route>
              <Route path="/pyramids" element="Customers"></Route>
              <Route path="/stacked" element="Customers"></Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>

    // <BrowserRouter>
    //   <Header />
    //   <h1 className="underline text-4xl"> Hello Task Manager</h1>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/main" element={<MainBoard />} />
    //     <Route path="/login" element={<Login />} />
    //   </Routes>
    //   <Footer />
    // </BrowserRouter>
  );
};

export default App;
