import { memo, useEffect, useState } from "react";

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);

  const secs = seconds % 60;

  return `${minutes.toString().padStart(2, "0")} min ${secs.toString().padStart(2, "0")} s `;
}

const TimeDisplayer = ({ dispatch, is_active, delay }) => {
  const [finished, setFinished] = useState(false);

  const [timeLeft, setTimeLeft] = useState(delay);

  const [width, setWidth] = useState("100");
  const [color, setColor] = useState("green");

  useEffect(() => {
    if (finished) return;

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);

      const progress = (Number(delay - timeLeft) / delay) * 100;

      if (progress <= 20) {
        setColor("green");
      } else if (progress > 30 && progress <= 50) {
        setColor("green-light");
      } else if (progress > 50 && progress <= 60) {
        setColor("orange");
      } else if (progress > 60 && progress <= 80) {
        setColor("red-light");
      } else if (progress > 80) {
        setColor("red");
      }

      setWidth(progress);

      if (timeLeft <= 0) {
        setTimeLeft(0);
        clearInterval(timer);

        dispatch({ type: "TIME_DELAYED" });

        return 0;
      }
    }, 1000);

    console.log("enfant : " + is_active);

    return () => clearInterval(timer);
  });
  return (
    <div className="w-1/5 text-left text-sm">
      {is_active && (
        <div className="w-full">
          <h5 className="w-full">
            Temps restants : <span>{formatTime(timeLeft)}</span>
          </h5>
          <div className="w-full bg-gray-600 rounded-full">
            <div
              className="text-xs font-medium text-white text-center p-1 leading-none rounded-full  h-2 flex items-center justify-center transition-all duration-300"
              style={{ width: `${width}%`, backgroundColor: `${color}` }}
            >
              <small className="hidden">{Math.floor(width)}%</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(TimeDisplayer);
