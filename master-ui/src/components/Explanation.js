import React from "react";

const Explanation = () => {
  return (
    <div>
      <article>
        <h1 className="text-4xl text-center mx-40 my-5 px-40 text-semibold">
          Our Aim
        </h1>
        <p className="mx-40 my-5 pb-40 px-40">
          Automated review response (ARR) software is a service offered natively
          by Google and Facebook. Their response software does not use NLP and
          requires manual input of an array of review responses that map to
          specific characteristics of a review (i.e., the number of stars given
          on the review or specific tags mentioned in reviews).Thus, current ARR
          systems do not offer the following benefits that we are seeking to
          provide: user-specific response insights and effective sentiment
          recognition and response.
          <br />
          <br />
          Aside from ARR systems, other researchers have created models that
          sift through reviews and denote keywords included in the response (or
          custom tags). Some datasets include reviews and an array of emotions
          as response variables to the review. Additionally, current products do
          not offer a viable solution for personal, accurate review responses.
          This excerpt from widewail coherently describes the issue with current
          ARR products: “Contrary to conventional wisdom, Google/Facebook review
          response automation doesn’t scale as well as a managed online
          reputation management service because these solutions can’t address
          negative or nuanced reviews, still leaving extra work for you.”
          <br />
          <br />
          Our goal is to create an MVP that offers the increased functionality
          that current products do not.
          <br />
          <br />
          Over the past few years, the popularity of online reviews has risen
          exponentially and it is clear that customers place great importance on
          these reviews. According to Dixa, "93% of customers will read online
          reviews before making a purchase." Furthermore, this dependence on
          reviews incentivizes businesses to solicit reviews to increase the
          review count. A product or business may be superior to its
          competitors, but if it has no reviews, it is unlikely that a consumer
          would choose it if better-reviewed products/businesses were available.
          According to Google, businesses that respond to reviews are 1.7 times
          more trustworthy than companies that don’t. Additionally, according
          to Brighlocal’s Local Consumer Review Survey, 57% say they would be
          'not very' or 'not at all likely to use a
          business that doesn't respond to reviews.
          <br />
          <br />
          Although the importance of review response is significant, 63%
          say that at least one company they reviewed never even responded. To
          make it even more challenging for businesses to deal with online
          reviews, according to ReviewTracker data, 53% of customers expect
          companies to respond to negative reviews within a week.
          <br />
          <br />
          In comparison, 33% have a shorter time frame of 3 days or less.
          Therefore, to make businesses' lives easier, they need a way to
          respond to reviews efficiently without throwing more people at the
          problem. As such, our group has set out to solve this problem using
          natural language processing and various machine learning techniques to
          identify review sentiments and respond to them effectively. In doing
          so, businesses will have an automated solution to one of the most
          salient factors that impact the success of their business.
        </p>
      </article>
    </div>
  );
};

export default Explanation;
