import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News/News";
import { Route, Routes, Outlet, BrowserRouter } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import CountryContext from "./context/CountryContext";

const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <CountryContext>
              <Navbar />
              <LoadingBar
                color="#55ccff"
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                height={4}
              />
              <Outlet />
            </CountryContext>
          }
        >
          <Route
            index
            element={
              <News
                setProgress={setProgress}
                key={1}
                category="general"
              />
            }
          />

          <Route path="about" element={""} />

          <Route
            path="business"
            element={
              <News
                setProgress={setProgress}
                key={2}
                category="business"
              />
            }
          />

          <Route
            path="entertainment"
            element={
              <News
                setProgress={setProgress}
                key={3}
                category="entertainment"
              />
            }
          />

          <Route
            path="health"
            element={
              <News
                setProgress={setProgress}
                key={4}
                category="health"
              />
            }
          />

          <Route
            path="science"
            element={
              <News
                setProgress={setProgress}
                key={5}
                category="science"
              />
            }
          />

          <Route
            path="sports"
            element={
              <News
                setProgress={setProgress}
                key={6}
                category="sports"
              />
            }
          />

          <Route
            path="technology"
            element={
              <News
                setProgress={setProgress}
                key={7}
                category="technology"
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
