import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { isAuthenticated } from "../Utils/utilities";

export const authGaurd = ({ request }: LoaderFunctionArgs) => {
  if (!isAuthenticated()) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
};

export const loginGuard = () => {
  if (isAuthenticated()) {
    return redirect("/home");
  }
  return null;
};