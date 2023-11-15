import { PropsWithChildren } from "react";


interface Props {
  className?: string;
}

const Section = ({
  children,
  className: classes,
}: PropsWithChildren<Props>) => {
  return (
    <section className="">
      <div
        className={`flex flex-col items-center max-w-6xl  pt-6 px-4 mx-auto mb-20 sm:px-6 ${classes}`}
      >

        {children}
      </div>
    </section>
  );
};

export default Section;
