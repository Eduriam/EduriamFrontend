@settings
Feature: Study reminder settings

  Scenario: User changes study remindernotification settings
    Given I am signed in
    And I am on the "settings-page" page
    Then I should see the "notifications-settings-button" button
    When I click on the "notifications-settings-button" button
    Then I should be on the "notification-settings-page" page
    And I should see the "study-reminder-notification-settings-switch-button" button
    When I click on the "study-reminder-notification-settings-switch-button" button
    Then The notification settings should be saved
