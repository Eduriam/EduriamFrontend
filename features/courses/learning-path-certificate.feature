@learning-path-certificate
Feature: Learning path completion certificate

  Scenario: Premium user who completed learning path views certificate
    Given I am signed in
    And I am a premium user
    And I have the learning path certificate
    And I am on the "courses-page" page
    When I click on the "learning-path-card" card
    Then I should be on the "learning-path-page" page
    And I should see the "view-certificate-button" button
    When I click on the "view-certificate-button" button
    Then I should be on the "certificate-page" page
    And I should see the "certificate-section" section

  Scenario: Premium user who has not completed learning path cannot view certificate
    Given I am signed in
    And I am a premium user
    And I do not have the learning path certificate
    And I am on the "courses-page" page
    When I click on the "learning-path-card" card
    Then I should be on the "learning-path-page" page
    When I click on the "view-certificate-button" button
    Then I should see the "certificate-locked-drawer" drawer
    When I click on the "continue-button" button
    Then I should be on the "learning-path-page" page

  Scenario: Non-premium user is redirected to premium benefits when requesting learning path certificate
    Given I am signed in
    And I am on the "courses-page" page
    When I click on the "learning-path-card" card
    Then I should be on the "learning-path-page" page
    When I click on the "view-certificate-button" button
    Then I should be redirected to the "premium-page" page

  Scenario: Learning path certificate is publicly viewable
    Given I am not signed in
    And I am on the "certificate-page" page
    Then I should see the "certificate-section" section

