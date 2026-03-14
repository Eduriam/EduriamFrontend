@google-login
Feature: Login with Google

  Scenario: User can log in with a Google account
    Given I am on the "login-page" page
    When I click on the "login-google-button" button
    And I complete Google authentication successfully
    Then I should be redirected to the "home-page" page

  Scenario: User cannot log in with Google if linked account does not exist
    Given No user account is linked to the Google account
    And I am on the "login-page" page
    When I click on the "login-google-button" button
    And I complete Google authentication successfully
    Then I should remain on the "login-page" page
    And I should see the "login-google-account-not-found-section" section
    And I should see the "login-google-signup-button" button

  Scenario: User cancels Google login
    Given I am on the "login-page" page
    When I click on the "login-google-button" button
    And I cancel Google authentication
    Then I should remain on the "login-page" page
