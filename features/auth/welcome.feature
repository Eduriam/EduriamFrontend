@welcome
Feature: Welcome page

  Scenario: User can see the welcome page
    Given I am on the "welcome-page" page
    Then I should see the "welcome-branding-section" section
    And I should see the "welcome-value-proposition-section" section
    And I should see the "signup-button" button
    And I should see the "signin-button" button

  Scenario: User can choose to sign in from the welcome page
    Given I am on the "welcome-page" page
    When I click on the "signin-button" button
    Then I should be on the "signin-page" page

  Scenario: User can choose to register from the welcome page
    Given I am on the "welcome-page" page
    When I click on the "signup-button" button
    Then I should be on the "signup-page" page

  Scenario: Signed-in user is redirected from the welcome page to the home page
    Given I am signed in
    And I am on the "welcome-page" page
    Then I should be redirected to the "home-page" page
