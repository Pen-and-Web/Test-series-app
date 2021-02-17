import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUserLocalStorage } from "./../../services/authService";

export default function ProtectedRoute({
  component: Component,
  render,
  ...rest
}) {
  const user = getUserLocalStorage();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        return render ? render(props) : <Component {...props} />;
      }}
    />
  );
}
