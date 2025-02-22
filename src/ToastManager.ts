import { ToastType, Toast, options, promiseOptions } from "./types";
const generateId = () => Math.random().toString(36).substring(2, 9);
class ToastManager {
    private listeners: ((toasts: ToastType[]) => void)[] = [];
    private toasts: ToastType[] = [];

    subscribe(listener: (toasts: ToastType[]) => void) {
        this.listeners.push(listener);
        listener(this.toasts);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        }
    }

    notify(toast: Toast) {
        const newToast = { ...toast };
        this.toasts = [...this.toasts, newToast];
        this.updateListeners();
    }

    private updateListeners() {
        this.listeners.forEach(listener => listener(this.toasts));
    }

    removeToast(id: string) {
        this.toasts = this.toasts.filter(toast => toast.id !== id);
        this.updateListeners();
    }

    success(message: string, options?: options) {
        const id = generateId();
        this.notify({ id, type: "success", message, ...options });
    }

    error(message: string, options?: options) {
        const id = generateId();
        this.notify({ id, type: "error", message, ...options });
    }

    warning(message: string, options?: options) {
        const id = generateId();
        this.notify({ id, type: "warning", message, ...options });
    }

    info(message: string, options?: options) {
        const id = generateId();
        this.notify({ id, type: "info", message, ...options });
    }

    promiseToast(promiseValue: Promise<any>, options: promiseOptions) {
        if (promiseValue instanceof Promise === false) {
            throw new Error("promiseToast method expects a promise as the first argument");
        }
        const id = generateId();
        this.notify({ id, type: "promise", message: options.loadingMessage, ...options });
        promiseValue
            .then((data) => {
                this.toasts = this.toasts.map(toast => 
                    toast.id === id 
                        ? { ...toast, message: options.successMessage, type: "success", duration: undefined } 
                        : toast
                );
                this.updateListeners();
                return data;
            })
            .catch((error) => {
                this.toasts = this.toasts.map(toast => 
                    toast.id === id 
                        ? { ...toast, message: options.errorMessage, type: "error", duration: undefined } 
                        : toast
                );
                this.updateListeners();
                return error;
            })
    }
}
const toastManager = new ToastManager();
const toast =  {
  success: toastManager.success.bind(toastManager),
  error: toastManager.error.bind(toastManager),
  warning: toastManager.warning.bind(toastManager),
  info: toastManager.info.bind(toastManager),
  promise: toastManager.promiseToast.bind(toastManager),
}
export default toast
export { toastManager };