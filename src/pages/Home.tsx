import { FC } from "react"
import Header from "../partials/Header"
import DefaultList from "src/partials/DefaultList"
import Hero from "src/partials/Hero"



const Home: FC = () => {
    return (
        <div className="w-full flex flex-col min-h-screen overflow-hidden">
            <Header />
            <main>
                <Hero />
                <DefaultList />
            </main>
        </div>
    )
}

export default Home