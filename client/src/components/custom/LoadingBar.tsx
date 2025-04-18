// LoadingBar.tsx
import { useState, useEffect } from 'react';

export default function LoadingBar() {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 300); // Adjust speed if necessary

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto mt-20 p-4">
      <div className="w-full bg-gray-900 rounded-md h-8 relative overflow-hidden border-2 border-gray-700 shadow-md">
        <div
          style={{ width: `${progress}%` }}
          className="bg-gray-300 h-full transition-all duration-300 ease-out"
        ></div>
        <p className="absolute w-full text-center top-1/2 -translate-y-1/2 font-semibold" style={{
          color : progress > 50  ?  'black' : 'GrayText'
        }}>
          {progress}%
        </p>
      </div>
    </div>
  );
}
