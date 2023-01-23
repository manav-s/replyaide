package com.replyaide.replyaideapi.controller;

import com.replyaide.replyaideapi.entity.ReviewEntity;
import com.replyaide.replyaideapi.model.Review;
import com.replyaide.replyaideapi.services.ReviewService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:3000", "*"})
@RestController
@RequestMapping("api/v1")
public class ReviewController {

  private final ReviewService reviewService;

  public ReviewController(ReviewService reviewService) {
    this.reviewService = reviewService;
  }

  @PostMapping("/reviews")
  public ReviewEntity createReview(@RequestBody Review review) throws Exception {
    return reviewService.createReview(review);
  }

  @GetMapping("/reviews")
  public List<Review> getAllReviews() {
    return reviewService.getAllReviews();
  }

  @GetMapping("/reviews/search")
  public List<Review> searchReviews(String string) {
    return reviewService.searchReviews(string);
  }

  @DeleteMapping("/reviews/{id}")
  public ResponseEntity<Map<String,Boolean>> deleteReview(@PathVariable Long id) {
    boolean deleted = false;
    deleted = reviewService.deleteReview(id);
    Map<String,Boolean> response = new HashMap<>();
    response.put("deleted", deleted);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/reviews/{id}")
  public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
    Review review = null;
    review = reviewService.getReviewById(id);
    return ResponseEntity.ok(review);
  }
}
