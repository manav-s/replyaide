import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReviewService from "../service/ReviewService";
import { auth } from "../utils/firebase";
import { ThreeDots } from "react-loader-spinner";
import { CopyToClipboard } from "react-copy-to-clipboard";

const AddReview = () => {
  const [review, setReview] = useState({
    product_type: "",
    feedback: "",
  });

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  const idToken = localStorage.getItem("idToken");
  const user_id = localStorage.getItem("user_id");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSaveAndOpenModal = (e) => {
    e.preventDefault();
    setLoading(true);

    ReviewService.saveReview(user_id, review.feedback, review.product_type)
      .then((response) => {
        console.log(response);
        setLoading(false);
        setAiResponse(response.data.response);
        setModalOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };


  const closeModal = () => {
    setModalOpen(false);
    setAiResponse("");
    setCopied(false);
  };

  const reset = (e) => {
    e.preventDefault();
    setReview({
      product_type: "",
      feedback: "",
    });
  };

  auth.onAuthStateChanged(() => {
    if (!idToken) {
      navigate("/");
    }
  });

  return (
    <div className="min-h-screen bg-white bg-opacity-100 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-gradient flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-10 left-0 mt-8 ml-8">
        <span
          onClick={() => navigate("/reviewList")}
          className="cursor-pointer text-red-500 text-lg font-bold"
        >
          &lt; Back to Review List
        </span>
      </div>
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg p-8">
        <form className="mt-8 space-y-6" onSubmit={handleSaveAndOpenModal}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                name="product_type"
                type="text"
                required
                value={review.product_type}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Product Type"
              />
            </div>
            <div>
              <input
                name="feedback"
                type="text"
                required
                value={review.feedback}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Feedback"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`relative w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                loading
                  ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
              }`}
              disabled={loading}
            >
              {loading && (
                <ThreeDots
                  className="absolute left-0 inset-y-0 flex items-center pl-3"
                  color="#fff"
                  height={20}
                  width={20}
                  aria-hidden="true"
                />
              )}
              {loading ? null : "Submit Review"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="mt-4 w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Review Saved!
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Here is the AI-generated response to your review:
                    </p>
                    <CopyToClipboard
                      text={aiResponse}
                      onCopy={() => setCopied(true)}
                    >
                      <p
                        className={`text-gray-700 mt-2 ${
                          copied ? "text-green-600" : ""
                        }`}
                      >
                        {aiResponse}
                      </p>
                    </CopyToClipboard>
                    {copied ? (
                      <span className="text-green-600">Copied!</span>
                    ) : (
                      <span
                        onClick={() => setCopied(true)}
                        className="text-gray-500 cursor-pointer"
                      >
                        Click to copy
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => navigate("/reviewList")}
                >
                  Go to Review List
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Add Another Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddReview;
