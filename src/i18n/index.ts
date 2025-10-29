import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationRU from "./messages/ru.json";

i18n
  .use(LanguageDetector) // определяет язык автоматически
  .use(initReactI18next) // подключаем React
  .init({
    resources: {
      ru: { translation: translationRU },
    },
    fallbackLng: "ru",
    interpolation: { escapeValue: false },
    react: { useSuspense: false }, // ВАЖНО для исключения ошибок при SSR/рендере
  });

export default i18n;
