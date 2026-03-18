@study-block-report
Feature: Study block report

  Scenario: User reports a problem from an exercise block
    Given I am signed in
    And I am on the "study-page" page with the "lesson" defined

    Then I should see the "explanation-block-section" section
    When I wait for the explanation to finish
    Then I should see the "multiple-choice-exercise" exercise
    When I answer the "multiple-choice-exercise" exercise correctly
    And I click on the "check-answer-button" button
    Then I should see the "correct-answer" drawer
    And I should see the "report-study-block-button" button
    When I click on the "report-study-block-button" button
    Then I should see the "report-study-block-section" section
    And I should see the "problem-type-select-button" button
    And I should see the "problem-description-field" field
    When I click on the "problem-type-select-button" button
    Then I should see the "problem-type-select-drawer" section
    And I should see the "problem-group-section" section
    And I should see the "problem-option-exercise-not-understood-button" button
    When I click the "problem-option-exercise-not-understood-button" button
    Then I should see the "report-study-block-section" section
    When I enter "ProblemDescription" in the "problem-description-field" field
    And I click the "submit-button" button
    Then I should see the "thank-you-section" section
    And I should see the "thank-you-continue-button" button
    When I click the "thank-you-continue-button" button
    Then I should see the "multiple-choice-exercise" exercise
    And I should see the "correct-answer" drawer

  Scenario: User reports a problem from an explanation block
    Given I am signed in
    And I am on the "study-page" page with the "lesson" defined
  
    Then I should see the "explanation-block-section" section
    When I wait for the explanation to finish
    Then I should see the "multiple-choice-exercise" exercise
    And I should see the "previous-study-block-button" button
    When I click on the "previous-study-block-button" button
    Then I should see the "explanation-block-section" section
    And I should see the "report-study-block-button" button
    When I click on the "report-study-block-button" button
    Then I should see the "report-study-block-section" section
    And I should see the "problem-type-select-button" button
    And I should see the "problem-description-field" field
    When I click on the "problem-type-select-button" button
    Then I should see the "problem-type-select-drawer" section
    And I should see the "problem-group-section" section
    And I should see the "problem-option-explanation-not-understood-button" button
    When I click the "problem-option-explanation-not-understood-button" button
    Then I should see the "report-study-block-section" section
    When I enter "ProblemDescription" in the "problem-description-field" field
    And I click the "submit-button" button
    Then I should see the "thank-you-section" section
    And I should see the "thank-you-continue-button" button
    When I click the "thank-you-continue-button" button
    Then I should see the "explanation-block-section" exercise

  Scenario: Corrector reports a problem from an exercise block using extended problem types
    Given I am signed in as corrector
    And I am on the "study-page" page with the "lesson" defined
    Then I should see the "explanation-block-section" section
    When I wait for the explanation to finish
    Then I should see the "multiple-choice-exercise" exercise
    When I answer the "multiple-choice-exercise" exercise correctly
    And I click on the "check-answer-button" button
    Then I should see the "correct-answer" drawer
    And I should see the "report-study-block-button" button
    When I click on the "report-study-block-button" button
    Then I should see the "report-study-block-section" section
    And I should see the "problem-type-select-button" button
    And I should see the "problem-description-field" field
    When I click on the "problem-type-select-button" button
    Then I should see the "problem-type-select-drawer" section
    And I should see the "problem-group-corrector-section" section
    And I should see the "problem-option-lesson-structure-should-be-changed-button" button
    When I click the "problem-option-lesson-structure-should-be-changed-button" button
    Then I should see the "report-study-block-section" section
    When I enter "ProblemDescription" in the "problem-description-field" field
    And I click the "submit-button" button
    Then I should see the "thank-you-section" section
    And I should see the "thank-you-continue-button" button
    When I click the "thank-you-continue-button" button
    Then I should see the "multiple-choice-exercise" exercise
    And I should see the "correct-answer" drawer
