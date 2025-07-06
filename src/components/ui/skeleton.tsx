import React from "react";

export function Skeleton({
  className = "",
  style = {},
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={
        `bg-gray-200 dark:bg-gray-800 rounded animate-pulse ` + className
      }
      style={style}
      {...props}
    />
  );
}

export default Skeleton;
