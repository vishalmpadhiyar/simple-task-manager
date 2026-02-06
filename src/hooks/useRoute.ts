import { useEffect, useState } from "react";
import { ROUTE } from "../lib/const";
import type { Route } from "../lib/types";

export default function useRoute() {
  const [route, setRoute] = useState<Route>(() => {
    return (window.location.pathname as Route) || ROUTE.HOME;
  });

  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname as Route);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return { route };
}
