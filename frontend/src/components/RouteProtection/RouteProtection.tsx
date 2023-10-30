import { Navigate, useRouteLoaderData } from "react-router-dom";

interface RouteProtectionProps {
  children: React.ReactNode;
}

function RouteProtection(props: RouteProtectionProps) {
  const token = useRouteLoaderData("root") as string | null;

  return !token ? (
    <Navigate to={"/login?mode=login"} replace />
  ) : (
    props.children
  );
}

export default RouteProtection;
