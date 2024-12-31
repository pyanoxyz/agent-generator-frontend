import { useToast } from "../hooks/useToast";

export const ToastContainer = () => {
    const toast = useToast((state) => state.toast);
   
    if (!toast) return null;
   
    return (
      <div className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg transition-all ${
        toast.type === "error" ? "bg-red-600" : "bg-green-600"
      } text-white z-50`}>
        {toast.message}
      </div>
    );
   };