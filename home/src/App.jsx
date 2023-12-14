// import React from "react";
// import ReactDOM from "react-dom";
//
// import "./index.scss";
//
// const App = () => (
//   <div className="mt-10 text-3xl mx-auto max-w-6xl">
//     <div>Name: home</div>
//     <div>Framework: react</div>
//     <div>Language: JavaScript</div>
//     <div>CSS: Tailwind</div>
//   </div>
// );
// ReactDOM.render(<App />, document.getElementById("app"));

import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Header from "./Header"
import Footer from "./Footer";
import LoginForm from "./LoginForm";
import {BrowserRouter} from "react-router-dom";

const App = () => (
    <div className="text-3xl mx-auto max-w-6xl">
        <BrowserRouter>
            <Header/>
            <LoginForm/>
            <div className="my-10">
                Home page Content
            </div>
            <Footer/>
        </BrowserRouter>
    </div>
);

ReactDOM.render(
    <App/>
    , document.getElementById("app"));
