@onboarding
Feature: Onboarding questionnaire and recommendations

  Scenario: User completes onboarding with a recommended course
    Given I am signed in and I am not enrolled in any course
    And I am on the "onboarding-page" page
    Then I should see the "coding-experience-section" section
    When I select "beginner-option" option in the "coding-experience-radio-group" radio group
    And I click on the "continue-button" button
    Then I should see the "area-of-interest-section" section
    When I select "frontend-development-option" option in the "area-of-interest-radio-group" radio group
    And I click on the "continue-button" button
    Then I should see the "user-goal-section" section
    When I select "switch-career-option" option in the "user-goal-radio-group" radio group
    And I click on the "continue-button" button
    Then I should see the "value-proposition-section" section
    When I click on the "continue-button" button
    Then I should see the "recommended-courses-section" section
    When I click on the "html-course-card" card
    Then I should see the "daily-goal-section" section
    When I select "10-option" option in the "daily-goal-radio-group" radio group
    And I click on the "continue-button" button
    Then I should see the "onboarding-complete-section" section
    When I click on the "start-learning-button" button
    Then I should be on the "home-page" page

  Scenario: User completes onboarding and chooses a course from all courses
    Given I am signed in and I am not enrolled in any course
    And I am on the "onboarding-page" page
    Then I should see the "coding-experience-section" section
    When I select "beginner-option" option in the "coding-experience-radio-group" radio group
    And I click on the "continue-button" button
    Then I should see the "area-of-interest-section" section
    When I select "frontend-development-option" option in the "area-of-interest-radio-group" radio group
    And I click on the "continue-button" button
    Then I should see the "user-goal-section" section
    When I select "switch-career-option" option in the "user-goal-radio-group" radio group
    And I click on the "continue-button" button
    Then I should see the "value-proposition-section" section
    When I click on the "continue-button" button
    Then I should see the "recommended-courses-section" section
    When I click on the "explore-all-courses-button" button
    Then I should see the "all-courses-section" section
    When I click on the "html-course-card" card
    Then I should see the "daily-goal-section" section
    When I select "10-option" option in the "daily-goal-radio-group" radio group
    And I click on the "continue-button" button
    Then I should see the "onboarding-complete-section" section
    When I click on the "start-learning-button" button
    Then I should be on the "home-page" page
