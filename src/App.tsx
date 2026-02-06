import { useMemo } from "react";
import { ROUTE } from "./lib/const";
import useRoute from "./hooks/useRoute";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import GuidePage from "./pages/GuidePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const { route } = useRoute();

  const pageFound = useMemo(
    () =>
      route === ROUTE.HOME || route === ROUTE.ABOUT || route === ROUTE.GUIDE,
    [route],
  );

  return (
    <>
      {!route && <div>Loading...</div>}
      {route === ROUTE.HOME && <HomePage />}
      {route === ROUTE.ABOUT && <AboutPage />}
      {route === ROUTE.GUIDE && <GuidePage />}
      {route && !pageFound && <NotFoundPage />}
    </>
  );
}
