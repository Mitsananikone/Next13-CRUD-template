/** @format */

import { useEffect } from "react";
import { useRouter } from "next/router";

import { userService } from "services";

export { Layout };

function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      router.push("/");
    }
  }, []);

  return (
    <div className="col-span-6 md:col-span-3 mt-5 md:mt-0">{children}</div>
  );
}
