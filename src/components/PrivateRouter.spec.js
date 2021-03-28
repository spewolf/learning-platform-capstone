import React from "react";
import { cleanup } from "@testing-library/react";
import renderWithRouter from "../helpers/renderWithRouter";
import "@testing-library/jest-dom/extend-expect";

import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./AuthProvider";

afterEach(cleanup);

function renderPrivateRoute(user) {
  return (
    <AuthContext.Provider value={user}>
      <PrivateRoute />
    </AuthContext.Provider>
  );
}

describe("when unauthenticated", () => {
  const user = {};

  it("redirects to the login page", async () => {
    const { history } = renderWithRouter(renderPrivateRoute(user));
    expect(history.location.pathname).toEqual("/login");
  });
});

describe("when authenticated without data", () => {
  const user = {currentUser: {}};

  it("redirects to the student or teacher page", async () => {
    const { history } = renderWithRouter(renderPrivateRoute(user));
    expect(history.location.pathname).toEqual("/register/student-or-teacher");
  });
});

describe("when authenticated with data", () => {
  const user = {currentUser: {data: {}}};

  it("does not redirect", async () => {
    const { history } = renderWithRouter(renderPrivateRoute(user));
    expect(history.location.pathname).toEqual("/");
  });
});
