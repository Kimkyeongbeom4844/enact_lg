import { lazy, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import SpotlightRootDecorator from "@enact/spotlight/SpotlightRootDecorator";
import { Provider } from "react-redux";
import { store } from "./store";
import spotlight from "@enact/spotlight";
import { setWindowSize, setOrientation } from "./store/reducers/device";
import { useDispatch } from "react-redux";

const Root = lazy(() => import("./pages/(root)/page"));
const Detail = lazy(() => import("./pages/detail/page"));

// 페이지 마운트 시 기본포커스 제공자
const FocusProvider = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    spotlight.focus();
    spotlight.focus("init");
  }, [location]);

  return <>{children}</>;
};

const PortraitProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 화면 회전 이벤트 처리
    const handleScreenOrientationChange = (event) => {
      console.log(event.screenOrientation);
      window.webOSSystem.setWindowOrientation(event.screenOrientation);
      dispatch(setOrientation(event.screenOrientation));
    };

    // 윈도우 리사이즈 이벤트 처리
    const handleWindowResize = () => {
      console.log("window.innerWidth", window.innerWidth);
      console.log("window.innerHeight", window.innerHeight);
      dispatch(
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      );
    };

    if (window.webOSSystem) {
      handleScreenOrientationChange(window.webOSSystem);
    }
    handleWindowResize();

    document.addEventListener(
      "screenOrientationChange",
      handleScreenOrientationChange
    );
    window.addEventListener("resize", handleWindowResize);

    return () => {
      document.removeEventListener(
        "screenOrientationChange",
        handleScreenOrientationChange
      );
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return <>{children}</>;
};

const Router = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <PortraitProvider>
          <FocusProvider>
            <Routes>
              <Route path="/" element={<Root />} />
              <Route path="/detail" element={<Detail />} />
            </Routes>
          </FocusProvider>
        </PortraitProvider>
      </HashRouter>
    </Provider>
  );
};

export default SpotlightRootDecorator(Router);
