@code-editor-exercise
Feature: Code Editor Exercise
  
  Background:
    Given I am signed in
    And I am on the "study-page" page with the "lesson" defined
    And the lesson contains a code exercise 

  Scenario: User completes the code exercise correctly
    Then I should see the "code-exercise" exercise
    When I answer the "code-exercise" exercise correctly
    And I click on the "check-answer-button" button
    Then I should see the "correct-answer" drawer
    And I should see the "code-editor-result-section" section
    When I click on the "continue-button" button
    Then I should see the "study-stats-section" section

   Scenario: User completes the code exercise incorrectly
    Then I should see the "code-exercise" exercise
    When I answer the "code-exercise" exercise incorrectly
    And I click on the "check-answer-button" button
    Then I should see the "incorrect-answer" drawer
    And I should see the "show-explanation-button" button
    And I should see the "retry-exercise-button" button
    When I click on the "retry-exercise-button" button
    Then I should see the "code-exercise" exercise
    When I answer the "code-exercise" exercise correctly
    And I click on the "check-answer-button" button
    Then I should see the "correct-answer" drawer
    And I should see the "code-editor-result-section" section
    When I click on the "continue-button" button
    Then I should see the "study-stats-section" section
