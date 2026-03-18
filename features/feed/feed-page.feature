@feed
Feature: Feed page progress updates from followed users

  Background:
    Given I am signed in

  Scenario Outline: User sees each supported type of progress update
    Given I have a "<messageVariant>" progress feed message from a followed user
    When I am on the "feed-page" page
    Then I should see the "feed-message-list-section" section
    And I should see the "<messageTestId>-feed-message-section" section
    And I should see the "<messageTestId>-add-reaction-button" button

    Examples:
      | messageVariant     | messageTestId      |
      | streak-milestone   | streak-milestone   |
      | achievement-earned | achievement-earned |
      | league-promoted    | league-promoted    |
      | course-completed   | course-completed   |

  Scenario Outline: User reacts to a progress update with an available emoticon
    Given I have a "streak-milestone" progress feed message from a followed user
    And I am on the "feed-page" page
    When I click on the "streak-milestone-add-reaction-button" button
    And I click on the "<reactionTestId>-reaction-option-button" button
    Then I should see the "streak-milestone-<reactionTestId>-reaction-section" section

    Examples:
      | reactionTestId |
      | confetti       |
      | heart          |
      | muscle         |
      | clapping-hands |
      | sunglasses     |

  Scenario: User is informed when there are no new progress updates
    Given there are no new progress feed messages from followed users
    When I am on the "feed-page" page
    Then I should see the "no-feed-messages-section" section
    And I should see the "no-feed-messages-text-section" section
    And I should see the "add-friends-button" button
