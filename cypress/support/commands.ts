import "@testing-library/cypress/add-commands"

Cypress.Commands.add("visitPlayground", () => cy.visit("https://docs.smart2pay.com/category/getting-started/playground/"));
