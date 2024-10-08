import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/tailwind.css";
import { Toaster } from "./components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>
);
