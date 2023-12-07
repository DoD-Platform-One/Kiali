module.exports = {
    defaultCommandTimeout: 60000,
    screenshot: true,
    screenshotOnRunFailure: true,
    video: true,
    videoCompression: 35,
    e2e: {
      experimentalMemoryManagement: true,
      numTestsKeptInMemory: 0,
      supportFile: false,
      testIsolation: false,
      setupNodeEvents(on, config) {
        // implement node event listeners here
      },
    },
  };