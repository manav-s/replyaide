import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddReview from "./components/AddReview";
import NavBar from "./components/NavBar";
import ReviewList from "./components/ReviewList";
import Explanation from "./components/Explanation";
import Homepage from "./components/Homepage";
import Footnote from "./components/Footnote";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/explanation" element={<Explanation />}></Route>
        <Route path="/reviewList" element={<ReviewList />} />
        <Route path="/addReview" element={<AddReview />} />
      </Routes>
      <Footnote />
    </BrowserRouter>
  );
}

export default App;
