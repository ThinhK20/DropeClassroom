import ReactDOM from "react-dom/client";
import "./shared/css/index.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <RouterProvider router={router} />
      </LocalizationProvider>
   </Provider>
);
