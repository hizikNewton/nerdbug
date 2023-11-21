import type { SVGProps } from "react";
const SvgWind = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 26 23"
    {...props}
  >
    <path
      fill={props.fill}
      d="M8.586 11.227h-6.87a.784.784 0 0 0-.782.781v1.563c0 .43.352.781.781.781H8.66c.776 0 1.504.532 1.63 1.299a1.564 1.564 0 0 1-3.027.757c-.102-.308-.42-.494-.742-.494H4.92c-.479 0-.865.43-.777.899a4.698 4.698 0 0 0 4.6 3.789 4.693 4.693 0 0 0 4.648-5.303c-.298-2.363-2.427-4.072-4.804-4.072m-6.87-1.562h16.406a4.696 4.696 0 0 0 4.58-5.699 4.671 4.671 0 0 0-3.57-3.57 4.698 4.698 0 0 0-5.61 3.687c-.093.47.298.894.772.894h1.601c.327 0 .64-.186.742-.493.21-.62.796-1.07 1.485-1.07.947 0 1.704.85 1.543 1.827-.127.766-.85 1.299-1.631 1.299H1.715a.784.784 0 0 0-.78.78v1.563c0 .43.35.782.78.782Zm18.75 1.562h-7.632a6.172 6.172 0 0 1 1.943 3.125h5.688a2.344 2.344 0 0 1 0 4.688 2.339 2.339 0 0 1-2.03-1.192c-.142-.244-.426-.371-.709-.371h-1.65c-.532 0-.928.527-.747 1.03.869 2.471 3.442 4.14 6.318 3.53 2.012-.424 3.667-2.03 4.136-4.037a5.48 5.48 0 0 0-5.318-6.773"
    />
  </svg>
);
export default SvgWind;
