import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
// Importe as outras páginas aqui quando criar, ex:
// import CS2Hub from "./pages/CS2Hub";
// import ValorantHub from "./pages/ValorantHub";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/cs2",
    element: <div>Página CS2 (Em construção)</div>, // Placeholder pra não quebrar
    // element: <CS2Hub />, 
  },
  {
    path: "/valorant",
    element: <div>Página Valorant (Em construção)</div>, // Placeholder pra não quebrar
    // element: <ValorantHub />,
  }
]);