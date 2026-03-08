@edit-avatar-page
Feature: Edit avatar page

  Scenario: User customizes avatar and saves changes
    Given I am logged in
    And I have purchased avatar customization items
    And I am on the "user-page" page
    And I click on the "edit-avatar-button" button
    Then I should be redirected to the "edit-avatar-page" page
    And I should see the "avatar-preview-section" section
    And I should see the "item-categories-section" section
    When I click on the "item-category" button
    Then I should see the "item-category-dialog" section
    And I should see the "avatar-preview-dialog-section" section
    And I should see the "items-category-section" section
    When I click on the "unequipped-item-button" button
    Then I should see the updated avatar preview
    When I click on the "back-button" button
    Then I should be on the "edit-avatar-page" page
    And I should see the updated avatar preview
    When I click on the "save-avatar-button" button
    Then I should be redirected to the "user-page" page

  Scenario: User discards avatar customization changes before saving
    Given I am logged in
    And I have purchased avatar customization items
    And I am on the "user-page" page
    And I click on the "edit-avatar-button" button
    Then I should be redirected to the "edit-avatar-page" page
    And I should see the "avatar-preview-section" section
    And I should see the "item-categories-section" section
    When I click on the "item-category" button
    Then I should see the "item-category-dialog" section
    And I should see the "avatar-preview-dialog-section" section
    And I should see the "items-category-section" section
    When I click on the "unequipped-item-button" button
    Then I should see the updated avatar preview
    When I click on the "back-button" button
    Then I should be on the "edit-avatar-page" page
    And I should see the updated avatar preview
    When I click on the "leave-button" button
    Then I should see the "leave-avatar-editor-section" section
    And I should see the "keep-editing-button" button
    And I should see the "discard-changes-button" button
    When I click on the "discard-changes-button" button
    Then I should be redirected to the "user-page" page
