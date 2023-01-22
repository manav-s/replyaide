import axios from "axios";

const EMPLOYEE_API_BASE_URL =
  "https://replyaide-backend.herokuapp.com/api/v1/reviews";
class ReviewService {
  saveReview(employee) {
    return axios.post(EMPLOYEE_API_BASE_URL, employee);
  }

  getReviews() {
    return axios.get(EMPLOYEE_API_BASE_URL);
  }

  searchReviews(text) {
    // return axios.get("http://localhost:8080/api/v1/reviews/search", qs.stringify({ 'string': "creatine" }));

    const data = { string: text };
    return axios.get(
      "https://replyaide-backend.herokuapp.com/api/v1/reviews/search",
      {
        params: data,
      }
    );
  }

  deleteReview(id) {
    return axios.delete(EMPLOYEE_API_BASE_URL + "/" + id);
  }

  getReviewById(id) {
    return axios.get(EMPLOYEE_API_BASE_URL + "/" + id);
  }
}

export default new ReviewService();
