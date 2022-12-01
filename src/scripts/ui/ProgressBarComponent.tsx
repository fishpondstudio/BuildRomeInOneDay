import { clamp } from "../utilities/Helper";

export function ProgressBarComponent({ progress }: { progress: number }) {
   return (
      <div className="meter">
         <div className="fill" style={{ width: `${clamp(progress * 100, 0, 100)}%` }}></div>
      </div>
   );
}
