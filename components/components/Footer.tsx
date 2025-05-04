import Link from 'next/link';   
import SingleLink from './SingleLink';

export default function Footer({footer}: {footer:Sanity.FooterNavigation}) {
    return (
        <footer className="pt-pink pb-red">
            <div className="container">
                <div className="bg-black h-[1px] w-full opacity-30"></div>
                <div className="flex -mx-4 flex-wrap pt-red">
                    <div className="w-full md:w-5/12 lg:w-6/12 px-4 pb-14 md:pb-0">
                        <Link href="#">
                            <h1>Studio Test</h1>
                        </Link>
                        <p>2024 Studio Test</p>
                    </div>
                    <div className="w-6/12 md:w-3/12 lg:w-3/12 flex flex-col px-4 md:pt-2 items-start">
                        {
                            footer.social_links && footer.social_links.map((socialLink, index) => (
                                <SingleLink key={index} {...socialLink}>
                                    {socialLink.label}
                                </SingleLink>
                            ))
                        }
                    </div>
                    <div className="w-6/12 md:w-4/12 lg:w-3/12 flex flex-col px-4 md:pt-2">
                        {
                            footer.mail_contact && (
                                <SingleLink {...footer.mail_contact}>
                                    {footer.mail_contact.label}
                                </SingleLink>
                            )
                        }
                        <p>{footer.locations}</p>
                    </div>
                    <div className="w-full pt-pink px-4"></div>
                    <div className="w-full md:w-5/12 lg:w-6/12 px-4"></div>
                    <div className="w-6/12 md:w-3/12 px-4">
                        {
                            footer.sitemap && footer.sitemap.map((linkSitemap, index) => (
                                <SingleLink key={index} {...linkSitemap}>
                                    {linkSitemap.label}
                                </SingleLink>
                            ))
                        }
                    </div>
                    <div className="w-6/12 md:w-4/12 lg:w-3/12 px-4">
                        {
                            footer.terms_link && (
                                <SingleLink {...footer.terms_link}>
                                    {footer.terms_link.label}
                                </SingleLink>
                            )
                        }
                    </div>
                </div>
            </div>
        </footer>
    );
   
}