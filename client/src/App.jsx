import { Routes, Route } from "react-router-dom";
//import pages
import Home from "./pages/Home.jsx";
import FeedbackForm from "./pages/FeedbackForm.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<FeedbackForm />} />
      </Routes>
    </>
  );
}

export default App;
