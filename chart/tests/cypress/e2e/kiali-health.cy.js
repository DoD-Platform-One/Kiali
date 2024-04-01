Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

before(() => {
  if (Cypress.env('keycloak_test_enable')) {
        cy.visit(Cypress.env('url'))
        cy.performKeycloakLogin(Cypress.env('tnr_username'), Cypress.env('tnr_password'))
  }
})

// Clear cookies to force login again
after(() => {
  Cypress.session.clearCurrentSessionData
})

function expandMenu() {
  cy.get('button[id="nav-toggle"]').invoke('attr', 'aria-expanded').then(($expanded) => {
    if ($expanded === 'false') {
      cy.get('button[id="nav-toggle"]').click()
    }
  })
}

function collapseMenu() {
  cy.get('button[id="nav-toggle"]').invoke('attr', 'aria-expanded').then(($expanded) => {
    if ($expanded === 'true') {
      cy.get('button[id="nav-toggle"]').click()
    }
  })
}

// Basic test that validates pages are accessible, basic error check
it('Check Kiali is accessible', function() {
  cy.visit(Cypress.env('url'))
  cy.title().should('contain', 'Kiali')
  expandMenu();
  cy.get('#traffic_graph_cy', { timeout: 60000 }).click();
  cy.get('#applications', { timeout: 60000 }).click();
  // Check for generic errors (this is the red circle that appears if any connectivity with Promtheus/Grafana/Istio is not working)
  cy.get('svg[fill="var(--pf-global--danger-color--100)"]').should('not.exist');
})

// Allow these tests to be skipped with an env variable
// These tests should only run in BB CI since nothing is istio injected in Package CI
if (Cypress.env("check_data")) {
  it('Check Kiali Graph page loads data', function() {
    cy.visit(Cypress.env('url'))
    cy.title().should("eq", "Kiali");
    expandMenu();
    cy.get('#traffic_graph_cy', { timeout: 60000 }).click();
    collapseMenu();
    cy.get('button[id="namespace-selector"').click()
    cy.get('input[type="checkbox"][value="monitoring"]').check()
    cy.get('button[id="refresh_button"').click({force: true})
    // Check for graph side panel because the main graph is tricky to grab
    cy.get('div[id="graph-side-panel"]', { timeout: 60000 }).should("be.visible")
  })

  it('Check Kiali Applications page loads data', function() {
    cy.visit(Cypress.env('url'))
    cy.title().should("eq", "Kiali");
    expandMenu();
    cy.get('#applications', { timeout: 60000 }).click();
    collapseMenu();
    cy.get('button[id="namespace-selector"]').click()
    //Only check the box for monitoring if it isn't already selected from previous test
    cy.get('input[type="checkbox"][value="monitoring"]').then(($checkbox) => {
      if (!$checkbox.prop('checked')) {
        cy.wrap($checkbox).check()
      }
    })
    cy.get('button[id="refresh_button"]').click({force: true})
    // This gets us to the prometheus application
    cy.get('a').filter((index, element) => {
      return element.textContent.trim() === 'prometheus';
    }).click();
    // Validate the graph is visible
    cy.contains('.Empty Graph', { timeout: 60000 }).should('not.exist');
    cy.contains('.Error loading Graph', { timeout: 60000 }).should('not.exist');
    // Load the outbound metrics tab
    // there's nothing easy to check on here since elements are dynamic but we can at least load the page for the video
    cy.get('#pf-tab-2-basic-tabs').click()
    // Load the tracing tab
    cy.get('#pf-tab-3-basic-tabs').click()
    // Validate that error is not displayed
    // NOTE: we don't check for actual traces because there can be delays in them displaying on the webpage
    cy.contains('Error fetching traces').should("not.exist")
  })
}
