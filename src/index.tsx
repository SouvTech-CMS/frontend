import { Router } from "components/Router"
import React from "react"
import ReactDOM from "react-dom/client"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
