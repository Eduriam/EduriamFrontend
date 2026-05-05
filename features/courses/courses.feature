@courses
Feature: Course and learning path browsing

  Scenario: User opens a course from the courses page
    Given I am signed in
    And I am on the "courses-page" page
    Then I should see the "all-courses-section" section
    And I should see the "recommended-courses-section" section
    When I click on the "course-card" card
    Then I should be on the "course-page" page

  Scenario: User opens a learning path from the courses page
    Given I am signed in
    And I am on the "courses-page" page
    Then I should see the "all-courses-section" section
    And I should see the "recommended-courses-section" section
    When I click on the "learning-path-card" card
    Then I should be on the "learning-path-page" page
