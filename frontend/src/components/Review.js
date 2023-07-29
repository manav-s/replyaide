import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Review = ({ review, deleteReview }) => {
  const handleDelete = () => {
    deleteReview(review.id);
  };

  return (
    <tr key={review.id}>
      <td className="text-left px-6 py-4">
        <div className="text-sm text-gray-500">{review.product_type}</div>
      </td>
      <td className="text-left px-6 py-4">
        <div className="text-sm text-gray-500">{review.review_text}</div>
      </td>
      <td className="text-left px-6 py-4">
        <div className="text-sm text-gray-500">{review.reply_text}</div>
        {/* Use `review.reply_text` instead of `review.response` */}
      </td>
      <td className="text-right px-6 py-4 font-medium text-sm">
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 hover:cursor-pointer"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </td>
    </tr>
  );
};

export default Review;
