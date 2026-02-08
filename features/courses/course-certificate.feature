@course-certificate
Feature: Course completion certificate

  Scenario: Premium user who completed course views certificate
    Given I am logged in as a premium user who completed the course
    And I am on the "courses-page" page
    When I click on the "course-card" card
    Then I should be on the "course-page" page
    And I should see the "view-certificate-button" button
    When I click on the "view-certificate-button" button
    Then I should be on the "certificate-page" page
    And I should see the "certificate-section" section

  Scenario: Premium user who has not completed course cannot view certificate
    Given I am logged in as a premium user who has not completed the course
    And I am on the "courses-page" page
    When I click on the "course-card" card
    Then I should be on the "course-page" page
    When I click on the "view-certificate-button" button
    Then I should see the "certificate-locked-drawer" drawer
    When I click on the "continue-button" button
    Then I should be on the "course-page" page

  Scenario: Non-premium user is redirected to premium benefits when requesting certificate
    Given I am logged in
    And I am on the "courses-page" page
    When I click on the "course-card" card
    Then I should be on the "course-page" page
    When I click on the "view-certificate-button" button
    Then I should be redirected to the "premium-page" page

  Scenario: Certificate is publicly viewable
    Given I am not logged in
    And I am on the "certificate-page" page
    Then I should see the "certificate-section" section
