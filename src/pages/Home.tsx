import { FC } from "react";
import DefaultList from "src/partials/DefaultList";

const Home: FC = () => {
  return (
    <div className="w-full flex flex-col min-h-screen overflow-hidden">
      <DefaultList />
    </div>
  );
};

export default Home;
