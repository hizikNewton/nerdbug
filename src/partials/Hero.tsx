import { FC } from "react"

const Hero: FC = () => {
    return (
        <section className="relative">
            {/* Illustration behind hero content */}

            <div className="max-w-6xl px-4 mx-auto sm:px-6">
                {/* Hero content */}
                <div className="pt-20 pb-12 md:pt-40 md:pb-20">
                    <div className="mb-4 text-5xl font-bold text-center ">
                        Our Best Services for Your Convinience
                    </div>
                    <div className="mb-8 text-base font-normal text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />
                        sed do eiusmod tempor incididunt ut labore et dolore magna.
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero