package com.replyaide.replyaideapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class ReplyaideApiApplication {

  public static void main(String[] args) {
    SpringApplication.run(ReplyaideApiApplication.class, args);
  }

}
