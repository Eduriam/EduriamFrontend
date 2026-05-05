@notifications
Feature: Push notifications

  Background:
    Given I am signed in

  Scenario: User enables push notifications from home page
    Given I am on the "home-page" page
    And I have an unread "enable-notifications-notice" notice
    Then I should see the "enable-notifications-notice" notice
    And I should see exactly 1 notice dialog
    When I click on the "enable-push-notifications-button" button
    Then I should see the browser push notification permission prompt
    When I grant the browser push notification permission
    Then I should be on the "home-page" page
    And I should not see the "enable-notifications-notice" notice

  Scenario: User declines push notifications
    Given I am on the "home-page" page
    And I have an unread "enable-notifications-notice" notice
    Then I should see the "enable-notifications-notice" notice
    And I should see exactly 1 notice dialog
    When I click on the "enable-push-notifications-button" button
    Then I should see the browser push notification permission prompt
    When I deny the browser push notification permission
    Then I should see the "enable-notifications-notice" notice
    When I click on the "continue-button" button
    Then I should be on the "home-page" page

  Scenario: User receives and opens a push notification when notification type is enabled
    Given The "study-reminder-notification" notification type is enabled in settings
    And I have push notifications allowed
    And A push notification event for "study-reminder-notification" occurs
    Then I should receive the "study-reminder-notification" push notification
    When I click the "study-reminder-notification" push notification
    Then I should be on the "home-page" page

  Scenario: User does not receive a push notification when notification type is disabled
    Given The "study-reminder-notification" notification type is disabled in settings
    And I have push notifications allowed
    And A push notification event for "study-reminder-notification" occurs
    Then I should not receive the "study-reminder-notification" push notification
