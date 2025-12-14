import { RouterProvider } from "react-router-dom";
import { mainRouter } from "./router/mainRouter";

// RouterProvider se encarga de renderizar las rutas definidas en mainRouter, no se
// necesita usar Router ni Route dentro de la App si ya se definieron en mainRouter
function App() {
  return <RouterProvider router={mainRouter} />;
}

export default App;
