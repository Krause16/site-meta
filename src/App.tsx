import { RouterProvider } from "react-router-dom"; // <--- O SEGREDO TÁ AQUI
import { router } from "./routes";

export default function App() {
  return <RouterProvider router={router} />;
}