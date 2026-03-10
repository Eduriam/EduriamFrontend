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
    And I should see the "advertisement-continue-button" button
    When I wait for the advertisement to finish
    Then I should see the "advertisement-continue-button" button
    When I click on the "advertisement-continue-button" button
    Then I should be on the "review-page" page

  Scenario: User completes review and continues after fullscreen advertisement
    Given I have content to review
    And I am on the "home-page" page
    Then I should see the "review-tab-button" button
    When I click on the "review-tab-button" button
    Then I should see the "review-section" section
    And I should see the "start-review-button" button
    When I click on the "start-review-button" button
    Then I should be redirected to the "review-page" page
    Then I should see the "multiple-choice-exercise" exercise
    When I answer the "multiple-choice-exercise" exercise correctly
    And I click on the "check-answer-button" button
    Then I should see the "correct-answer" drawer
    When I click on the "continue-button" button
    Then I should see the "study-stats-section" section
    When I click on the "continue-button" button
    Then I should see the "advertisement-fullscreen-dialog" section
    And I should see the "advertisement-continue-button" button
    When I wait for the advertisement to finish
    Then I should see the "advertisement-continue-button" button
    When I click on the "advertisement-continue-button" button
    Then I should be on the "home-page" page

  Scenario: User quits study session and continues after fullscreen advertisement
    Given I have an upcoming lesson
    And I am on the "home-page" page
    Then I should see the "start-upcoming-lesson-button" button
    When I click on the "start-upcoming-lesson-button" button
    Then I should be redirected to the "study-page" page
    When I wait for the explanation to finish
    Then I should see the "multiple-choice-exercise" exercise
    And I should see the "quit-study-session-button" button
    When I click on the "quit-study-session-button" button
    Then I should see the "advertisement-fullscreen-dialog" section
    And I should see the "advertisement-continue-button" button
    When I wait for the advertisement to finish
    Then I should see the "advertisement-continue-button" button
    When I click on the "advertisement-continue-button" button
    Then I should be on the "home-page" page
