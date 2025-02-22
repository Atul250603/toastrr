import Toast from "./Toast";
import '../App.css'
import { toastManager } from "../ToastManager";
import { ToasterType, ToastType } from "../types";
import { useEffect, useState, useRef, useLayoutEffect, useCallback } from "react";
import { topCenter, topLeft, topRight, bottomCenter, bottomRight, bottomLeft } from "../assets/classes";
const Toaster: React.FC<ToasterType> = ({position='top-right', theme="light", duration=3000, closeButton = true}) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const toastRefs = useRef<(HTMLDivElement | null)[]>([]);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  useEffect(()=>{
    const unsubscribe = toastManager.subscribe((toasts) => {
      setToasts(toasts);
    });
    return () => {
      unsubscribe()
    }
  },[])
  const updateOffsets = useCallback(() => {
    if (position.includes('top')) {
      let offset = 0;
      toastRefs.current.forEach((_, index) => {
        const toastElement = toastRefs.current[toasts.length - index - 1];
        if (toastElement) {
          toastElement.style.setProperty('--offset', `${offset}px`);
          offset += toastElement.offsetHeight + 12;
        }
      });
    } else {
      let offset = 0;
      toastRefs.current.forEach((_, index) => {
        const toastElement = toastRefs.current[toasts.length - index - 1];
        if (toastElement) {
          const offSetValue = -1 * offset;
          toastElement.style.setProperty('--offset', `${offSetValue}px`);
          offset += toastElement.offsetHeight + 12;
        }
      });
    }
  }, [toasts, position]);

  useLayoutEffect(() => {
    toastRefs.current = toastRefs.current.slice(0, toasts.length);
    updateOffsets();
  }, [toasts, position])
  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver(() => {
      updateOffsets();
    });

    toastRefs.current.forEach((toastElement) => {
      if (toastElement) {
        resizeObserverRef.current?.observe(toastElement);
      }
    });

    return () => {
      resizeObserverRef.current?.disconnect();
    };
  }, [toasts]);
  let positionStyle;
  let enterClass;
  let exitClass;
  switch(position) {
    case "top-left":
      positionStyle = topLeft;
      enterClass = 'slideTopDown'
      exitClass = 'toastExitUp'
      break
    case "top-right":
      positionStyle = topRight;
      enterClass = 'slideTopDown'
      exitClass = 'toastExitUp'
      break
    case "bottom-left":
      positionStyle = bottomLeft;
      enterClass = 'slideBottomUp'
      exitClass = 'toastExitDown'
      break
    case "bottom-right":
      positionStyle = bottomRight;
      enterClass = 'slideBottomUp'
      exitClass = 'toastExitDown'
      break
    case "top-center":
      positionStyle = topCenter;
      enterClass = 'slideTopDown'
      exitClass = 'toastExitUp'
      break
    case "bottom-center":
      positionStyle = bottomCenter;
      enterClass = 'slideBottomUp'
      exitClass = 'toastExitDown'
      break
    default:
      positionStyle = topRight;
      enterClass = 'slideTopDown'
      exitClass = 'toastExitUp'
      break
  }
  return (
    <div className={`${positionStyle} toast-wrapper`}>
      <div className="toastParentContainer">
        {toasts.map((toast: ToastType, index: number) => {
          if (!toast.theme) {
            toast.theme = theme;
          }
          if (!toast.duration) {
            if (toast.type === 'promise') {
              toast.duration = 'infinite';
            }
            else{
              toast.duration = duration;
            }
          }
          if (toast.closeButton === undefined) {
            toast.closeButton = closeButton;
          }
          return <Toast ref = { (e) => { toastRefs.current[index] = e } } key={toast.id} toast={toast} enterClass = {enterClass} exitClass = {exitClass} hasEnterClass = { index === toasts.length-1 ? true : false } position = {position}/>
        }
        )}
      </div>
    </div>
  )
}
export default Toaster;