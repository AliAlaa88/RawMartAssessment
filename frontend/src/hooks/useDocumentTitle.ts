import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type PageTitle = "login" | "register" | "tasks";

const titleKeys: Record<PageTitle, string> = {
  login: "meta.loginTitle",
  register: "meta.registerTitle",
  tasks: "meta.tasksTitle",
};

export function useDocumentTitle(page: PageTitle) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t(titleKeys[page]);
  }, [t, page, i18n.language]);
}
