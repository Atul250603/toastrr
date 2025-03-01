interface closeIcon {
  strokeWidth: string;
  strokeColor?: string;
}
const CloseIcon: React.FC<closeIcon> = ({strokeWidth, strokeColor='black'}) => <>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="13" height="13" viewBox="0 0 50 50">
                        <path stroke = {strokeColor} strokeWidth={strokeWidth} d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                    </svg>
                  </>
const Success: React.FC = () => <>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  {/* Circle */}
  <path fill="#0dc92a" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
  {/* Tick Mark */}
  <path fill="#ffffff" stroke="#ffff" d="M369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
</svg>
</>

const Error: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    {/* Circle */}
    <path fill="#ea0b0b" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
    {/* Cross */}
    <path fill="#ffffff" d="M175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
  </svg>
);

const Info: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    {/* Circle */}
    <path fill="#12a4ed" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
    {/* "i" Icon */}
    <path fill="#ffffff" d="M216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
  </svg>
);

const Warning: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    {/* Circle */}
    <path fill="#e6a800" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
    {/* Exclamation */}
    <path fill="#ffffff" d="M256 128c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
  </svg>
);

const PromiseIcon: React.FC = () => (<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
<circle className="spin" cx="400" cy="400" fill="none"
  r="200" stroke-width="70" stroke="#47484A"
  stroke-dasharray="1013 1400"
  stroke-linecap="round" />
</svg>);

const PromiseIconDark: React.FC = () => (<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <circle className="spin" cx="400" cy="400" fill="none"
    r="200" strokeWidth="70" stroke="#D1D4DA"
    strokeDasharray="1013 1400"
    strokeLinecap="round" />
  </svg>);

export { Success, Error, Warning, Info, CloseIcon, PromiseIcon, PromiseIconDark };