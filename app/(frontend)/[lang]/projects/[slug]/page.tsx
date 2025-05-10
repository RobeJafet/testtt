import { fetchSanityPostBySlug, fetchSanityPostSlugs } from '@/sanity/sevices/fetchPost';
import  SingleLink  from '@/components/components/SingleLink';
import ImageWithBlur from '@/components/components/ImageWithBlur';
import { getDictionary } from '../../../[lang]/dictionaries'
import { generatePageMetadata } from "@/sanity/sevices/generateMetadata";
import { notFound } from 'next/navigation';




export async function generateStaticParams() {
    const slugs = await fetchSanityPostSlugs();
    return slugs;
}

type ParamsMetadata = Promise<{ lang: LocalePage; slug: string }>

export async function generateMetadata(props: {params: ParamsMetadata}) {
    const paramsMetadata = await props.params;
    const { lang, slug } =  paramsMetadata; 
    const post = await fetchSanityPostBySlug(slug, lang);
    return generatePageMetadata({ page: post, slug, locale: lang });

}


export default async function Post({params}: {params: ParamsMetadata}) {
    const { slug, lang } = await params;
    const post = await fetchSanityPostBySlug( slug, lang);

    if (!post) {
        notFound();
    }
    
    const dict = await getDictionary(lang)

    return (
        <div>
            <div className="container pt-[36px] md:pt-[45px] lg:pt-[52px]">
                <div className="flex -mx-4 flex-wrap pt-green">
                    {post.title && post.excerpt && (
                        <div className="w-full lg:w-7/12 px-4 lg:order-1">
                            <p>{post.title}</p>
                            <h1 className="pt-blue">{post.excerpt}</h1>
                        </div>
                    )}
                    <div className="w-2/12 md:w-4/12 lg:w-1/12 px-4 lg:order-2"></div>
                    <div className="w-full px-4 pt-yellow lg:order-4"></div>
                    <div className="w-10/12 md:w-5/12 lg:w-7/12 px-4 lg:order-5">
                        <div className="flex flex-col h-full">
                            <p>{dict.project.year}: {post.year}</p>
                            <p>{dict.project.services}: {post.services_text}</p>
                            {post.link && (
                                <div className="mt-auto pt-cyan lg:hidden flex">
                                    <SingleLink {...post.link}>
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
                                        <p className="under-custom scramble-hover">
                                            {post.link?.label}
                                        </p>
                                    </SingleLink>
                                </div>
                            )}
                        </div>
                    </div>
                    {post.team_members && post.team_members.length > 0 && (
                        <div className="w-full  md:w-6/12 lg:w-3/12 px-4 pt-red md:!pt-0 ml-auto lg:ml-0 lg:order-3">
                            <p>{dict.project.team}</p>
                            <div className="pt-cyan flex flex-col">
                                <div className="bg-black h-[1px] w-full opacity-30"></div>
                                {post.team_members?.map((member, i) => (
                                    <div key={i}>
                                        <p className="pt-[2px] pb-[2px]">
                                            {member.name} - {member.role}
                                        </p>
                                        <div className="bg-black h-[1px] w-full opacity-30"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {post.link && (
                        <div className="lg:w-4/12 px-4 lg:ml-auto hidden lg:block lg:order-6">
                            <div className="flex h-full">
                                <div className="mt-auto">
                                    <SingleLink {...post.link}>
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
                                        <p className="under-custom scramble-hover">
                                            {post.link?.label}
                                        </p>
                                    </SingleLink>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {post.first_images && post.first_images.length > 0 && (
                    <div className="w-full pt-red">
                        <div className="flex -mx-4 flex-wrap gap-y-4 md:gap-y-8">
                            {post.first_images?.map((image, i) => {
                                if (image?.asset) {
                                    if ((i + 1) % 3 === 1) {
                                        return (
                                            <div
                                                key={image.asset._id}
                                                className="w-full px-4"
                                            >
                                                <ImageWithBlur
                                                    image={image}
                                                    sizes="100vw"
                                                    optionalAlt="Img Project"
                                                />
                                            </div>
                                        );
                                    } else if ((i + 1) % 3 === 2) {
                                        return (
                                            <div
                                                key={image.asset._id}
                                                className="w-full md:w-7/12 px-4"
                                            >
                                                <ImageWithBlur
                                                    image={image}
                                                    sizes="(max-width: 768px) 100vw, 75vw"
                                                    optionalAlt="Img Project"
                                                />
                                            </div>
                                        );
                                    } else if ((i + 1) % 3 === 0) {
                                        return (
                                            <div
                                                key={image.asset._id}
                                                className="w-full md:w-5/12 px-4"
                                            >
                                                <ImageWithBlur
                                                    image={image}
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    optionalAlt="Img Project"
                                                />
                                            </div>
                                        );
                                    }
                                }
                                return null; 
                            })}
                        </div>
                    </div>
                )}
            </div>
            {
                (post.context_title || post.context_description) && (
                    <div className="container pt-green">
                        <div className="flex -mx-4 flex-wrap justify-center">
                            {post.context_title && (
                                <div className="w-full px-4">
                                    <p>{dict.project.context}</p>
                                    <p className="pt-blue h1">{post.context_title}</p>
                                </div>
                            )}
                            {post.context_description && (
                                <div className="w-10/12 md:w-8/12 lg:w-5/12 pt-red px-4">
                                    <p>{post.context_description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
            {
                post.context_images && post.context_images.length > 0 && (
                    <div className="container pt-green">
                        <div className="flex -mx-4 flex-wrap gap-y-4 md:gap-y-8">
                            {post.context_images?.map((image, i) => {
                                if (image?.asset) {
                                    if ((i + 1) % 6 === 1) {
                                        // Layout for multiples of 1
                                        return (
                                            <div
                                                key={image.asset._id + i}
                                                className="w-full px-4"
                                            >
                                                <ImageWithBlur
                                                    image={image}
                                                    sizes="100vw"
                                                    optionalAlt="Img Project"
                                                />
                                            </div>
                                        );
                                    } else if ((i + 1) % 6 === 2) {
                                        // Layout for multiples of 2
                                        return (
                                            <div
                                                key={image.asset._id + i}
                                                className="w-full md:w-5/12 px-4"
                                            >
                                                <ImageWithBlur
                                                    image={image}
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    optionalAlt="Img Project"
                                                />
                                            </div>
                                        );
                                    } else if ((i + 1) % 6 === 3) {
                                        // Layout for multiples of 3
                                        return (
                                            <div
                                                key={image.asset._id + i}
                                                className="w-full md:w-7/12 px-4"
                                            >
                                                <ImageWithBlur
                                                    image={image}
                                                    sizes="(max-width: 768px) 100vw, 75vw"
                                                    optionalAlt="Img Project"
                                                />
                                            </div>
                                        );
                                    }
                                    else if ((i + 1) % 6 === 4) {
                                        // Layout for multiples of 3
                                        return (
                                            <div
                                                key={image.asset._id + i}
                                                className="w-full px-4"
                                            >
                                                <ImageWithBlur
                                                    image={image}
                                                    sizes="100vw"
                                                    optionalAlt="Img Project"
                                                />
                                            </div>
                                        );
                                    }
                                    else if ((i + 1) % 6 === 5) {
                                        // Layout for multiples of 3
                                        return (
                                            <div
                                                key={image.asset._id + i}
                                                className="w-full md:w-7/12 px-4"
                                            >
                                                <ImageWithBlur
                                                    image={image}
                                                    sizes="(max-width: 768px) 100vw, 75vw"
                                                    optionalAlt="Img Project"
                                                />
                                            </div>
                                        );
                                    }
                                    else if ((i + 1) % 6 === 0) {
                                        // Layout for multiples of 3
                                        return (
                                            <div
                                                key={image.asset._id + i}
                                                className="w-full md:w-5/12 px-4"
                                            >
                                                <ImageWithBlur
                                                    image={image}
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    optionalAlt="Img Project"
                                                />
                                            </div>
                                        );
                                    }
                                }
                                return null; 
                            })}
                        </div>
                    </div>
                )
            }
           
        </div>
        
    );
}