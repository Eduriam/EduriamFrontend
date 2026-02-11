@home-page
Feature: Home page learning and review

  Scenario: User starts the upcoming lesson
    Given I am logged in
    And I am on the "home-page" page
    Then I should see the "upcoming-lesson-section" section
    And I should see the "start-upcoming-lesson-button" button
    When I click on the "start-upcoming-lesson-button" button
    Then I should be redirected to the "study-session-page" page

  Scenario: User is informed when there is no upcoming lesson
    Given I am logged in
    And I am on the "home-page" page
    Then I should see the "upcoming-lesson-section" section
    And I should see the "all-lessons-completed-section" section
    And I should see the "browse-courses-button" button
    When I click on the "browse-courses-button" button
    Then I should be redirected to the "courses-page" page

  Scenario: User starts a review session
    Given I am logged in
    And I am on the "home-page" page
    Then I should see the "review-tab-button" button
    When I click on the "review-tab-button" button
    Then I should see the "review-section" section
    And I should see the "start-review-button" button
    When I click on the "start-review-button" button
    Then I should be redirected to the "study-session-page" page

  Scenario: User is informed when there is no content to review
    Given I am logged in
    And I am on the "home-page" page
    Then I should see the "review-tab-button" button
    When I click on the "review-tab-button" button
    Then I should see the "review-section" section
    And I should see the "no-content-to-review-section" section

  Scenario: User starts learning from a specific study plan course
    Given I am logged in
    And I am on the "home-page" page
    Then I should see the "study-plan-button" button
    When I click on the "study-plan-button" button
    Then I should be on the "study-plan-page" page
    When I click on the "start-test-course-learning-button" button
    Then I should be redirected to the "study-session-page" page
