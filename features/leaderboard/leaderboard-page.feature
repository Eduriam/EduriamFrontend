@leaderboard-page
Feature: Leaderboard page

  Scenario: User views the leaderboard in the current week
    Given I am logged in
    And I am on the "leaderboard-page" page
    Then I should see the "current-league-icon" section
    And I should see the "leaderboard-section" section
    And I should see the "leaderboard-users-section" section
    And I should see the "current-user-leaderboard-section" section
    And I should see the "time-left-section" section

  Scenario: User has not studied this week
    Given I am logged in
    And I have not studied in the current week
    And I am on the "leaderboard-page" page
    Then I should see the "complete-lesson-or-review-section" section
