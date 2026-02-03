@courses
Feature: Course and career path browsing

  Scenario: User opens a course from the courses page
    Given I am logged in
    And I am on the "courses-page" page
    Then I should see the "courses-section" section
    And I should see the "recommended-courses-section" section
    When I click on the "course-card" card
    Then I should be on the "course-page" page

  Scenario: User opens a career path from the courses page
    Given I am logged in
    And I am on the "courses-page" page
    Then I should see the "courses-section" section
    And I should see the "recommended-courses-section" section
    When I click on the "career-path-card" card
    Then I should be on the "career-path-page" page
