import { test, expect } from "@playwright/test";

const baseURL = "https://reqres.in/api";

test.describe("Reqres API Testing", () => {
  test("GET /users?page=2 - List users", async ({ request }) => {
    const response = await request.get(`${baseURL}/users?page=2`);
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    expect(responseData).toHaveProperty("page", 2);
    expect(responseData).toHaveProperty("data");
    expect(Array.isArray(responseData.data)).toBe(true);

    const firstUser = responseData.data[0];
    expect(firstUser).toHaveProperty("id");
    expect(firstUser).toHaveProperty("email");
    expect(firstUser).toHaveProperty("first_name");
    expect(firstUser).toHaveProperty("last_name");
  });

  test("POST /users - Create a new user", async ({ request }) => {
    const newUser = {
      name: "John Doe",
      job: "Software Engineer",
    };

    const response = await request.post(`${baseURL}/users`, {
      data: newUser,
    });

    expect(response.status()).toBe(201);

    const responseData = await response.json();
    expect(responseData).toMatchObject(newUser);
    expect(responseData).toHaveProperty("id");
    expect(responseData).toHaveProperty("createdAt");
  });

  test("PUT /users/:id - Update a user", async ({ request }) => {
    const updatedUser = {
      name: "John Doe",
      job: "Senior Software Engineer",
    };

    const response = await request.put(`${baseURL}/users/2`, {
      data: updatedUser,
    });

    expect(response.status()).toBe(200);

    const responseData = await response.json();
    expect(responseData).toMatchObject(updatedUser);
    expect(responseData).toHaveProperty("updatedAt");
  });

  test("DELETE /users/:id - Delete a user", async ({ request }) => {
    const response = await request.delete(`${baseURL}/users/2`);
    expect(response.status()).toBe(204); // No content
  });
});
