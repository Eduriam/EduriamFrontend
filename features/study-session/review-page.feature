@review
Feature: Review

  Background:
    Given I am logged in
    And I am on the "review-page" page

  Scenario: User completes lesson review successfully
    Then I should see the "multiple-choice-exercise" exercise
    When I answer the "multiple-choice-exercise" exercise correctly
    And I click on the "check-answer-button" button
    Then I should see the "correct-answer" drawer
    When I click on the "continue-button" button
    Then I should see the "study-stats-section" section

  Scenario: User answers incorrectly once and then completes the exercise in review
    # First exercise
    Then I should see the "multiple-choice-exercise" exercise
    When I answer the "multiple-choice-exercise" exercise incorrectly
    And I click on the "check-answer-button" button
    Then I should see the "incorrect-answer" drawer
    And I should see the "show-explanation-button" button
    And I should see the "retry-exercise-button" button
    When I click on the "show-explanation-button" button
    Then I should see the "exercise-answer-explanation-section" section
    When I click on the "got-it-button" button
    Then I should see the "incorrect-answer" drawer

    # First exercise retry
    When I click on the "retry-exercise-button" button
    Then I should see the "multiple-choice-exercise" exercise
    When I answer the "multiple-choice-exercise" exercise correctly
    And I click on the "check-answer-button" button
    Then I should see the "correct-answer" drawer
    When I click on the "continue-button" button

    # Second exercise
    Then I should see the "multiple-choice-exercise" exercise
    When I answer the "multiple-choice-exercise" exercise correctly
    And I click on the "check-answer-button" button
    Then I should see the "correct-answer" drawer
    When I click on the "continue-button" button
    Then I should see the "study-stats-section" section

  Scenario: User answers incorrectly three times and skips the exercise in review
    # Exercise first attempt
    Then I should see the "multiple-choice-exercise" exercise
    When I answer the "multiple-choice-exercise" exercise incorrectly
    And I click on the "check-answer-button" button
    Then I should see the "incorrect-answer" drawer
    And I should see the "retry-exercise-button" button

    # Exercise second attempt
    When I click on the "retry-exercise-button" button
    Then I should see the "multiple-choice-exercise" exercise
    When I answer the "multiple-choice-exercise" exercise incorrectly
    And I click on the "check-answer-button" button
    Then I should see the "incorrect-answer" drawer
    And I should see the "retry-exercise-button" button

    # Exercise third attempt
    When I click on the "retry-exercise-button" button
    Then I should see the "multiple-choice-exercise" exercise
    When I answer the "multiple-choice-exercise" exercise incorrectly
    And I click on the "check-answer-button" button
    Then I should see the "incorrect-answer" drawer
    
    # Exercise skip
    And I should see the "skip-exercise-button" button
    When I click on the "skip-exercise-button" button
    Then I should see the "study-stats-section" section
