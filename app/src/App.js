import { lazy, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import SpotlightRootDecorator from "@enact/spotlight/SpotlightRootDecorator";
import { Provider } from "react-redux";
import { store } from "./store";
import spotlight from "@enact/spotlight";

const Root = lazy(() => import("./pages/(root)/page"));
const Detail = lazy(() => import("./pages/detail/page"));

const Router = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <FocusProvider>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/detail" element={<Detail />} />
          </Routes>
        </FocusProvider>
      </HashRouter>
    </Provider>
  );
};

export default SpotlightRootDecorator(Router);

// 페이지 마운트 시 기본포커스 제공자
const FocusProvider = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    spotlight.focus();
    spotlight.focus("init");
  }, [location]);

  return <>{children}</>;
};
