@login
Feature: Login

  Scenario: User can see the login page
    Given I am on the "login-page" page
    Then I should see the "login-email-field" section
    And I should see the "login-password-field" section
    And I should see the "login-submit-button" button

  Scenario: User can log in with valid credentials
    Given I am on the "login-page" page
    When I enter "test.user@example.com" in the "login-email-field" field
    And I enter "ValidPassword123" in the "login-password-field" field
    And I click on the "login-submit-button" button
    Then I should be redirected to the "home-page" page

  Scenario: User cannot log in with invalid credentials
    Given I am on the "login-page" page
    When I enter "invalid.user@example.com" in the "login-email-field" field
    And I enter "wrong-password" in the "login-password-field" field
    And I click on the "login-submit-button" button
    Then I should remain on the "login-page" page

