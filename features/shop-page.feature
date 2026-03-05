@shop-page
Feature: Shop page

  Scenario: User purchases an unlocked shop item
    # Shop page 
    Given I am logged in
    And I have enough virtual currency
    And I have an unlocked item that is not purchased yet
    And I am on the "shop-page" page
    Then I should see the "virtual-currency-balance-section" section
    And I should see the "shop-item-categories" section
    # Shop category page
    When I click on the "shop-item-category" button
    Then I should be on the "shop-category-page" page
    And I should see the "shop-items-category-section" section
    # Item details drawer 
    When I click on the "shop-item-button" button
    Then I should see the "shop-item-details-section" section
    And I should see the "buy-item-button" button
    When I click on the "buy-item-button" button
    Then I should see the "shop-items-category-section" section
    And My virtual currency balance should be decreased

  Scenario: User clicks on an item but does not have enough virtual currency
    # Shop page 
    Given I am logged in
    And I do not have enough virtual currency
    And I have an unlocked item that is not purchased yet
    And I am on the "shop-page" page
    Then I should see the "virtual-currency-balance-section" section
    And I should see the "shop-item-categories" section
    # Shop category page
    When I click on the "shop-item-category" button
    Then I should be on the "shop-category-page" page
    And I should see the "shop-items-category-section" section
    # Item details drawer 
    When I click on the "shop-item-button" button
    Then I should see the "shop-item-details-section" section
    And I should see the "buy-item-disabled-button" button

  Scenario: User selects a locked shop item
    # Shop page
    Given I am logged in
    And I have a locked shop item
    And I am on the "shop-page" page
    Then I should see the "shop-item-categories" section
    # Shop category page
    When I click on the "shop-item-category" button
    Then I should be on the "shop-category-page" page
    And I should see the "shop-items-category-section" section
    # Item details drawer
    When I click on the "locked-shop-item-button" button
    Then I should see the "shop-item-details-section" section
    And I should see the "unlock-conditions-section" section
    And I should see the "buy-item-locked-button" button
