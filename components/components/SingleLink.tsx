import Link from 'next/link';


export default function SingleLink({ href, page, linkType,  children, openInNewTab }: Sanity.Link) {
    if (linkType === 'page') {
        if (page?._type === 'home') {
           return (
               <Link href='/' className='flex gap-4 items-center'>
                   {children}
               </Link>
           );
        }
        else if (page?._type === 'project.post') {
            return (
                <Link href={`/projects/${page?.slug}`} className='flex gap-4 items-center'>
                    {children}
                </Link>
            );
        }
        else {
            return (
                <Link href={`/${page?.slug}`} className='flex gap-4 items-center'>
                    {children}
                </Link>
            );
        }
    } else {
        return (
            <a href={href} target={openInNewTab ? '_blank' : ''} rel={openInNewTab ? 'noopener noreferrer' : ''} className='flex gap-4 items-center'>
                {children}
            </a>
        )
    }
}