@course-page
Feature: Course page and enrollment

  Scenario: User sees course description and lesson overview
    Given I am signed in
    And I am on the "courses-page" page
    When I click on the "course-card" card
    Then I should be on the "course-page" page
    And I should see the "course-description-section" section
    And I should see the "chapters-list-section" section

  Scenario: User enrolls in course and is taken to first lesson
    Given I am signed in
    And I am not enrolled in the course
    And I am on the "courses-page" page
    When I click on the "course-card" card
    Then I should be on the "course-page" page
    When I click on the "start-course-button" button
    Then I should be redirected to the "study-page" page

  Scenario: User continues learning and is taken to next lesson
    Given I am signed in
    And I am enrolled in the course
    And I am on the "courses-page" page
    When I click on the "course-card" card
    Then I should be on the "course-page" page
    And I should see the "continue-learning-button" button
    When I click on the "continue-learning-button" button
    Then I should be redirected to the "study-page" page

  Scenario: Non-premium user tries to enroll in premium course
    Given I am signed in
    And the course is premium
    And I am not enrolled in the course
    And I am on the "course-page" page
    When I click on the "start-course-button" button
    Then I should be redirected to the "premium-page" page
    And I should see the "course-locked-section" section

  Scenario: User navigates to manage enrolled courses
    Given I am signed in
    And I am on the "courses-page" page
    When I click on the "course-card" card
    Then I should be on the "course-page" page
    When I click on the "information-button" button
    Then I should see the "course-details-drawer" drawer
    When I click on the "manage-courses-button" button
    Then I should be on the "manage-courses-page" page
