import { toast } from "sonner"

export function useToast() {
  return {
    toast,
    dismiss: toast.dismiss,
    error: (message: string) => toast.error(message),
    success: (message: string) => toast.success(message),
    loading: (message: string) => toast.loading(message),
    promise: toast.promise,
  }
}
