import { useState } from "react";
import { EMOTIONAL_REFLECTIONS } from "../data";
import imageTwo from "../2.jpg";

interface MirrorReflectionProps {
  isPl: boolean;
}

export default function MirrorReflection({ isPl }: MirrorReflectionProps) {
  const [openMirrors, setOpenMirrors] = useState<Record<string, boolean>>({});

  const toggleMirror = (id: string) => {
    setOpenMirrors((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section 
      id="lustra" 
      className="sec--light relative w-full py-24 px-6 md:px-12 xl:px-20 text-ink overflow-hidden flex flex-col justify-start items-center"
    >
      <div className="col z-10 flex flex-col items-center text-center space-y-4">
        {/* Eyebrow */}
        <span className="eyebrow">
          ROZPOZNANIE
        </span>

        {/* Main Header */}
        <h2 className="font-serif tracking-tight leading-tight flex flex-col items-center">
          <span className="text-navy font-light">
            W którym lustrze
          </span>
          <span className="text-navy italic font-normal mt-1">
            dzisiaj się przeglądasz?
          </span>
        </h2>

        {/* Subtitle with copy block */}
        <div className="max-w-[34rem] mx-auto space-y-5 pt-4 text-center">
          <p className="font-sans text-base text-ink leading-relaxed font-light tracking-wide max-w-[34rem] mx-auto">
            Ciężkość, presja, frustracja, wstyd - to sygnały, że odłączyłaś się od siebie. Dawno temu uwierzyłaś, że <strong>MUSISZ</strong> to zrobić - że musisz odrzucić siebie, żeby poczuć się kochana i wystarczająca. Czas zmienić to przekonanie i rozpoznać siebie na nowo.
          </p>
          <p className="font-sans text-base text-ink leading-relaxed font-light tracking-wide max-w-[34rem] mx-auto">
            Ta niewygoda i stres w Twoim życiu nie wynikają z tego, że coś jest z Tobą nie tak. To, jak działasz, jak myślisz i dokąd zmierzasz - <strong>NIE JEST TWOJE</strong>. Twoim podświadomym celem stało się spełnianie oczekiwań, a nie uszczęśliwianie samej siebie.
          </p>
          <p className="font-sans text-base text-cobalt font-semibold tracking-wide max-w-[34rem] mx-auto">
            W Self-Guidance Space w końcu to zmienisz.
          </p>
        </div>
      </div>

      {/* Photo 2.jpg once, above the accordion, full width */}
      <div className="col-media rounded-sm overflow-hidden z-10 my-12">
        <img 
          src={imageTwo} 
          alt="Lustra - Self-Guidance Space" 
          className="w-full h-auto object-cover max-h-[500px]"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Guiding line above accordion with class .lead-in */}
      <p className="lead-in max-w-[34rem] mx-auto">
        Przewiń i zatrzymaj się przy tym, w którym się rozpoznajesz. Nie musisz pasować do wszystkich.
      </p>

      {/* Main Accordion Container */}
      <div className="col z-10 flex flex-col w-full">
        {[
          { no: "Lustro pierwsze", teaser: "Osiągnęłaś cele, ale nie czujesz spełnienia", id: "m1", hid: "mh1", index: 0 },
          { no: "Lustro drugie", teaser: "Żyjesz w ciągłym biegu i boisz się ciszy", id: "m2", hid: "mh2", index: 1 },
          { no: "Lustro trzecie", teaser: "Dostosowujesz się do każdego głosu z zewnątrz", id: "m3", hid: "mh3", index: 2 },
          { no: "Lustro czwarte", teaser: "Masz już całą wiedzę, ale wciąż stoisz w miejscu", id: "m4", hid: "mh4", index: 3 },
          { no: "Lustro piąte", teaser: "Tak bardzo się starasz, ale efektów wciąż brak", id: "m5", hid: "mh5", index: 4 }
        ].map((item) => {
          const isOpen = !!openMirrors[item.id];
          const data = EMOTIONAL_REFLECTIONS[item.index];
          return (
            <div className="mirror" key={item.id}>
              <button 
                className="mirror__head" 
                aria-expanded={isOpen ? "true" : "false"} 
                aria-controls={item.id} 
                id={item.hid}
                onClick={() => toggleMirror(item.id)}
              >
                <span className="mirror__no">{item.no}</span>
                <span className="mirror__teaser">{item.teaser}</span>
                <span className="mirror__chev" aria-hidden="true"></span>
              </button>
              <div 
                className="mirror__body" 
                id={item.id} 
                role="region" 
                aria-labelledby={item.hid} 
                hidden={!isOpen}
              >
                <p className="mirror__desc font-sans text-base text-ink leading-relaxed font-light tracking-wide text-left mb-4 max-w-[34rem]">
                  {data.quote}
                </p>
                <h4 className="mirror__q">Dlaczego tak jest?</h4>
                <p className="font-sans text-base text-ink leading-relaxed font-light tracking-wide text-left max-w-[34rem]">
                  {data.responsePl}
                </p>
                <div className="mirror__other">
                  <h4>Po drugiej stronie lustra</h4>
                  <p className="font-sans text-base leading-relaxed font-light tracking-wide text-left text-on-dark max-w-[34rem]">
                    {data.otherSide}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
