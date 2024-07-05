import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import PrivateRoute from "../src/components/PrivateRoute";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.isPrivate ? (
                    <PrivateRoute>
                      <Page />
                    </PrivateRoute>
                  ) : (
                    <Page />
                  )
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
