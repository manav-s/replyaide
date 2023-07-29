import React, { useEffect, useState } from "react";
import ReviewService from "../service/ReviewService";
import { useNavigate } from "react-router-dom";
import Review from "../components/Review";
import { auth } from "../utils/firebase";
import Modal from "react-modal";

Modal.setAppElement("#root"); // This line is needed for accessibility purposes

const ReviewList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState(null);
  const [inputText, setInputText] = useState("");
  const idToken = localStorage.getItem("idToken");
  const user_id = localStorage.getItem("user_id");
  const [modalIsOpen, setIsOpen] = useState(false);

  // Initialize state variables for the metrics
  const [processedReviewsCount, setProcessedReviewsCount] = useState(null);
  const [uniqueProductTypesCount, setUniqueProductTypesCount] = useState(null);
  const [totalWordsInReviewsCount, setTotalWordsInReviewsCount] =
    useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log(user_id);
        const response = await ReviewService.getReviews(user_id);
        setReviews(response.data);
        if (!response.data.length) setIsOpen(true); // Open modal if there are no reviews

        // Fetch the metrics
        const processedReviewsCountResponse =
          await ReviewService.getProcessedReviewsCount(user_id);
        const uniqueProductTypesCountResponse =
          await ReviewService.getUniqueProductTypesCount(user_id);
        const totalWordsInReviewsCountResponse =
          await ReviewService.getTotalWordsInReviewsCount(user_id);

        console.log(
          processedReviewsCountResponse,
          uniqueProductTypesCountResponse,
          totalWordsInReviewsCountResponse
        );

        // Update the state variables with the fetched metrics
        setProcessedReviewsCount(processedReviewsCountResponse.data.count);
        setUniqueProductTypesCount(uniqueProductTypesCountResponse.data.count);
        setTotalWordsInReviewsCount(
          totalWordsInReviewsCountResponse.data.wordCount
        );
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
        const response = await ReviewService.searchReviews(user_id, inputText);
        setReviews(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [inputText]);

  const deleteReview = (id) => {
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

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 shadow rounded-lg">
          <h2 className="font-bold text-xl">Reviews Processed</h2>
          <p className="text-3xl">{processedReviewsCount}</p>
        </div>
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 shadow rounded-lg">
          <h2 className="font-bold text-xl">Unique Listings</h2>
          <p className="text-3xl">{uniqueProductTypesCount}</p>
        </div>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 shadow rounded-lg">
          <h2 className="font-bold text-xl">Words Generated</h2>
          <p className="text-3xl">{totalWordsInReviewsCount}</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <button
          onClick={() => navigate("/addReview")}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Review
        </button>
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-2">
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
            className="block w-full pl-8 pr-4 py-2 rounded-md bg-white border border-gray-200 text-gray-700"
            onChange={inputHandler}
          />
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Product
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Feedback
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Response
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Instruction Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "1rem", // Rounded border
            backgroundColor: "#F3F4F6", // Light grey background
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // Soft shadow
            padding: "2rem", // Padding around content
            width: "80%", // Modal width
            maxWidth: "600px", // Max modal width
          },
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Welcome to ReplyAide!</h2>

        <div className="text-gray-700">
          <ol className="list-decimal list-inside">
            <li className="mb-2">
              Navigate to the home screen to view all your products and replies
            </li>
            <li className="mb-2">
              To add a review, press the "Add Review" button
            </li>
            <li className="mb-2">
              On the following screen, enter the product type and feedback
            </li>
            <li className="mb-2">
              After saving, your review will appear in the list on the home
              screen
            </li>
          </ol>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewList;
