
import SingleLink from '../components/SingleLink';
import ImageWithBlur from '../components/ImageWithBlur';
import AnimatedOnView from '../components/AnimatedOnView';
import AnimatedScrambleOnView from '../components/ScrambleOnView';

export default function Studio(section: Section.StudioProps) {
    return(
        <section>
            <div className="container pt-pink text-black">
                <div className="bg-black h-[1px] w-full opacity-30"></div>
                <div className="flex flex-wrap -mx-4">
                    <AnimatedOnView className="w-full lg:w-4/12 px-4 pb-red lg:pb-0 " targetSelector='.fade-in'>
                        <div className="flex flex-wrap -mx-4">
                            <AnimatedScrambleOnView className='md:w-2/12 lg:w-full px-4'>
                                <h2 className='pt-cyan scramble-on-view'>{section.heading}</h2>
                            </AnimatedScrambleOnView>
                           
                            <div className="md:w-10/12 lg:w-full px-4 fade-in">
                                <h3 className='pt-1 md:pt-6 lg:pt-2 h1'>{section.title}</h3>
                            </div>
                            <div className="w-2/12 hidden md:block lg:hidden px-4"></div>
                            <div className="w-full md:w-9/12 lg:w-full px-4 fade-in">
                                <p className='pt-red whitespace-pre-line '>
                                    {section.description}
                                </p>
                                <div className="flex pt-yellow ">
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
                    {section.images?.[0] && (
                        <AnimatedOnView className='fade-in lg:ml-auto w-8/12 md:w-7/12 lg:w-4/12 px-4 lg:pt-6' targetSelector='fade-in'>
                             <ImageWithBlur image={section.images?.[0]} optionalAlt='Studio Image' sizes='75vw'/>
                        </AnimatedOnView>
                    )}

                    {section.images?.[1] &&  (
                        <AnimatedOnView className='w-8/12 md:w-5/12 lg:w-3/12 px-4 pt-8 md:pt-0 lg:pt-6 ml-auto md:ml-0 fade-in delay-md' targetSelector='fade-in'>
                            <ImageWithBlur image={section.images?.[1]} optionalAlt='Studio Image' sizes='75vw'/>
                        </AnimatedOnView>
                    )}
                </div>
            </div>
        </section>
    );  
}