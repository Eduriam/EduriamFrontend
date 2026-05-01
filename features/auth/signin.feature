@signin
Feature: Signin

  Scenario: User can see the signin page
    Given I am on the "signin-page" page
    Then I should see the "signin-email-field" section
    And I should see the "signin-password-field" section
    And I should see the "signin-submit-button" button

  Scenario: User can sign in with valid credentials
    Given I am on the "signin-page" page
    When I enter "test.user@example.com" in the "signin-email-field" field
    And I enter "ValidPassword123" in the "signin-password-field" field
    And I click on the "signin-submit-button" button
    Then I should be redirected to the "home-page" page

  Scenario: User cannot sign in with invalid credentials
    Given I am on the "signin-page" page
    When I enter "invalid.user@example.com" in the "signin-email-field" field
    And I enter "wrong-password" in the "signin-password-field" field
    And I click on the "signin-submit-button" button
    Then I should remain on the "signin-page" page
    And I should see the text "Zadali jste nesprávný email nebo heslo."

  Scenario: User cannot sign in with a wrong email
    Given I am on the "signin-page" page
    When I enter "wrong-email@example.com" in the "signin-email-field" field
    And I enter "ValidPassword123" in the "signin-password-field" field
    And I click on the "signin-submit-button" button
    Then I should remain on the "signin-page" page
    And I should see the text "Zadali jste nesprávný email."

  Scenario: User cannot sign in before confirming email
    Given I am on the "signin-page" page
    When I enter "unconfirmed@example.com" in the "signin-email-field" field
    And I enter "ValidPassword123" in the "signin-password-field" field
    And I click on the "signin-submit-button" button
    Then I should remain on the "signin-page" page
    And I should see the text "Emailová adresa není potvrzená."
