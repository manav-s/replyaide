import "./App.css";
import Explanation from "./components/Explanation";
import Navbar from "./components/Navbar";
import Footnote from "./components/Footnote";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddReview from "./components/AddReview";
import ReviewList from "./components/ReviewList";
import Homepage from "./components/Homepage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/explanation" element={<Explanation />}></Route>
            <Route path="/reviewlist" element={<ReviewList />}></Route>
            <Route path="/addreview" element={<AddReview />}></Route>
          </Routes>
        </div>
        <Footnote />
      </div>
    </BrowserRouter>
  );
}

export default App;
