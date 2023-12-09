import ReactDOM from "react-dom/client";
import "./shared/css/index.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <Provider store={store}>
      <PersistGate persistor={persistor}>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
            <ToastContainer />
         </LocalizationProvider>
      </PersistGate>
   </Provider>
);
