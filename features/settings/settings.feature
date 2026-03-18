@settings
Feature: Settings

  Scenario: User changes notification settings
    Given I am signed in
    And I am on the "settings-page" page
    Then I should see the "notifications-settings-button" button
    When I click on the "notifications-settings-button" button
    Then I should be on the "notification-settings-page" page
    And I should see the "notification-settings-switch-button" button
    When I click on the "notification-settings-switch-button" button
    Then The notification settings should be saved

  Scenario: User changes theme to dark
    Given I am signed in
    And I am on the "settings-page" page
    Then I should see the "preferences-settings-button" button
    When I click on the "preferences-settings-button" button
    Then I should be on the "preferences-page" page
    And I should see the "appearance-mode-select-button" button
    When I click on the "appearance-mode-select-button" button
    Then I should see the "appearance-mode-select-drawer" section
    And I should see the "appearance-mode-dark-option-button" button
    When I click on the "appearance-mode-dark-option-button" button
    Then The theme should be changed to dark
