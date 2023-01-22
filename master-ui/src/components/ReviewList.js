import React, { useEffect, useState } from "react";
import ReviewService from "../service/ReviewService";
import { useNavigate } from "react-router-dom";
import Review from "../components/Review";
import { auth } from "../utils/firebase";

const ReviewList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState(null);
  const [inputText, setInputText] = useState("");
  const idToken = localStorage.getItem("idToken");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ReviewService.getReviews()
        setReviews(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReviewService.searchReviews(inputText);
        setReviews(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [inputText]);

  const deleteReview = (e, id) => {
    e.preventDefault();
    ReviewService.deleteReview(id).then((res) => {
      if (reviews) {
        setReviews((prevElement) => {
          return prevElement.filter((review) => review.id !== id);
        });
      }
    });
  };

  auth.onAuthStateChanged(() => {
    if (!idToken) {
      navigate("/");
    }
  });

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="container mx-auto my-8">
      <div className="h-20 flex items-center justify-between">
        <button
          onClick={() => navigate("/addReview")}
          className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
        >
          Add Review
        </button>
        <div>
          <div className="relative rounded-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              ></svg>
            </div>
            <input
              id="search"
              type="text"
              placeholder="Search..."
              className="block w-full pl-3 pr-3 py-2 rounded-md transition duration-150 ease-in-out bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={inputHandler}
            />
          </div>
        </div>
      </div>
      <div className="flex shadow border-b mt-4">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking py-3 px-6">
                Product
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking py-3 px-6">
                Feedback
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking py-3 px-6">
                Response
              </th>
              <th className="text-right font-medium text-gray-500 uppercase tracking py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white">
              {reviews
                .slice()
                .reverse()
                .map((review) => (
                  <Review
                    review={review}
                    deleteReview={deleteReview}
                    key={review.id}
                  ></Review>
                ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default ReviewList;
