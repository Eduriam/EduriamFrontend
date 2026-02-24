@lesson-learning
Feature: Lesson learning

  Background:
    Given I am logged in
    And I am on the "study-page" page

  Scenario: User completes lesson learning successfully
    Then I should see the "explanation-block-section" section
    When I wait for the explanation to finish
    And I click on the "continue-button" button
    Then I should see the "multiple-choice-exercise" exercise
    When I answer the "multiple-choice-exercise" exercise correctly
    And I click on the "check-answer-button" button
    Then I should see the "correct-answer" drawer
    When I click on the "continue-button" button
    Then I should see the "study-stats-section" section

  Scenario: User answers incorrectly once and then completes the exercise
    Then I should see the "explanation-block-section" section
    When I wait for the explanation to finish
    And I click on the "continue-button" button
    Then I should see the "multiple-choice-exercise" exercise
    When I answer the "multiple-choice-exercise" exercise incorrectly
    And I click on the "check-answer-button" button
    Then I should see the "incorrect-answer" drawer
    And I should see the "show-explanation-button" button
    And I should see the "retry-exercise-button" button
    When I click on the "show-explanation-button" button
    Then I should see the "explanation-section" section
    When I click on the "got-it-button" button
    Then I should see the "incorrect-answer" drawer
    When I click on the "retry-exercise-button" button
    Then I should see the "multiple-choice-exercise" exercise
    When I answer the "multiple-choice-exercise" exercise correctly
    And I click on the "check-answer-button" button
    Then I should see the "correct-answer" drawer
    When I click on the "continue-button" button
    Then I should see the "study-stats-section" section

  Scenario: User answers incorrectly three times and skips the exercise
    Then I should see the "explanation-block-section" section
    When I wait for the explanation to finish
    And I click on the "continue-button" button
    Then I should see the "multiple-choice-exercise" exercise
    When I answer the "multiple-choice-exercise" exercise incorrectly
    And I click on the "check-answer-button" button
    Then I should see the "incorrect-answer" drawer
    And I should see the "retry-exercise-button" button
    When I click on the "retry-exercise-button" button
    Then I should see the "multiple-choice-exercise" exercise
    When I answer the "multiple-choice-exercise" exercise incorrectly
    And I click on the "check-answer-button" button
    Then I should see the "incorrect-answer" drawer
    And I should see the "retry-exercise-button" button
    When I click on the "retry-exercise-button" button
    Then I should see the "multiple-choice-exercise" exercise
    When I answer the "multiple-choice-exercise" exercise incorrectly
    And I click on the "check-answer-button" button
    Then I should see the "incorrect-answer" drawer
    And I should see the "skip-exercise-button" button
    When I click on the "skip-exercise-button" button
    Then I should see the "study-stats-section" section
