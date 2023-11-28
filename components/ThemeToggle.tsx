import { toggleTheme } from "../store/reducers/themeSlice";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";

export default function Square() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);

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
