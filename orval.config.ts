import { defineConfig } from "orval";

export default defineConfig({
  eduriamBackend: {
    input: {
      target: "https://api.stage.eduriam.com/swagger/v1/swagger.json",
    },
    output: {
      target: "./src/infrastructure/api/generated/endpoints.ts",
      schemas: "./src/infrastructure/api/generated/models",
      client: "axios",
      mode: "tags-split",
      clean: true,
      prettier: true,
    },
  },
});
