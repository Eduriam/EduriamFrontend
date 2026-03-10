@advertisement
Feature: UC-35 Advertisement after finishing learning or review

  Background:
    Given I am logged in

  Scenario: User completes learning and continues after fullscreen advertisement
    Given I am on the "study-page" page with the "lesson" defined
    When I wait for the explanation to finish
    Then I should see the "multiple-choice-exercise" exercise
    When I answer the "multiple-choice-exercise" exercise correctly
    And I click on the "check-answer-button" button
    Then I should see the "correct-answer" drawer
    When I click on the "continue-button" button
    Then I should see the "study-stats-section" section
    When I click on the "continue-button" button
    Then I should see the "advertisement-fullscreen-dialog" section
    And I should see the "continue-button" button
    When I wait for the advertisement to finish
    Then I should see the "continue-button" button
    When I click on the "continue-button" button
    Then I should be on the "home-page" page

  Scenario: User completes review and continues after fullscreen advertisement
    Given I am on the "review-page" page with the "course" defined
    Then I should see the "multiple-choice-exercise" exercise
    When I answer the "multiple-choice-exercise" exercise correctly
    And I click on the "check-answer-button" button
    Then I should see the "correct-answer" drawer
    When I click on the "continue-button" button
    Then I should see the "study-stats-section" section
    When I click on the "continue-button" button
    Then I should see the "advertisement-fullscreen-dialog" section
    And I should see the "continue-button" button
    When I wait for the advertisement to finish
    Then I should see the "continue-button" button
    When I click on the "continue-button" button
    Then I should be on the "home-page" page

  Scenario: User quits study session and continues after fullscreen advertisement
    Given I am on the "study-page" page with the "lesson" defined
    When I wait for the explanation to finish
    Then I should see the "multiple-choice-exercise" exercise
    And I should see the "quit-study-session-button" button
    When I click on the "quit-study-session-button" button
    Then I should see the "advertisement-fullscreen-dialog" section
    And I should see the "continue-button" button
    When I wait for the advertisement to finish
    Then I should see the "continue-button" button
    When I click on the "continue-button" button
    Then I should be on the "home-page" page

