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

describe('Kiali', function () {
  // Basic test that validates pages are accessible, basic error check
  it('loads when visited', function () {
    cy.visit(Cypress.env('url'))
  })

  it('has a title containing "Kiali"', function () {
    cy.title().should('contain', 'Kiali')
  })

  it('pops out the side menu', function () {
    expandMenu();
  })

  it('loads the traffic graph page', function () {
    cy.get('#traffic_graph', { timeout: 60000 }).click();
  })

  it('loads the applications page', function () {
    cy.get('#applications', { timeout: 60000 }).click();
  })

  it('displays no connectivity errors', function () {
    // Check for generic errors (this is the red circle that appears if any connectivity with Promtheus/Grafana/Istio is not working)
    cy.get('svg[fill="var(--pf-global--danger-color--100)"]').should('not.exist');
  })

  it('should verify Kiali sidecar metrics are up', { retries: 3 }, function () {
    // assuming cypress env url is kiali.dev.bigbang.mil, use the base domain to compute prometheus url
    const prometheusBaseUrl = Cypress.env('url').replace('kiali', 'prometheus')
    const podMonitorName = Cypress.env("pod_monitor_name") || "monitoring-monitoring-kube-istio-envoy"

    // Load the Prometheus targets page with a specific scrape pool and filter (Kiali)
    cy.visit(`${prometheusBaseUrl}/targets?pool=podMonitor%2Fmonitoring%2F${podMonitorName}%2F0&search=kiali`)

    // Verify the scrape pool is displayed
    cy.contains(`podMonitor/monitoring/${podMonitorName}/0`).should('exist')

    // Get all table rows with target data and verify each shows "up" status (should be at least two)
    cy.get('table tbody tr').should('have.length.gte', 2).each(($row) => {
      // Each row should contain "up" status indicator
      cy.wrap($row).should('contain.text', 'up')
    })
  })

  // Skip remaining tests if check_data is not set
  // These tests should only run in BB CI since nothing is istio injected in Package CI
  if (!Cypress.env("check_data")) {
    return
  }

  context('check_data is set', function () {

    it('pops out the side menu', function () {
      cy.visit(Cypress.env('url'))
      expandMenu();
    })

    it('loads the traffic graph page', function () {
      cy.get('#traffic_graph', { timeout: 60000 }).click();
    })

    it('closes the side menu', function () {
      collapseMenu();
    })

    it('filters to the monitoring namespace', function () {
      cy.get('button[id="namespace-selector"').click()
      cy.get('input[type="checkbox"][value="monitoring"]').check()
      cy.get('button[id="refresh_button"').click({ force: true })
    })

    it('opens the graph side panel', function () {
      cy.get('div[id="graph-side-panel"]').should("be.visible")
    })

    it('pops out the side menu', function () {
      expandMenu();
    })

    it('loads the applications page', function () {
      cy.get('#applications', { timeout: 60000 }).click();
    })

    it('filters to the monitoring namespace if not already filtered', function () {
      collapseMenu();
      cy.get('button[id="namespace-selector"]').click()
      cy.get('input[type="checkbox"][value="monitoring"]').then(($checkbox) => {
        if (!$checkbox.prop('checked')) {
          cy.wrap($checkbox).check()
        }
      })
      cy.get('button[id="refresh_button"]').click({ force: true })
    })

    it('loads the prometheus application page', function () {
      cy.get('a').filter((index, element) => {
        return element.textContent.trim() === 'prometheus';
      }).click();
    })

    it('loads the prometheus graph', function () {
      cy.contains('.Empty Graph', { timeout: 60000 }).should('not.exist');
      cy.contains('.Error loading Graph', { timeout: 60000 }).should('not.exist');
    })

    it('loads the outbound metrics tab', function () {
      cy.get('#pf-tab-2-basic-tabs').click()
    })

    it('loads the tracing tab', function () {
      cy.get('#pf-tab-3-basic-tabs').click()
    })

    it('does not show any errors fetching traces', function () {
      cy.contains('Error fetching traces').should("not.exist")
    })
  })
})
