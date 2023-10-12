// Types sheet for types used in multiple places

export type Exercise = {
  id: string;
  name: string;
  weight: number;
  category: string;
  reps: number[];
  intensity: number;
  time: number;
};

export type TabContentProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  addToast: (args: ToastArgs) => void;
};

export type ToastArgs = {
  message: string;
  type: "info" | "success" | "warning" | "error";
};
