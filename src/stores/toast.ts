import { defineStore } from "pinia";

export type ToastType = "success" | "error" | "info";
export type Toast = {
  id: number;
  message: string;
  title?: string;
  type?: ToastType;
  duration?: number;
};

export const useToastStore = defineStore("toast", {
  state: () => ({ toasts: [] as Toast[], counter: 0 }),
  actions: {
    show(message: string, opts: Partial<Omit<Toast, "id" | "message">> = {}) {
      const id = ++this.counter;
      const toast: Toast = {
        id,
        message,
        type: "info",
        duration: 3000,
        ...opts,
      };
      this.toasts.push(toast);
      if (toast.duration) setTimeout(() => this.hide(id), toast.duration);
      return id;
    },
    hide(id: number) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    },
  },
});
