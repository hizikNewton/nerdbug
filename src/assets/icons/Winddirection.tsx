import * as React from "react";
import type { SVGProps } from "react";
const SvgWinddirection = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 25 25"
    {...props}
  >
    <path
      fill={props.fill}
      d="M11.33 11.122a1.562 1.562 0 1 0 2.208 2.21 1.562 1.562 0 0 0-2.208-2.21M12.434.118C5.746.118.324 5.539.324 12.227s5.422 12.11 12.11 12.11 12.11-5.422 12.11-12.11S19.122.117 12.434.117m6.16 7.229-3.222 7.048a1.56 1.56 0 0 1-.77.77l-7.048 3.221c-.813.372-1.65-.466-1.279-1.28l3.222-7.047c.156-.341.429-.615.77-.77l7.048-3.222c.813-.37 1.65.467 1.278 1.28"
    />
  </svg>
);
export default SvgWinddirection;
