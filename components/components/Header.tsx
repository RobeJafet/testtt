import SingleLink from "./SingleLink";
import LangChangeHandler from "./LangChangeHandler";

export default function Header({navigation, lang, translations}: {navigation: Sanity.HeaderNavigation, lang: LocalePage, translations: Sanity.Translation[]}): React.ReactNode {
    return(
        <header className="mix-blend-difference fixed top-0 w-full z-10">
            <div className="container">
                <div className="flex pt-6 md:pt-8 justify-between items-center text-white">
                    <SingleLink
                        page={{_type: 'home', slug: '', language: lang}}
                        linkType={'page'}
                        openInNewTab={false}
                    >
                        <h1 className="text-white logo-header">
                            Studio Test
                        </h1>
                    </SingleLink>
                    <div className="flex gap-8">
                        {
                            navigation?.map((navItem, index) => (
                                <SingleLink key={index} {...navItem} >
                                    <p className="scramble-hover">
                                        {navItem.label}
                                    </p>
                                </SingleLink>
                            ))
                        }
                        <LangChangeHandler lang={lang} translations={translations} /> 
                    </div>
                </div>
            </div>
        </header>
    )
}