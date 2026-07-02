import { useEffect, useState } from "react";
import { assertNever, parseRoute } from "./domain";
import type { RouteState } from "./domain";
import { HomePage, InvalidPage, StudentPage } from "./screens";

function useRouteState(): readonly [RouteState, (nextRoute: RouteState) => void] {
  const [route, setRoute] = useState<RouteState>(() => parseRoute(window.location.pathname));

  useEffect(() => {
    const handlePopState = (): void => setRoute(parseRoute(window.location.pathname));
    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (nextRoute: RouteState): void => {
    const path =
      nextRoute.kind === "student"
        ? `/student/${nextRoute.number}`
        : "/";

    window.history.pushState(null, "", path);
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return [route, navigate] as const;
}

export function App(): React.JSX.Element {
  const [route, navigate] = useRouteState();

  switch (route.kind) {
    case "home":
      return <HomePage onSelectStudent={(number) => navigate({ kind: "student", number })} />;
    case "student":
      return <StudentPage number={route.number} onHome={() => navigate({ kind: "home" })} />;
    case "invalid":
      return <InvalidPage onHome={() => navigate({ kind: "home" })} />;
    default:
      return assertNever(route);
  }
}
