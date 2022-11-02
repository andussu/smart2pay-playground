const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  retries :{
    openMode : 0,
    runMode: 2
  },
  e2e: {
    baseUrl: 'https://docs.smart2pay.com/category/getting-started/playground',
    chromeWebSecurity: false,
    reporter: "junit",
    screenshotsFolder: "snapshots/actual",
    trashAssetsBeforeRuns: true,
    videoUploadOnPasses: false,
    specPattern: 'cypress/tests/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});