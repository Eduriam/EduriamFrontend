@signup
Feature: Signup

  Scenario: User can see the signup page
    Given I am on the "signup-page" page
    Then I should see the "signup-username-field" section
    And I should see the "signup-email-field" section
    And I should see the "signup-password-field" section
    And I should see the "signup-submit-button" button

  Scenario: User can sign up with valid data
    Given I am on the "signup-page" page
    When I enter "NewUser" in the "signup-username-field" field
    And I enter "new.user@example.com" in the "signup-email-field" field
    And I enter "ValidPassword123" in the "signup-password-field" field
    And I click on the "signup-terms-checkbox" button
    And I click on the "signup-submit-button" button
    Then I should be redirected to the "onboarding-page" page

  Scenario: User cannot sign up without accepting terms
    Given I am on the "signup-page" page
    When I enter "NewUser" in the "signup-username-field" field
    And I enter "new.user@example.com" in the "signup-email-field" field
    And I enter "ValidPassword123" in the "signup-password-field" field
    And I click on the "signup-submit-button" button
    Then I should remain on the "signup-page" page

