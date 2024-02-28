import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import UserAuthContextProvider from "./components/context/UserAuthContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserAuthContextProvider>
      <App />
    </UserAuthContextProvider>
  </BrowserRouter>
);
