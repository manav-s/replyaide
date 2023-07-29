import React from "react";

const Explanation = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-semibold text-center mb-8">Our Aim</h1>
      <p className="text-lg leading-7 mb-6">
        <strong>Automated review response (ARR) software</strong> is a service
        offered natively by Google and Facebook. However, their response
        software does not utilize NLP and requires manual input of an array of
        review responses that map to specific characteristics of a review (e.g.,
        the number of stars given on the review or specific tags mentioned in
        reviews). As a result, current ARR systems lack the following benefits
        that we are seeking to provide: user-specific response insights and
        effective sentiment recognition and response.
      </p>
      <p className="text-lg leading-7 mb-6">
        Apart from ARR systems, some researchers have created models that
        analyze reviews and extract keywords or custom tags from the responses.
        Certain datasets include reviews and an array of emotions as response
        variables to the review. Nevertheless, current products still do not
        offer a viable solution for personal, accurate review responses. In the
        words of Widewail, "Contrary to conventional wisdom, Google/Facebook
        review response automation doesn’t scale as well as a managed online
        reputation management service because these solutions can’t address
        negative or nuanced reviews, still leaving extra work for you."
      </p>
      <p className="text-lg leading-7 mb-6">
        <strong>Our goal is to create an MVP</strong> that offers the increased
        functionality that current products do not.
      </p>
      <p className="text-lg leading-7 mb-6">
        Over the past few years, the popularity of online reviews has risen
        exponentially, and it is clear that customers place great importance on
        these reviews. According to Dixa, "93% of customers will read online
        reviews before making a purchase." Furthermore, this dependence on
        reviews incentivizes businesses to solicit reviews to increase the
        review count.
      </p>
      <p className="text-lg leading-7 mb-6">
        A product or business may be superior to its competitors, but if it has
        no reviews, it is unlikely that a consumer would choose it if
        better-reviewed products/businesses were available. According to Google,
        businesses that respond to reviews are 1.7 times more trustworthy than
        companies that don’t. Additionally, according to BrightLocal’s Local
        Consumer Review Survey, 57% say they would be 'not very' or 'not at all
        likely to use a business that doesn't respond to reviews.
      </p>
      <p className="text-lg leading-7 mb-6">
        Although the importance of review response is significant, 63% say that
        at least one company they reviewed never even responded. To make it even
        more challenging for businesses to deal with online reviews, according
        to ReviewTracker data, 53% of customers expect companies to respond to
        negative reviews within a week. In comparison, 33% have a shorter time
        frame of 3 days or less. Therefore, to make businesses' lives easier,
        they need a way to respond to reviews efficiently without throwing more
        people at the problem.
      </p>
      <p className="text-lg leading-7 mb-12">
        As such, our group has set out to solve this problem using natural
        language processing and various machine learning techniques to identify
        review sentiments and respond to them effectively. By doing so,
        businesses will have an automated solution to one of the most salient
        factors that impact the success of their business.
      </p>
    </div>
  );
};

export default Explanation;
