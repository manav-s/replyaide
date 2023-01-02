package com.replyaide.replyaideapi.services;

import com.replyaide.replyaideapi.entity.ReviewEntity;
import com.replyaide.replyaideapi.model.Review;
import com.replyaide.replyaideapi.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ReviewServiceImpl implements ReviewService {

  private final RestTemplate restTemplate;

  @Autowired
  private ReviewRepository reviewRepository;

  @Autowired
  public ReviewServiceImpl(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  public ReviewServiceImpl(RestTemplate restTemplate,
      ReviewRepository reviewRepository) {
    this.restTemplate = restTemplate;
    this.reviewRepository = reviewRepository;
  }

  private static final String API_URL = "https://api.openai.com/v1/completions";

  @Transactional
  public ReviewEntity createReview(Review review) throws Exception {

    // Set the request headers
    HttpHeaders headers = new HttpHeaders();
    String apiKey = "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";
    headers.setBearerAuth(apiKey);
    headers.setContentType(MediaType.APPLICATION_JSON);

    String str1 = "Generate a response less than 20 words to the following review of a ";
    StringBuilder sb = new StringBuilder();

    sb.append(str1);
    sb.append(review.getProduct_type());
    sb.append(": ");
    sb.append(review.getFeedback());

    String final_query = sb.toString();

    // Set the request body
    String requestBody = "{\"model\": \"text-davinci-003\", "
        + "\"prompt\":" + "\"" + final_query + "\","
        + "\"temperature\": 0, "
        + "\"max_tokens\": 100}";
    System.out.println(requestBody);
    HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

    // Send the request and parse the response
    ResponseEntity<String> response = restTemplate
        .exchange(API_URL, HttpMethod.POST, entity, String.class);

    JSONObject responseJson = new JSONObject(response.getBody());
    JSONObject responseText = (JSONObject) ((JSONArray) responseJson.get("choices")).get(0);
    String text = responseText.optString("text").replace("\n", "");

    // Save the query and response in the database
    ReviewEntity r = new ReviewEntity();
    r.setProduct_type(review.getProduct_type());
    r.setFeedback(review.getFeedback());
    r.setResponse(text);

    reviewRepository.save(r);

    return r;
  }

  @Override
  public List<Review> getAllReviews() {
    List<ReviewEntity> reviewEntities
        = reviewRepository.findAll();

    List<Review> reviews = reviewEntities
        .stream()
        .map(emp -> new Review(
            emp.getId(),
            emp.getProduct_type(),
            emp.getFeedback(),
            emp.getResponse()))
        .collect(Collectors.toList());
    return reviews;
  }

  @Override
  public boolean deleteReview(Long id) {
    try {
      ReviewEntity review = reviewRepository.findById(id).get();
      reviewRepository.delete(review);
      return true;
    } catch (NoSuchElementException e) {
      return false;
    }
  }

  @Override
  public Review getReviewById(Long id) {
    try {
      ReviewEntity reviewEntity
          = reviewRepository.findById(id).get();
      Review review = new Review();
      BeanUtils.copyProperties(reviewEntity, review);
      return review;
    } catch (NoSuchElementException e) {
      return new Review(0L, "No such review found", "", "");
    }
  }
}
