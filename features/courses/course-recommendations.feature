@course-recommendations
Feature: Browse recommended courses and learning paths and update recommendations

  Scenario: User opens recommendations page and a recommended course
    Given I am signed in
    And I am on the "courses-page" page
    Then I should see the "courses-section" section
    When I click on the "all-recommendations-button" button
    Then I should be on the "recommendations-page" page
    And I should see the "recommended-courses-and-learning-paths-section" section
    When I click on the "recommended-course-card" card
    Then I should be on the "course-page" page

  Scenario: User opens recommendations page and a recommended learning path
    Given I am signed in
    And I am on the "courses-page" page
    Then I should see the "courses-section" section
    And I should see the "recommended-courses-section" section
    When I click on the "all-recommendations-button" button
    Then I should be on the "recommendations-page" page
    And I should see the "recommended-courses-and-learning-paths-section" section
    When I click on the "recommended-learning-path-card" card
    Then I should be on the "learning-path-page" page

  Scenario: User updates preferences in the recommendation questionnaire
    Given I am signed in
    And I am on the "recommendations-page" page
    When I click on the "retake-recommendation-quiz-button" button
    Then I should be on the "recommendation-quiz-page" page
    And I should see the "coding-experience-section" section
    When I select "beginner-option" option in the "coding-experience-radio-group" radio group
    And I click on the "continue-button" button
    Then I should see the "area-of-interest-section" section
    When I select "frontend-development-option" option in the "area-of-interest-radio-group" radio group
    And I click on the "continue-button" button
    Then I should see the "user-goal-section" section
    When I select "switch-career-option" option in the "user-goal-radio-group" radio group
    And I click on the "continue-button" button
    Then I should see the "quiz-finished-section" section
    When I click on the "view-courses-button" button
    Then I should be on the "recommendations-page" page
