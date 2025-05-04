
import SingleLink from '../components/SingleLink';
import ImageWithBlur from '../components/ImageWithBlur';

export default function Studio(section: Section.StudioProps) {
    return(
        <section>
            <div className="container pt-pink text-black">
                <div className="bg-black h-[1px] w-full opacity-30"></div>
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full lg:w-4/12 px-4 pb-red lg:pb-0">
                        <div className="flex flex-wrap -mx-4">
                            <div className="md:w-2/12 lg:w-full px-4">
                                <h2 className='pt-cyan'>{section.heading}</h2>
                            </div>
                            <div className="md:w-10/12 lg:w-full px-4">
                                <h1 className='pt-1 md:pt-6 lg:pt-2'>{section.title}</h1>
                            </div>
                            <div className="w-2/12 hidden md:block lg:hidden px-4"></div>
                            <div className="w-full md:w-9/12 lg:w-full px-4">
                                <p className='pt-red whitespace-pre-line'>
                                    {section.description}
                                </p>
                                <div className="flex pt-yellow">
                                   <SingleLink {...section.link}>
                                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13 7.37516L7.05112 1.4021M13 7.37516L7.05112 13.3482M13 7.37516L1 7.37516" stroke="#2D2D2C" strokeMiterlimit="10" strokeLinecap="square"/>
                                        </svg>
                                        <p className="under-custom">
                                            {section.link?.label}
                                        </p>
                                   </SingleLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    {section.images?.[0] && (
                        <div className="lg:ml-auto w-8/12 md:w-7/12 lg:w-4/12 px-4 lg:pt-6">
                            <ImageWithBlur image={section.images?.[0]} optionalAlt='Studio Image' sizes='75vw'/>
                        </div>
                    )}

                    {section.images?.[1] &&  (
                        <div className="w-8/12 md:w-5/12 lg:w-3/12 px-4 pt-8 md:pt-0 lg:pt-6 ml-auto md:ml-0">
                            <ImageWithBlur image={section.images?.[1]} optionalAlt='Studio Image' sizes='75vw'/>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );  
}