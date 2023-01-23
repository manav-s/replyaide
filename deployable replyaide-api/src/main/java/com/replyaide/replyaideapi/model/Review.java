package com.replyaide.replyaideapi.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
  private Long id;
  private String product_type;
  private String feedback;
  private String response;
}
