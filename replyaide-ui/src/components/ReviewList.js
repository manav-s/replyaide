import React, { useEffect, useState } from "react";
import ReviewService from "../services/ReviewService";
import { useNavigate } from "react-router-dom";
import Review from "../components/Review";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

const ReviewList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState(null);

  const [user, loading_user] = useAuthState(auth);
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ReviewService.getReviews();
        setReviews(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

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

    if (!user) navigate("/");

    if (user)
      return (
        <div className="container mx-auto my-8">
          <div classname="h-12">
            <button
              onClick={() => navigate("/addReview")}
              className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
            >
              Add Review
            </button>
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
