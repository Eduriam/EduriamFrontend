@energy-status
Feature: Energy status and insufficient energy handling

  Background:
    Given I am logged in

  Scenario: User opens energy status and sees the premium unlock option
    Given I am on the "home-page" page
    When I click on the "energy-section" button
    Then I should see the "energy-drawer" drawer
    And I should see the "unlock-unlimited-energy-button" button
    When I click on the "unlock-unlimited-energy-button" button
    Then I should be redirected to the "premium-page" page

  Scenario: User tries to start upcoming lesson from home with no energy
    Given I have no energy left
    And I have an upcoming lesson
    And I am on the "home-page" page
    When I click on the "start-upcoming-lesson-button" button
    Then I should be redirected to the "premium-page" page
    And I should see the "no-energy-left-section" section

  Scenario: User tries to start review from home with no energy
    Given I have no energy left
    And I have content to review
    And I am on the "home-page" page
    When I click on the "review-tab-button" button
    And I click on the "start-review-button" button
    Then I should be redirected to the "premium-page" page
    And I should see the "no-energy-left-section" section

  Scenario: User tries to start learning from study plan with no energy
    Given I have no energy left
    And I am on the "home-page" page
    When I click on the "study-plan-button" button
    Then I should be on the "study-plan-page" page
    When I click on the "start-test-course-learning-button" button
    Then I should be redirected to the "premium-page" page
    And I should see the "no-energy-left-section" section

  Scenario: User tries to start a course from course page with no energy
    Given I have no energy left
    Given I am not enrolled in the course
    And I am on the "courses-page" page
    When I click on the "course-card" card
    Then I should be on the "course-page" page
    When I click on the "start-course-button" button
    Then I should be redirected to the "premium-page" page
    And I should see the "no-energy-left-section" section

  Scenario: User tries to continue course learning from course page with no energy
    Given I have no energy left
    Given I am enrolled in the course
    And I am on the "courses-page" page
    When I click on the "course-card" card
    Then I should be on the "course-page" page
    When I click on the "continue-learning-button" button
    Then I should be redirected to the "premium-page" page
    And I should see the "no-energy-left-section" section

  Scenario: User tries to start review from course page with no energy
    Given I have no energy left
    Given I am enrolled in the course
    And I have no upcoming lesson
    And I am on the "courses-page" page
    When I click on the "course-card" card
    Then I should be on the "course-page" page
    When I click on the "review-course-button" button
    Then I should be redirected to the "premium-page" page
    And I should see the "no-energy-left-section" section

  Scenario: User tries to start lesson from chapter page with no energy
    Given I have no energy left
    Given I am on the "course-page" page
    When I click on the "chapter-card" card
    Then I should be on the "chapter-page" page
    When I click on the "section-card" card
    And I click on the "lesson-button" button
    Then I should be redirected to the "premium-page" page
    And I should see the "no-energy-left-section" section

  Scenario: User tries to start learning path from learning path page with no energy
    Given I have no energy left
    Given I am not enrolled in the course
    And I am on the "courses-page" page
    When I click on the "learning-path-card" card
    Then I should be on the "learning-path-page" page
    When I click on the "start-learning-path-button" button
    Then I should be redirected to the "premium-page" page
    And I should see the "no-energy-left-section" section

  Scenario: User tries to continue learning path from learning path page with no energy
    Given I have no energy left
    Given I am enrolled in the course
    And I am on the "courses-page" page
    When I click on the "learning-path-card" card
    Then I should be on the "learning-path-page" page
    When I click on the "continue-learning-path-button" button
    Then I should be redirected to the "premium-page" page
    And I should see the "no-energy-left-section" section

  Scenario: User tries to start learning path review from learning path page with no energy
    Given I have no energy left
    Given I am enrolled in the course
    And I have no upcoming lesson
    And I am on the "courses-page" page
    When I click on the "learning-path-card" card
    Then I should be on the "learning-path-page" page
    When I click on the "review-learning-path-button" button
    Then I should be redirected to the "premium-page" page
    And I should see the "no-energy-left-section" section

  Scenario: User tries to start review from review page with no energy
    Given I have no energy left
    Given I am on the "review-page" page
    When I click on the "start-review-button" button
    Then I should be redirected to the "premium-page" page
    And I should see the "no-energy-left-section" section

