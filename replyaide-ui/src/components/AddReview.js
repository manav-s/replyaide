import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewService from "../services/ReviewService";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

const AddReview = () => {
  const [review, setReview] = useState({
    id: "",
    product_type: "",
    feedback: "",
    response: "",
  });

  const [bgColor, setBgColor] = React.useState("blue");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setReview({ ...review, [e.target.name]: value });
  };

  const saveReview = (e) => {
    e.preventDefault();
    setBgColor("red");
    setTimeout(() => setBgColor("blue"), 100);
    ReviewService.saveReview(review)
      .then((response) => {
        console.log(response);
        navigate("/reviewList");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setReview({
      id: "",
      product_type: "",
      feedback: "",
      response: "",
    });
  };

  if (!user) navigate("/");

  if (user)
    return (
      <>
        <div className="flex max-w-2xl mb-50 mx-auto shadow mt-20 border-b mb-20 pb-20">
          <div className="px-8 py-8">
            <div className="font-thin text-2xl tracking-wider">
              <h1>Generate reply to consumer review</h1>
            </div>
            <div className="items-center justify-center h-14 w-full my-4">
              <label className="block text-gray-600 text-sm font-normal">
                Product type
              </label>
              <input
                type="text"
                name="product_type"
                value={review.product_type}
                onChange={(e) => handleChange(e)}
                className="h-10 w-96 border mt-2 px-2 py-2"
              ></input>
            </div>
            <div className="items-center justify-center h-14 w-full my-4">
              <label className="block text-gray-600 text-sm font-normal">
                Feedback
              </label>
              <input
                type="text"
                name="feedback"
                value={review.feedback}
                onChange={(e) => handleChange(e)}
                className="h-10 w-96 border mt-2 px-2 py-2"
              ></input>
            </div>

            <div className="items-center justify-center h-14 w-full mt-10 space-x-4 pt-4">
              <button
                onClick={saveReview}
                className="rounded text-white font-semibold hover:bg-green-700 py-2 px-6"
                style={{ backgroundColor: bgColor }}
              >
                Save
              </button>
              <button
                onClick={reset}
                className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="pb-20" />
      </>
    );
};

export default AddReview;
