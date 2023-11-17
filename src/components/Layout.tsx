import { FC } from "react";
import Header from "../partials/Header";
import Hero from "src/partials/Hero";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className="w-full flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main>
        <Hero />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
