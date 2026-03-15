@notices
Feature: Homepage notices

  Background:
    Given I am logged in

  Scenario Outline: User sees and dismisses a homepage notice
    Given I have an unread "<noticeTestId>" notice
    When I am on the "home-page" page
    Then I should see the "<noticeTestId>" notice
    And I should see exactly 1 notice dialog
    When I click on the "continue-button" button
    Then I should be on the "home-page" page
    And I should not see the "<noticeTestId>" notice

    Examples:
      | noticeTestId              |
      | streak-milestone-notice   |
      | streak-lost-notice        |
      | streak-saved-notice       |
      | league-promoted-notice    |
      | league-demoted-notice     |
      | achievement-earned-notice |
      | free-trial-notice       |
      | free-trial-end-notice   |

  Scenario: User opens chest with a doubled reward after watching an ad
    Given I have an unread "chest-reward-notice" notice
    When I am on the "home-page" page
    Then I should see the "chest-reward-notice" notice
    When I click on the "get-double-reward-button" button
    Then I should see the "advertisement-fullscreen-dialog" section
    And I should see the "advertisement-continue-button" button
    When I wait for the advertisement to finish
    Then I should see the "advertisement-continue-button" button
    When I click on the "advertisement-continue-button" button
    Then I should see the "chest-reward-notice" notice
    And I should see the "double-reward-got-section" section
    When I click on the "continue-button" button
    Then I should be on the "home-page" page
    And I should not see the "chest-reward-notice" notice

