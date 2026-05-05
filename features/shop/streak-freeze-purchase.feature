@shop-streak-freeze
Feature: Shop streak freeze purchase

  Scenario: User purchases a streak freeze item in the shop
    Given I am signed in
    And I have enough virtual currency
    And I have an unlocked item that is not purchased yet
    And I am on the "shop-page" page
    Then I should see the "virtual-currency-balance-section" section
    And I should see the "streak-freeze-items-section" section
    When I click on the "streak-freeze-item-button" button
    Then I should see the "shop-item-details-section" section
    And I should see the "buy-item-button" button
    When I click on the "buy-item-button" button
    Then I should see the "streak-freeze-items-section" section
    And My virtual currency balance should be decreased

