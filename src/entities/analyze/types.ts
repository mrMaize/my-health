interface IMark {
  mark: string | number;
  unit: string;
}

interface IAnalyze {
  name: string;
  date: string;
  marks: IMark[];
  laboratory: string;
}

export type { IAnalyze, IMark };
