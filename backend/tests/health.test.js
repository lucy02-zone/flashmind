const request =
  require("supertest");

const app =
  require("../src/app");

describe(
  "Health API",
  () => {

    test(
      "Should return success",
      async () => {

        const response =
          await request(app)
            .get(
              "/api/health"
            );

        expect(
          response.statusCode
        ).toBe(200);

      }
    );

  }
);