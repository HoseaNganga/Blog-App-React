import { useState, useEffect } from "react";

const useTimeStamp = () => {
  const [timeStamp, setTimeStamp] = useState("");
  useEffect(() => {
    const handleTimeStamp = () => {
      const currentDate = new Date().toISOString();
      setTimeStamp(currentDate);
    };
    handleTimeStamp();

    const setTimeStampInterval = setInterval(handleTimeStamp, 1000);
    return () => clearInterval(setTimeStampInterval);
  }, []);
  return timeStamp;
};

export default useTimeStamp;
