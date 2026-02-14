@learning-path
Feature: Learning path page and enrollment

  Scenario: User sees learning path description and course overview
    Given I am logged in
    And I am on the "courses-page" page
    When I click on the "learning-path-card" card
    Then I should be on the "learning-path-page" page
    And I should see the "learning-path-description-section" section
    And I should see the "learning-path-courses-list-section" section

  Scenario: User enrolls in learning path and is taken to first lesson of the first course
    Given I am logged in
    And I am not enrolled in a course
    And I am on the "courses-page" page
    When I click on the "learning-path-card" card
    Then I should be on the "learning-path-page" page
    When I click on the "start-learning-path-button" button
    Then I should be redirected to the "study-page" page

  Scenario: User continues learning in learning path and is taken to next lesson
    Given I am logged in
    And I am enrolled in a course
    And I am on the "courses-page" page
    When I click on the "learning-path-card" card
    Then I should be on the "learning-path-page" page
    And I should see the "continue-learning-path-button" button
    When I click on the "continue-learning-path-button" button
    Then I should be redirected to the "lesson-page" page

  Scenario: User navigates to manage enrolled learning paths
    Given I am logged in
    And I am on the "courses-page" page
    When I click on the "learning-path-card" card
    Then I should be on the "learning-path-page" page
    When I click on the "information-button" button
    Then I should see the "learning-path-details-drawer" drawer
    When I click on the "manage-courses-button" button
    Then I should be on the "manage-courses-page" page

