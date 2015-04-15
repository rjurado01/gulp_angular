Feature: Home features
  As a user of cucumber.js
  I want to have documentation on cucumber
  So that I can concentrate on building awesome applications

  Background: Login
    Given I visit login page
    When  I fill in login form
    And   I click 'Sign in' button
    And   I wait 0.5 seconds
    Then  I should be redirected to home page

  Scenario: Check Home
    Then  I should see my email
    And   I should see colors list
    When  I click 'Push me' button
    Then  I see alert message
