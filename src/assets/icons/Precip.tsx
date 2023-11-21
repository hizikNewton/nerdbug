import * as React from "react";
import type { SVGProps } from "react";
const SvgPrecip = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 20 14"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      d="M18.693 12.33a9 9 0 1 0-17.386 0"
    />
    <path
      stroke="#000"
      d="M10.766 10.582c.487.71.144 1.792-.766 2.417-.91.626-2.043.558-2.53-.151-.52-.756-2.314-5.007-3.403-7.637-.205-.495.4-.911.79-.542 2.064 1.96 5.39 5.157 5.909 5.913Z"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      d="M10 1v2m-6.364.636L5.05 5.05m11.314-1.414L14.95 5.05m3.743 7.28-1.931-.518m-15.455.518 1.931-.518"
    />
  </svg>
);
export default SvgPrecip;
