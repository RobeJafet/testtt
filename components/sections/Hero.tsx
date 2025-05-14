import { urlFor } from '@/sanity/lib/image';
import { getImageProps } from 'next/image';

export default function Hero(section: Section.HeroProps) {
    const heroImageProps = { alt: 'Hero Image', quality: 100, priority: true, sizes: '100vw' };

    const imageDesktop = section?.image_desktop;
    const imageTablet = section?.image_tablet;
    const imageMobile = section?.image_mobile;

    let  tabletSrcset, mobileSrcset;

    const {
        props: { srcSet, ...rest },
    } = getImageProps({
        ...heroImageProps,
        src: imageDesktop ? urlFor(imageDesktop).url() : '',
        width: imageDesktop?.asset?.metadata?.dimensions?.width,
        height: imageDesktop?.asset?.metadata?.dimensions?.height,
    });

    const desktopSrcset = srcSet;

    if (imageTablet) {
        const {
            props: { srcSet },
        } = getImageProps({
            ...heroImageProps,
            src: urlFor(imageTablet).url(),
            width: imageTablet.asset?.metadata?.dimensions?.width,
            height: imageTablet.asset?.metadata?.dimensions?.height,
        });
        tabletSrcset = srcSet;
    }

    if (imageMobile) {
        const {
            props: { srcSet },
        } = getImageProps({
            ...heroImageProps,
            src: urlFor(imageMobile).url(),
            width: imageMobile.asset?.metadata?.dimensions?.width,
            height: imageMobile.asset?.metadata?.dimensions?.height,
        });
        mobileSrcset = srcSet;
    }

    return (
        <section>
            <div className="container pt-header">
                {section.principal_text && (
                    <div className="flex pt-yellow lg:pt-8 -mx-4">
                        <div className="w-2/12 hidden lg:block px-4"></div>
                        <div className="w-full md:w-7/12 lg:w-4/12 px-4">
                            <p>{section.principal_text}</p>
                        </div>
                    </div>
                )}
                <div className="pt-red">
                    <picture className='block bg-black'>
                        {imageMobile && <source media="(max-width: 767px)" srcSet={mobileSrcset} />}
                        {imageTablet && <source media="(max-width: 992px)" srcSet={tabletSrcset} />}
                        <source media="(min-width: 993px)" srcSet={desktopSrcset} />
                        <img className="w-full h-auto" {...rest} alt="Image Hero" />
                    </picture>
                </div>
            </div>
        </section>
    );
}