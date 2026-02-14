@chapter-page
Feature: Chapter page

  Scenario: User opens chapter from course page and starts a lesson
    Given I am logged in
    And I am on the "course-page" page
    When I click on the "chapter-card" card
    Then I should be on the "chapter-page" page
    And I should see the "sections-list-section" section
    When I click on the "section-card" card
    Then I should see the "lessons-list-section" section
    When I click on the "lesson-button" button
    Then I should be redirected to the "study-page" page
