
@study-plan
Feature: Study Plan

  Scenario: User views their study plan
    Given I am signed in
    And I am on the "study-plan-page" page
    Then I should see the "study-plan-section" section
    And I should see the "learn-courses-list-section" section
    And I should see the "review-courses-list-section" section
    And I should see the "paused-courses-list-section" section

  Scenario: User sets a paused course to learning mode in the study plan
    Given I am signed in
    And I am on the "study-plan-page" page
    And I should see the "study-plan-section" section
    And I should see the "learn-courses-list-section" section
    And I should see the "review-courses-list-section" section
    And I should see the "paused-courses-list-section" section
    And I should see the "test-course-paused-card" card in the "paused-courses-list-section" section
    When I drag and drop the "test-course-paused-card" card to the "learn-courses-list-section" section
    Then I should see the "test-course-paused-card" card in the "learn-courses-list-section" section

  Scenario: User sets a paused course to review mode in the study plan
    Given I am signed in
    And I am on the "study-plan-page" page
    And I should see the "study-plan-section" section
    And I should see the "learn-courses-list-section" section
    And I should see the "review-courses-list-section" section
    And I should see the "paused-courses-list-section" section
    And I should see the "test-course-paused-card" card in the "paused-courses-list-section" section
    When I drag and drop the "test-course-paused-card" card to the "review-courses-list-section" section
    Then I should see the "test-course-paused-card" card in the "review-courses-list-section" section

   Scenario: User sets a course in learning mode to paused mode in the study plan
    Given I am signed in
    And I am on the "study-plan-page" page
    And I should see the "study-plan-section" section
    And I should see the "learn-courses-list-section" section
    And I should see the "review-courses-list-section" section
    And I should see the "paused-courses-list-section" section
    And I should see the "test-course-learn-card" card in the "learn-courses-list-section" section
    When I drag and drop the "test-course-learn-card" card to the "paused-courses-list-section" section
    Then I should see the "test-course-learn-card" card in the "paused-courses-list-section" section
