import FeaturedProjects from "../sections/FeaturedProjects";
import Hero from "../sections/Hero";
import Services from "../sections/Services";
import Studio from "../sections/Studio";
import Approach from "../sections/Approach";

const componentMap: { [key: string]: React.ComponentType } = {
    "hero": Hero,
    "featured_projects": FeaturedProjects,
    "studio": Studio,
    "services": Services,
    "approach": Approach
};

export default function Sections({ sections }: { sections?: Sanity.Section[] }) {
  if (!sections || sections.length === 0) {
    return <p>No section included in this page</p>;
  }

  return (
    <>
      {sections.map((section: Sanity.Section) => {
        const Component = componentMap[section._type];
        if (!Component) {
          return (
            <div data-type={section._type} key={section._key}>
              Unknown section type: {section._type}
            </div>
          );
        }
        return <Component {...section} key={section._key} />;
      })}
    </>
  );
}
