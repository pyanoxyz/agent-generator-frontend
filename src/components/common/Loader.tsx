import React from "react";
import { RiLoader2Fill } from "react-icons/ri";

interface LoaderProps {
 size?: "sm" | "md" | "lg";
 iconClassName?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = "md", iconClassName = "" }) => {
 const sizeClasses = {
   sm: "w-6 h-6", // 24px
   md: "w-10 h-10", // 40px
   lg: "w-16 h-16" // 64px
 };

 return (
   <span className={`inline-block ${sizeClasses[size]}`}>
     <RiLoader2Fill
       className={`animate-spin w-full h-full text-[#0066cc] ${iconClassName}`}
       style={{ fontSize: "inherit" }}
     />
   </span>
 );
};

export default Loader;