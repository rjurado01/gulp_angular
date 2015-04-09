Feature: Login feature
  As a user of cucumber.js
  I want to have documentation on cucumber
  So that I can concentrate on building awesome applications

  Scenario: Login Fail
    Given I visit login page
    And   I click 'Sign in' button
    Then  I should not be redirected to home page

  Scenario: Login Success
    Given I visit login page
    When  I fill in login form
    And   I click 'Sign in' button
    Then  I should be redirected to home page
