
export default function Services(section: Section.ServicesProps) {
    return (
        <section>
            <div className="container pt-pink text-black">
                <div className="bg-black h-[1px] w-full opacity-30"></div>
                <div className="flex flex-wrap pt-cyan -mx-4 md:justify-center lg:justify-start">
                    <div className="w-full  lg:w-3/12 px-4">
                        <h2>{section.heading}</h2>
                    </div>
                    <div className="w-full lg:w-9/12 px-4 pt-blue lg:pt-0">
                        <p className="h1">
                            {section.title}
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap pt-red gap-y-yellow -mx-4">
                    <div className="md:w-1/12 lg:w-4/12 px-4 hidden md:block"></div>
                    <div className="md:w-10/12 lg:w-6/12 px-4">
                        <div className="flex flex-wrap gap-y-yellow -mx-4">
                            {section.allServices && section.allServices.length > 0 && (
                                section.allServices.map((service: Sanity.Service) => (
                                    <div className="w-10/12 md:w-6/12 px-4 ml-auto md:ml-0" key={service._key}>
                                        <p>{service.title}</p>
                                        <ul className="pt-cyan">
                                            {service.description && service.description.length > 0 && (
                                                service.description.map((text: string, index: number) => (
                                                    <li className="flex gap-3" key={service._key + index}>
                                                        <div className="bullet-container">
                                                            <div className="bullet"></div>
                                                        </div>
                                                        <p>{text}</p>
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );  
}