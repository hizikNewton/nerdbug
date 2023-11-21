import { PropsWithChildren } from "react";

interface Props {
  className?: string;
}

const Section = ({
  children,
  className: classes,
}: PropsWithChildren<Props>) => {
  return (
    <section className="relative block h-full">
      <div
        className={`${classes} flex flex-col  max-w-6xl  pt-6 px-4 mx-auto mb-10 sm:px-6 `}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
