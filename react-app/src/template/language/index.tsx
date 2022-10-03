import i18n from "i18next";
import { Button,ToggleButton,ToggleButtonGroup } from "@mui/material";
import React from 'react'
import { useTranslation } from "react-i18next";

const Component = () => {
  const [lang,setLang] = React.useState(i18n.language)
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newLang: string) =>{
      setLang(newLang)
      i18n.changeLanguage(newLang)
  }
  const {t} = useTranslation()
  return(
    <>
    <ToggleButtonGroup
      value={lang}
      defaultValue='ja'
      exclusive
      onChange={handleChange}
      aria-label={t("template.language.select","言語選択")}
    >
      <ToggleButton value='ja' aria-label="日本語">{t("template.language.japanese","日")}</ToggleButton>
      <ToggleButton value='en' aria-label="日本語">{t("template.language.english","英")}</ToggleButton>
    </ToggleButtonGroup>
    </>
  )
}

export default Component;

