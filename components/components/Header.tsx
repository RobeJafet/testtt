import Link from "next/link";
import SingleLink from "./SingleLink";
import LangChangeHandler from "./LangChangeHandler";

export default function Header({navigation, lang}: {navigation: Sanity.HeaderNavigation, lang: LocalePage}) {
    return(
        <header className="mix-blend-difference fixed top-0 w-full z-10">
            <div className="container">
                <div className="flex pt-6 md:pt-8 justify-between items-center text-white">
                    <Link href="/">
                        <h1 className="text-white">Studio Test</h1>
                    </Link>
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
                        <LangChangeHandler lang={lang} /> 
                    </div>
                </div>
            </div>
        </header>
    )
}