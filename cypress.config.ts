import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'bpy413',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
