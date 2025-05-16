import SingleLink from "../components/SingleLink";
import ImageWithBlur from "../components/ImageWithBlur";
import AnimatedOnView from "../components/AnimatedOnView";
import AnimatedScrambleOnView from "../components/ScrambleOnView";

export default function Approach(section: Section.ApproachProps) {
    return (
        <section>
            <div className="container pt-pink text-black">
                <div className="bg-black h-[1px] w-full opacity-30"></div>
                <div className="flex justify-center lg:justify-start -mx-4 pt-cyan flex-wrap r-gap-red">
                    <AnimatedOnView className="order-2 lg:order-1 md:w-10/12 lg:w-6/12 px-4 fade-in" targetSelector="fade-in">
                        <ImageWithBlur image={section.image} sizes="(max-width: 768px) 100vw, 50vw" optionalAlt='Approach Image'/>
                    </AnimatedOnView>
                    <AnimatedOnView targetSelector=".fade-in" className="order-1 lg:order-2 w-full lg:w-6/12 px-4 flex flex-col ">
                        <div className="flex flex-wrap -mx-4">
                            <div className="md:w-1/12 lg:hidden"></div>
                            <AnimatedScrambleOnView className="md:w-7/12 lg:w-8/12 px-4">
                                <h2 className="scramble-on-view">{section.heading}</h2>
                                <h3 className="pt-blue fade-in delay-lg h1">{section.title}</h3>
                            </AnimatedScrambleOnView>
                            
                            <div className="md:w-10/12 px-4 flex flex-col mx-auto lg:mx-0">
                                <p className="pt-red whitespace-pre-line fade-in delay-lg">
                                    {section.description}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-4 mt-auto">
                            <div className="md:w-10/12 px-4  md:mx-auto lg:mx-0">
                                <div className="pt-yellow flex fade-in delay-lg">
                                    <SingleLink {...section.link}>
                                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13 7.37516L7.05112 1.4021M13 7.37516L7.05112 13.3482M13 7.37516L1 7.37516" stroke="#2D2D2C" strokeMiterlimit="10" strokeLinecap="square"/>
                                        </svg>
                                        <p className="under-custom scramble-hover">
                                            {section.link?.label}
                                        </p>
                                   </SingleLink>
                                </div>
                            </div>
                        </div>
                    </AnimatedOnView>
                    <div className="">
                        
                        
                    </div>
                </div>
            </div>
        </section>   
    );
   
}