import { FC } from "react"
import weather from "assets/weather.png"
const Hero: FC = () => {
    return (
        <section className="relative">
            {/* Illustration behind hero content */}

            <div className="max-w-6xl px-4 mx-auto sm:px-6 bg-hero flex items-center">
                <div className="pt-20 pb-12 md:pt-40 md:pb-20 w-[60%]">
                    <div className="mb-4 text-5xl font-bold text-center ">
                        Our Weather Service for Your Convenience
                    </div>
                    <div className="mb-8 text-base font-normal text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />
                        sed do eiusmod tempor incididunt ut labore et dolore magna.
                    </div>
                </div>
                <div className="w-[40%]">
                    <img src={weather} />
                </div>
            </div>
        </section>
    )
}

export default Hero