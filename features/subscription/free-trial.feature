@free-trial
Feature: Free trial subscription

  Scenario: User activates free trial from home page
    Given I am signed in
    Given I have an unread "free-trial-notice" notice
    And I am on the "home-page" page
    Then I should see the "free-trial-notice-section" section
    And I should see the "premium-benefits-section" section
    And I should see the "start-free-trial-button" button
    When I click on the "start-free-trial-button" button
    Then I should be on the "free-trial-page" page
    And I should see the "free-trial-reminder-info-section" section
    And I should see the "start-free-trial-button" button
    When I click on the "start-free-trial-button" button
    Then I should see the "subscription-payment-form-section" section
    When I fill in the payment details
    And I click on the "confirm-free-trial-button" button
    Then I should see the "free-trial-activated-section" section
    When I click on the "continue-button" button
    Then I should be on the "home-page" page

  Scenario: User activates free trial from premium page
    Given I am signed in
    And I am on the "premium-page" page
    Then I should be on the "premium-page" page
    And I should see the "start-free-trial-button" button
    When I click on the "start-free-trial-button" button
    Then I should be on the "free-trial-page" page
    And I should see the "free-trial-reminder-info-section" section
    And I should see the "start-free-trial-button" button
    When I click on the "start-free-trial-button" button
    Then I should see the "subscription-payment-form-section" section
    When I fill in the payment details
    And I click on the "confirm-free-trial-button" button
    Then I should see the "free-trial-activated-section" section
    When I click on the "continue-button" button
    Then I should be on the "home-page" page

  Scenario: User cancels free trial during trial period
    Given I am a premium user
    And I am on the "premium-page" page
    Then I should see the "manage-subscription-button" button
    When I click on the "manage-subscription-button" button
    Then I should be on the "manage-subscription-page" page
    And I should see the "cancel-subscription-button" button
    When I click on the "cancel-subscription-button" button
    Then I should see the "subscription-cancel-reason-section" section
    When I select "other-option" option in the "subscription-cancel-reason-radio-group" radio group
    And I click on the "continue-button" button
    Then I should see the "confirm-cancel-subscription-section" section
    And I should see the "cancel-subscription-confirm-button" button
    When I click on the "cancel-subscription-confirm-button" button
    Then I should see the "subscription-canceled-section" section
    And I should see the "continue-button" button
    When I click on the "continue-button" button
    Then I should be on the "home-page" page
