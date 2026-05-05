"use client";

import { Language } from "domain/models/types/languages";
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

import {
  UseTranslationOptions,
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";

import { getOptions } from "./settings";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../../public/locales/${language}/${namespace}.json`),
    ),
  )
  .init(getOptions());

export function useTranslation(
  ns: string,
  options: UseTranslationOptions = {},
) {
  return useTranslationOrg(ns, options);
}

export function setLanguage(language?: Language) {
  const options = getOptions();

  if (language) {
    if (i18next.resolvedLanguage !== language) {
      if (options.supportedLngs.includes(language)) {
        i18next.changeLanguage(language);
      } else {
        i18next.changeLanguage(options.fallbackLng);
      }
    }
  } else {
    i18next.changeLanguage(getBrowserLanguage());
  }
}

function getBrowserLanguage() {
  const options = getOptions();
  const detectedLanguage = navigator.language.split("-")[0];

  if (options.supportedLngs.includes(detectedLanguage as Language)) {
    return detectedLanguage;
  } else {
    return options.fallbackLng;
  }
}
