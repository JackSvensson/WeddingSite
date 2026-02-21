import SectionDivider from "./SectionDivider";

export default function StorySection() {
  return (
    <section id="var-historia" className="story">
      <div className="story__inner">
        <p className="section-label">Vår berättelse</p>
        <h2 className="section-title">Hur vi träffades</h2>

        <SectionDivider />

        <div className="story__body">
          <p>
            Här kan ni berätta er kärlekshistoria. Hur ni träffades, vad som
            hände, och hur resan ledde fram till att ni bestämde er för att
            gifta er. Skriv från hjärtat — era gäster kommer att älska att
            läsa er berättelse.
          </p>
          <p>
            Ni kan lägga till flera stycken, bilder, och skapa en tidslinje
            med viktiga ögonblick i er relation. Kanske det första mötet,
            första resan tillsammans, eller det magiska frieriet.
          </p>
          <p className="story__quote">
            "Ett valfritt citat som betyder något speciellt för er."
          </p>
        </div>
      </div>
    </section>
  );
}