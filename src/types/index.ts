export interface ToastType {
  id: string;
  type: "success" | "error" | "warning" | "info" | "promise";
  message: string;
  theme?: "light" | "dark";
  duration?: number | 'infinite';
  closeButton?: boolean;
}
export interface ToastPropsType {
  key: string;
  toast: ToastType;
  enterClass: string,
  exitClass: string,
  hasEnterClass: boolean,
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
}
export interface ToasterType {
  position? : "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
  duration?: number | 'infinite';
  theme?: "light" | "dark";
  closeButton?: boolean;
}
export type toastTypes = "success" | "error" | "warning" | "info";
export type themeTypes = "light" | "dark";
export type durationTypes = number | 'infinite';
export type options = {
  theme?: themeTypes;
  duration?: durationTypes;
  closeButton?: boolean;
}
export type promiseOptions = {
  theme?: themeTypes;
  closeButton?: boolean;
  loadingMessage: string;
  successMessage: string;
  errorMessage: string;
}
export type Toast = Pick<ToastType, "type" | "message" | "theme" | "duration" | "id">;
export type GradientColors = {
  fromColor: string;
  toColor: string;
};
export type RippleColors = {
  color: string;
}
export interface ToastStyle {
  gradient: GradientColors;
  Icon: any;
  closeIconColor: string;
  textColor: string;
  rippleColor: RippleColors
}
export type gradientCSSProperties = {
  "--from-color"?: string;
  "--to-color"?: string;
} 
export type rippleCSSProperties = {
  "--ripple-color"?: string;
}
export type colorCSSProperties = {
  "--text-color"?: string;
  "--icon-color"?: string;
}
export type animationCSSProperties = {
  "--duration"?: string;  
  "--animation-iteration-count"?: string;
}
export type CustomCSSProperties = React.CSSProperties & gradientCSSProperties & rippleCSSProperties & colorCSSProperties & animationCSSProperties;