import {defineNuxtPlugin} from '#app'
import {applyTheme, argbFromHex, themeFromSourceColor} from "@material/material-color-utilities";
import {AppConfigInput} from "@nuxt/schema";

export default defineNuxtPlugin((nuxtApp) => {
  const moduleOptions: AppConfigInput['theme'] = nuxtApp.$config.theme;
  const {sourceColor, customColors} = moduleOptions;
  const theme = themeFromSourceColor(argbFromHex(sourceColor), customColors);
  applyTheme(theme)

  return {
    provide: {
      theme,
    }
  }
})
