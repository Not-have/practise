// TODO 需要优化
export type TOptions =
  | ({
      type: "navigateTo";
      query?: Record<string, any>;
      params?: Record<string, any>;
    } & Omit<UniNamespace.NavigateToOptions, "events">)
  | ({ type: "navigateBack" } & UniNamespace.NavigateBackOptions)
  | {
      type: "redirectTo" | "reLaunch";
      url: string;
      query?: Record<string, any>;
    }
  | { type: "switchTab"; url: string };
