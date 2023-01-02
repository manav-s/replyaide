package com.replyaide.replyaideapi.services;

import com.replyaide.replyaideapi.entity.ReviewEntity;
import com.replyaide.replyaideapi.model.Review;
import java.util.List;
import org.json.JSONException;
import org.json.JSONObject;

public interface ReviewService {

  ReviewEntity createReview(Review review) throws Exception;

  List<Review> getAllReviews();

  boolean deleteReview(Long id);

  Review getReviewById(Long id);
}
