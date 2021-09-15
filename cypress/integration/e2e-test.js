/// <reference types="cypress" />

describe("checks app", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  it("fetches api data and displays a graph", () => {
    cy.get(".MuiInputBase-input").type("GME");
    cy.get(
      ":nth-child(4) > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-8"
    ).click();
    cy.get("[data-testid=submit-button]").click();

    cy.wait(4000);
    cy.get("#reactgooglegraph-1").should("be.visible");
  });
  it("fetches a non existant api and returns an error", () => {
    cy.get(".MuiInputBase-input").type("GMOOOOOO");
    cy.get(
      ":nth-child(4) > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-8"
    ).click();
    cy.get("[data-testid=submit-button]").click();
    cy.wait(3000);
    cy.get(".error-message").contains(
      "Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for TIME_SERIES_INTRADAY."
    );
  });
});
