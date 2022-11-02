/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        visitPlayground(): Chainable<any>
    }
}