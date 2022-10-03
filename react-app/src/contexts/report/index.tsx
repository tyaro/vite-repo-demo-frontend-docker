import React from "react";
import { ReportSettingContextType,ReportSettingType } from "../../types";

// レポート設定コンテキスト
const ReportSettingContext = React.createContext<ReportSettingContextType>({} as ReportSettingContextType);

// useReportSettingContext定義
export const useReportContext = ():ReportSettingContextType => {
  const reportContext= React.useContext<ReportSettingContextType>(ReportSettingContext);
  return reportContext
}

type Props = {
  children: React.ReactNode
}
// レポート設定コンテキストプロバイダ
export const AuthContextProvider = (props:Props) => {
  const [reportSetting, setReportSetting] = React.useState<ReportSettingType | null>(null);
  const select = (newReport: ReportSettingType, callback: () => void) => {
    setReportSetting(newReport);
    callback();
  }

  const unselect = (callback: () => void) => {
    setReportSetting(null);
    callback();
  }

  const value:ReportSettingContextType = { reportSetting,select,unselect };

  return (
    <ReportSettingContext.Provider value={value}>
      {props.children}
    </ReportSettingContext.Provider>
  );
}