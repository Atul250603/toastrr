import { Green, Yellow, Red, Sky, darkSkyGradient, darkGreenGradient, darkRedGradient, darkYellowGradient, lightSkyGradient, lightGreenGradient, lightRedGradient, lightYellowGradient, successDarkRipple, successLightRipple, errorDarkRipple, errorLightRipple, warningDarkRipple, warningLightRipple, infoDarkRipple, infoLightRipple, black, white, lightGreyGradient, darkGreyGradient, promiseDarkRipple, promiseLightRipple, Grey } from "../assets/classes";
import { Success, CloseIcon, Error, Warning, Info, PromiseIcon, PromiseIconDark } from "../assets/icons";
import { CustomCSSProperties, ToastStyle, ToastPropsType, durationTypes } from "../types";
import { useState, useEffect, useCallback, useRef, forwardRef } from "react";
import { toastManager } from "../ToastManager";
const Toast = forwardRef<HTMLDivElement, ToastPropsType>((props, ref) => {
  const { toast, enterClass, exitClass, hasEnterClass, position } = props;
  const [exiting, setExiting] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const isPaused = useRef(false);
  const remainingTimeRef = useRef(toast.duration); 
  const startTimeRef = useRef<number | null>(null);
  const originalType = useRef<string>(toast.type);
  const hasRendered = useRef<boolean | null>(false);
  const close = useCallback(() => {
    setExiting(true);
  },[])
  const startTimer = useCallback((duration: durationTypes) => {
    if (duration && duration !== 'infinite' && !isPaused.current) {
      startTimeRef.current = Date.now();
      timer.current = setTimeout(() => {
        close();
      }, duration);
    }
  },[close])
  const pauseTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      if (startTimeRef.current !== null && remainingTimeRef.current && remainingTimeRef.current !== 'infinite') {
        remainingTimeRef.current -= Date.now() - startTimeRef.current;
      }
    }
    isPaused.current = true;
  }

  const resumeTimer = () => {
    if (isPaused.current && remainingTimeRef.current && remainingTimeRef.current !== 'infinite') {
      isPaused.current = false;
      startTimer(remainingTimeRef.current);
    }
  }
  useEffect(() => {
    if (remainingTimeRef.current && remainingTimeRef.current !== 'infinite') {
      startTimer(remainingTimeRef.current);
      return () => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
      }
    }
  },[startTimer])

  useEffect(() => {
    if (toast.type !== originalType.current && originalType.current === 'promise') {
      if (toast.duration && toast.duration !== 'infinite') {
        remainingTimeRef.current = toast.duration;
        startTimer(remainingTimeRef.current);
      }
    }
  },[toast])
  const handleAnimationEnd = useCallback(() => {
    if (exiting) {
      toastManager.removeToast(toast.id);
      if (ref && typeof ref !== 'function' &&  ref.current) {
        ref.current.className = '';
      }
    }
  },[exiting, toast.id])

  const handleAnimationStart = useCallback(() => {
    if (!hasRendered.current) {
      hasRendered.current = true;
    }
  },[])
  let gradient;
  let icon;
  let closeIconColor;
  let rippleColor;
  const textColor:string = toast.theme === "light" ? black : white;
  switch(toast.type) {
    case "success":
      icon = Success;
      gradient = toast.theme === "light" ? lightGreenGradient : darkGreenGradient;
      closeIconColor = Green;
      rippleColor = toast.theme === "light" ? successDarkRipple : successLightRipple;
      break
    case "error":
      icon = Error;
      gradient = toast.theme === "light" ? lightRedGradient : darkRedGradient;
      closeIconColor = Red;
      rippleColor = toast.theme === "light" ? errorDarkRipple : errorLightRipple;
      break
    case "warning":
      icon = Warning;
      gradient = toast.theme === "light" ? lightYellowGradient : darkYellowGradient;
      closeIconColor = Yellow;
      rippleColor = toast.theme === "light" ? warningDarkRipple : warningLightRipple;
      break
    case "info":
      icon = Info;
      gradient = toast.theme === "light" ? lightSkyGradient : darkSkyGradient;
      closeIconColor = Sky;
      rippleColor = toast.theme === "light" ? infoDarkRipple : infoLightRipple;
      break
    case "promise":
      icon = toast.theme === "light" ? PromiseIcon : PromiseIconDark;
      gradient = toast.theme === "light" ? lightGreyGradient : darkGreyGradient;
      closeIconColor = Grey;
      rippleColor = toast.theme === "light" ? promiseDarkRipple : promiseLightRipple;
      break
    default:
      icon = Success;
      gradient = toast.theme === "light" ? lightGreenGradient : darkGreenGradient;
      closeIconColor = Green;
      rippleColor = toast.theme === "light" ? successDarkRipple : successLightRipple;
      break
  }
  const Style:ToastStyle = {
    gradient: gradient,
    Icon: icon,
    closeIconColor: closeIconColor,
    textColor: textColor,
    rippleColor: rippleColor
  }
  const toastStyleVariables:CustomCSSProperties = {
    "--from-color": Style.gradient.fromColor,
    "--to-color": Style.gradient.toColor,
    "--ripple-color": Style.rippleColor.color,
    "--text-color": Style.textColor,
    "--icon-color": Style.closeIconColor
  }
  return (
    <div ref = {ref} className={`toast ${exiting ? exitClass : !hasRendered.current && hasEnterClass ? enterClass : ''} ${position.includes('top') ? 'topOffset' : 'bottomOffset'}`} id={toast.id} onAnimationStartCapture = {handleAnimationStart} onAnimationEnd={handleAnimationEnd} onMouseEnter={pauseTimer} onMouseLeave={resumeTimer}>
      <div className={`toastContainer gradient`} style={toastStyleVariables}>
        <div className="icon">
          <Style.Icon/>
        </div>
        <div className="message">
          {toast.message}
        </div>
      </div>
      {(toast && toast.closeButton) ? <div className="closeIcon" style={toastStyleVariables} onClick={close}>
        <CloseIcon
          strokeWidth="5"
          strokeColor="white"
        />
      </div> : null}
    </div>
  )
})

export default Toast;