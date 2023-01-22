import React from "react";

const Review = ({ review, deleteReview }) => {
  return (
    <tr key={review.id}>
      <td className="text-left px-6 py-4">
        <div className="text-sm text-gray-500">{review.product_type}</div>
      </td>
      <td className="text-left px-6 py-4">
        <div className="text-sm text-gray-500">{review.feedback}</div>
      </td>
      <td className="text-left px-6 py-4 ">
        <div className="text-sm text-gray-500">{review.response}</div>
      </td>
      <td className="text-right px-6 py-4 font-medium text-sm">
        <button
          onClick={(e, id) => deleteReview(e, review.id)}
          className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Review;
