import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/reducers/themeSlice";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useEffect } from "react";

export default function Square() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    if (theme) {
      document.cookie = `theme=${theme};path=/;`;
      document.querySelector("html")?.setAttribute("data-theme", theme);
    } else {
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
  }, [theme]);

  return (
    <>
      <DarkModeSwitch
        checked={theme === "dark"}
        onChange={() => dispatch(toggleTheme())}
        size={30}
      />
    </>
  );
}
