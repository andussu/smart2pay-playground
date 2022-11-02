import "@testing-library/cypress/add-commands"

Cypress.Commands.add("visitPlayground", () => 
    cy.visit("https://docs.smart2pay.com/category/getting-started/playground/")
   );
Cypress.Commands.add("getByDataCy", (selector, ...args) => {
    return cy.get(`[data-cy="${selector}"]`, ...args);
  });