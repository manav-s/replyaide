import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/reviews";

class ReviewService {
  saveReview(employee) {
    return axios.post(EMPLOYEE_API_BASE_URL, employee);
  }

  getReviews() {
    return axios.get(EMPLOYEE_API_BASE_URL);
  }

  deleteReview(id) {
    return axios.delete(EMPLOYEE_API_BASE_URL + "/" + id);
  }

  getReviewById(id) {
    return axios.get(EMPLOYEE_API_BASE_URL + "/" + id);
  }
}

export default new ReviewService();