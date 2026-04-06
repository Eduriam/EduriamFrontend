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

  Scenario: User changes email in profile settings
    Given I am signed in
    And I am on the "settings-page" page
    When I click on the "profile-settings-button" button
    Then I should see the "settings-profile-save-button" button
    When I enter "new.email@example.com" in the "settings-profile-email-field" field
    And I click on the "settings-profile-save-button" button
    Then The profile password reset email snackbar should be shown
    And The settings saved snackbar should not be shown

  Scenario: User changes name in profile settings
    Given I am signed in
    And I am on the "settings-page" page
    When I click on the "profile-settings-button" button
    Then I should see the "settings-profile-save-button" button
    When I enter "Updated Test Name" in the "settings-profile-name-field" field
    And I click on the "settings-profile-save-button" button
    Then The settings saved snackbar should be shown
