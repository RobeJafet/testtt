import ImageWithBlur from '../components/ImageWithBlur';
import SingleLink from '../components/SingleLink';


export default async function FeaturedProjects(section: Section.FeaturedProjectsProps) {

    return(
        <section>
            <div className="container pt-pink text-black">
                <div className="bg-black h-[1px] w-full opacity-30"></div>
                <div className="flex pt-cyan">
                    <div className="lg:w-4/12">
                        <h2>{section.heading}</h2>
                    </div>
                </div>
                {section.projects && section.projects.map((project) => {
                if (!project.project) return null;
                    const projectPage: Sanity.InternalLink = {
                        _type: 'project.post',
                        slug: project.project?.slug.current,
                        language: project.project?.language,
                    };

                    return (
                        <div className="flex flex-wrap pt-red -mx-4" key={project.project?._id}>
                            {project.images?.[0] && (
                                <div className="w-full md:w-6/12 px-4">
                                    <SingleLink
                                        page={projectPage}
                                        linkType={'page'}
                                        openInNewTab={false}
                                        >
                                        <ImageWithBlur
                                        image={project.images[0]}
                                        sizes="(max-width: 768px) 100vw , 50vw"
                                        optionalAlt="Img Project"
                                        />

                                    </SingleLink>
                                </div>
                            )}
                            {project.images?.[1] && (
                                <div className="w-full md:w-6/12 hidden md:flex px-4">
                                     <SingleLink
                                        page={projectPage}
                                        linkType={'page'}
                                        openInNewTab={false}
                                        >
                                        <ImageWithBlur
                                            image={project.images[1]}
                                            sizes="(max-width: 768px) 100vw , 50vw"
                                            optionalAlt="Img Project"
                                        />
                                    </SingleLink>
                                </div>
                            )}

                            <div className="w-full pt-cyan px-4">
                                <div className="flex flex-wrap -mx-4 gap-y-8">
                                    {project.description && (
                                        <div className="w-full md:w-9/12 2xl:w-8/12 px-4">
                                            <p className="h1">{project.description}</p>
                                        </div>
                                    )}
                                    {section.linkText && (
                                        <div className="w-full md:w-3/12 2xl:w-4/12 md:pt-2 px-4 flex md:justify-end items-start">
                                            <SingleLink
                                                page={projectPage}
                                                linkType={'page'}
                                                openInNewTab={false}
                                            >
                                                <div className="flex gap-4 items-center">
                                                    <svg
                                                        width="14"
                                                        height="15"
                                                        viewBox="0 0 14 15"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M13 7.37516L7.05112 1.4021M13 7.37516L7.05112 13.3482M13 7.37516L1 7.37516"
                                                            stroke="#2D2D2C"
                                                            strokeMiterlimit="10"
                                                            strokeLinecap="square"
                                                        />
                                                    </svg>
                                                    <p className="under-custom scramble-hover">{section.linkText}</p>
                                                </div>
                                            </SingleLink>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
                
            </div>
        </section>

    );
}