import { lazy } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import SpotlightRootDecorator from "@enact/spotlight/SpotlightRootDecorator";
import { Provider } from "react-redux";
import { store } from "../store";

const Root = lazy(() => import("../views/(root)/Root"));
const Detail = lazy(() => import("../views/detail/Detail"));

const router = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="" element={<Root />} />
          <Route path="detail" element={<Detail />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </HashRouter>
    </Provider>
  );
};

export default SpotlightRootDecorator(router);
