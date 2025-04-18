import React, { useRef } from 'react';

interface DynamicRendererProps {
  data: Record<string, any[]>; // A dictionary where keys are strings, and values are arrays of any type
  loading: boolean;
  item: string;
  placeholderImageSrc: string; // Path to the placeholder image
  LoadingComponent: React.FC; // Custom loading component
  ImageGeneratorComponent: React.FC; // Custom image generator component
}

const DynamicRenderer: React.FC<DynamicRendererProps> = ({
  data,
  loading,
  item,
  placeholderImageSrc,
  LoadingComponent,
  ImageGeneratorComponent,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  if (item === 'images') {
    return <ImageGeneratorComponent />;
  }

  if (!data[item] && !loading) {
    return (
      <div className="flex flex-row justify-center items-center min-h-[70vh]">
        <img className="w-96" src={placeholderImageSrc} alt="No data available" />
      </div>
    );
  }

  if (loading) {
    return <LoadingComponent />;
  }



  return (
    <div
      ref={contentRef}
      className="text-white gap-4 max-h-[60vh] lg:max-h-[500px] overflow-y-scroll flex-col flex"
    >
      {data[item]?.map((e, idx) => (
        <div
          key={e.id || idx} // Prefer unique ID if available
          dangerouslySetInnerHTML={{
            __html: String(e), // Directly using the approach you had
          }}
        />
      ))}
    </div>
  );
};

export default DynamicRenderer;
