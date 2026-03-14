@google-signup
Feature: Signup with Google

  Scenario: User can sign up with a Google account
    Given I am on the "signup-page" page
    When I click on the "signup-google-button" button
    And I complete Google authentication successfully
    Then I should be redirected to the "onboarding-page" page

  Scenario: User cannot sign up with Google if account with same email already exists
    Given A user account already exists for the Google email
    And I am on the "signup-page" page
    When I click on the "signup-google-button" button
    And I complete Google authentication successfully
    Then I should remain on the "signup-page" page
    And I should see the "signup-google-account-exists-section" section
    And I should see the "signup-existing-account-login-button" button

  Scenario: User cancels Google signup
    Given I am on the "signup-page" page
    When I click on the "signup-google-button" button
    And I cancel Google authentication
    Then I should remain on the "signup-page" page
