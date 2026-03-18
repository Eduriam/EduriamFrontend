@google-signin
Feature: Signin with Google

  Scenario: User can sign in with a Google account
    Given I am on the "signin-page" page
    When I click on the "signin-google-button" button
    And I complete Google authentication successfully
    Then I should be redirected to the "home-page" page

  Scenario: User cannot sign in with Google if linked account does not exist
    Given No user account is linked to the Google account
    And I am on the "signin-page" page
    When I click on the "signin-google-button" button
    And I complete Google authentication successfully
    Then I should remain on the "signin-page" page
    And I should see the "signin-google-account-not-found-section" section
    And I should see the "signin-google-signup-button" button

  Scenario: User cancels Google signin
    Given I am on the "signin-page" page
    When I click on the "signin-google-button" button
    And I cancel Google authentication
    Then I should remain on the "signin-page" page
