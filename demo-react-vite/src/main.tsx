import {
  createRoot
} from "react-dom/client";
import {
  BrowserRouter
} from "react-router";

import App from "./App.tsx";

import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(<BrowserRouter>
    <App />
  </BrowserRouter>);
} else {
  console.error("Root element not found");
}

// createRoot(document.getElementById("root")!).render(<StrictMode>
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// </StrictMode>);
