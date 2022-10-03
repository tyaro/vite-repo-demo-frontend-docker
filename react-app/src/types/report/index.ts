// ロール型定義
export const InputType = {
  manual: '手動入力',
  auto: '自動入力',
};

export const DataType ={
  check: 'チェック',
  select:'選択',
  numerical: '数値入力',
  text:'テキスト',
}

export type InputType = typeof InputType[keyof typeof InputType];
export const AllInputType = Object.values(InputType);
export type DataType = typeof DataType[keyof typeof DataType];
export const AllDataType = Object.values(DataType);

// レポート型定義
export type ReportSettingRowType = {
  DispName: string;
  InputType: InputType;
  DataType: DataType;
  Sheet: string;
  cell: string;
  options: string;
}

export type ReportSettingType = {
  name: string
  template_file: string
  options: Array<ReportSettingRowType>
}

// レポートコンテキスト型定義
export type ReportSettingContextType = {
  reportSetting: ReportSettingType | null;
  select: (reportSetting:ReportSettingType, callback:() => void) => void;
  unselect: (callback:() => void) => void;
}