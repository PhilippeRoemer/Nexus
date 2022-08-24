import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Links from "./Pages/Links";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<Home />}></Route>
                <Route path="/:linkID" element={<Links />} />
            </Routes>
        </Router>
    );
}

export default App;
