@home-page
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
      | advertisement-notice      |
