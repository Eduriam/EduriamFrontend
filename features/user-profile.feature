@user-profile-page
Feature: User profile page

  Scenario: User sees their own profile with summary information
    Given I am logged in
    And I am on the "user-profile-page" page
    Then I should see the "user-profile-header-section" section
    And I should see the "user-avatar-section" section
    And I should see the "current-league-section" section
    And I should see the "enrolled-courses-summary-section" section
    And I should see the "achievements-summary-section" section

  Scenario: User opens full list of achievements from profile page
    Given I am logged in
    And I am on the "user-profile-page" page
    Then I should see the "show-all-achievements-button" button
    When I click on the "show-all-achievements-button" button
    Then I should see the "achievements-list-section" section

  Scenario: User opens full list of enrolled courses from profile page
    Given I am logged in
    And I am on the "user-profile-page" page
    Then I should see the "show-all-enrolled-courses-button" button
    When I click on the "show-all-enrolled-courses-button" button
    Then I should see the "enrolled-courses-list-section" section
