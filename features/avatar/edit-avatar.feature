@edit-avatar-page
Feature: Edit avatar page

  Scenario: User customizes avatar and saves changes
    # Edit avatar page
    Given I am logged in
    And I have purchased avatar customization items
    And I am on the "edit-avatar-page" page
    Then I should see the "avatar-preview-section" section
    And I should see the "item-categories-section" section
    When I click on the "item-category" button
    # Item category page
    Then I should be on the "item-category-page" page
    And I should see the "avatar-preview-section" section
    And I should see the "items-category-section" section
    When I click on the "unequipped-item-button" button
    Then I should see the updated avatar preview
    When I click on the "back-button" button
    Then I should be on the "edit-avatar-page" page
    And I should see the updated avatar preview
    When I click on the "save-avatar-button" button
    Then I should be redirected to the "user-page" page

  Scenario: User discards avatar customization changes before saving
    # Edit avatar page
    Given I am logged in
    And I have purchased avatar customization items
    And I am on the "edit-avatar-page" page
    Then I should see the "avatar-preview-section" section
    And I should see the "item-categories-section" section
    When I click on the "item-category" button
    # Item category page
    Then I should be on the "item-category-page" page
    And I should see the "avatar-preview-section" section
    And I should see the "items-category-section" section
    When I click on the "unequipped-item-button" button
    Then I should see the updated avatar preview
    When I click on the "back-button" button
    Then I should be on the "edit-avatar-page" page
    And I should see the updated avatar preview
    # Leave avatar editor
    When I click on the "leave-button" button
    Then I should see the "leave-avatar-editor-section" section
    And I should see the "keep-editing-button" button
    And I should see the "discard-changes-button" button
    Then I should be redirected to the "user-page" page
