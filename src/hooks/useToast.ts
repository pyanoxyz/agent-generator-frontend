
import { create } from 'zustand';

type ToastType = "error" | "success";

interface ToastState {
 toast: { message: string; type: ToastType } | null;
 showToast: (message: string, type: ToastType) => void;
 hideToast: () => void;
}

export const useToast = create<ToastState>((set) => ({
 toast: null,
 showToast: (message, type) => {
   set({ toast: { message, type } });
   setTimeout(() => set({ toast: null }), 3000);
 },
 hideToast: () => set({ toast: null }),
}));
