// import React from "react";
// import ReactDOM from "react-dom";
//
// import "./index.scss";
//
// const App = () => (
//   <div className="mt-10 text-3xl mx-auto max-w-6xl">
//     <div>Name: about</div>
//     <div>Framework: react</div>
//     <div>Language: JavaScript</div>
//     <div>CSS: Tailwind</div>
//   </div>
// );
// ReactDOM.render(<App />, document.getElementById("app"));

import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Header from "home/Header";
import Footer from "home/Footer";
import LoginForm from "home/LoginForm"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Menu from "menu/Menu";
import Order from "orders/Orders";


const App = () => (
    <div className="app">
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<LoginForm/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/orders" element={<Order/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </div>
);


ReactDOM.render(<App/>, document.getElementById("app"));
