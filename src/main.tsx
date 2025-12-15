import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "./context/ThemeContext";
import { AppWrapper } from "./components/common/PageMeta";
import App from "./App";
import "./index.css";
import "./style.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import store from "./reduxStore/store";
import { setupAxios } from "./axios/axiosSetup";

setupAxios(store);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider>
      <AppWrapper>
        <App />
      </AppWrapper>
    </ThemeProvider>
  </Provider>
);
