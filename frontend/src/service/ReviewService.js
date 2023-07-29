import axios from "axios";

const SERVER_API_BASE_URL = "http://localhost:5000"; // Replace with your server URL

class ReviewService {
  saveReview(user, review, product_type) {
    const requestBody = {
      user: user,
      review: review,
      product_type: product_type,
    };

    return axios.post(`${SERVER_API_BASE_URL}/generate-response`, requestBody);
  }

  getReviews(user_id) {
    return axios.get(`${SERVER_API_BASE_URL}/replies/${user_id}`);
  }

  searchReviews(user_id, search_term) {
    return axios.post(`${SERVER_API_BASE_URL}/reviews`, {
      user_id,
      search_term,
    });
  }

  deleteReview(id) {
    return axios.delete(`${SERVER_API_BASE_URL}/review/${id}`);
  }

  getProcessedReviewsCount(user_id) {
    return axios.post(`${SERVER_API_BASE_URL}/processed-reviews-count`, {
      user_id,
    });
  }

  getUniqueProductTypesCount(user_id) {
    return axios.post(`${SERVER_API_BASE_URL}/unique-product-types-count`, {
      user_id,
    });
  }

  getTotalWordsInReviewsCount(user_id) {
    return axios.post(`${SERVER_API_BASE_URL}/total-words-in-reviews-count`, {
      user_id,
    });
  }

  getDistinctProductTypes(user_id) {
    return axios.post(`${SERVER_API_BASE_URL}/distinct-products`, {
      user_id,
    });
  }
}





export default new ReviewService();
