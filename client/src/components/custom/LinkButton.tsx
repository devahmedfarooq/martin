import React from "react";

interface LinkButtonProps {
  url: string | null;
  item: string;
  setItem: (item: string) => void;
  children: React.ReactNode;
  name: string;
  onClick?: () => void;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  url,
  item,
  setItem,
  children,
  name,
  onClick,
}) => {
  return (
    <button
      disabled={!url}
      onClick={onClick || (() => setItem(name))}
      className={item === name
        ? 'text-lg border-slate-100 border flex flex-row justify-between items-center gap-2 p-4 text-[#0a081e] rounded mr-1 hover:bg-slate-100 bg-white hover:text-primary transition-all cursor-pointer'
        : 'text-lg border-slate-100 border flex flex-row justify-between items-center gap-2 p-4 bg-[#0a081e] rounded mr-1 hover:bg-slate-100 text-white hover:text-primary transition-all cursor-pointer'
      }
    >
      {children}
    </button>
  );
};

export default LinkButton;
