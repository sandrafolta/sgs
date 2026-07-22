import React, { useState } from "react";
import { motion } from "motion/react";
import imageFour from "../4.jpg";
import iconLustro from "../icon-lustro.png";
import iconPryzmat from "../icon-pryzmat.png";
import iconZrodlo from "../icon-zrodlo.png";

interface PrismViewerProps {
  isPl: boolean;
}

export default function PrismViewer({ isPl }: PrismViewerProps) {
  const [joined, setJoined] = React.useState(false);
  const stageRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) { setJoined(true); return; }
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => setJoined(e.isIntersecting)),
      { threshold: 0.55 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Shards configuration. Each shard has a unique clip-path and responsive translation shifts.
  const shards = [
    {
      id: 1,
      clip: "polygon(0% 0%, 62% 0%, 35% 55%, 0% 30%)",
      shiftX: -32,
      shiftY: -22,
      rotate: -7,
    },
    {
      id: 2,
      clip: "polygon(62% 0%, 100% 0%, 100% 38%, 58% 46%, 35% 55%)",
      shiftX: 26,
      shiftY: -30,
      rotate: 6,
    },
    {
      id: 3,
      clip: "polygon(0% 30%, 35% 55%, 20% 100%, 0% 100%)",
      shiftX: -24,
      shiftY: 28,
      rotate: -5,
    },
    {
      id: 4,
      clip: "polygon(35% 55%, 58% 46%, 74% 100%, 20% 100%)",
      shiftX: 8,
      shiftY: 34,
      rotate: 3,
    },
    {
      id: 5,
      clip: "polygon(100% 38%, 100% 100%, 74% 100%, 58% 46%)",
      shiftX: 36,
      shiftY: 18,
      rotate: 8,
    },
  ];

  // When joined, the base shatter multiplier is 0 (fully aligned). Otherwise it is 1.0 (shattered).
  const multiplier = joined ? 0 : 1.0;

  return (
    <>
      <section 
        id="prism-viewer-section" 
        className="sec--light relative w-full py-24 px-6 md:px-16 overflow-hidden flex flex-col justify-center items-center"
      >
      {/* Light refraction beam overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[30%] left-[-10%] w-[130%] h-[200px] bg-gradient-to-r from-transparent via-cobalt/5 to-transparent blur-3xl rotate-12 animate-prism-sweep" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-cobalt/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-5xl z-10 flex flex-col gap-20 items-center">
        
        {/* Top block: Philosophy narrative & Interactive photo */}
        <div className="w-full stack">
          
          {/* Left Column: Narrative & Philosophy */}
          <div className="col text-left flex flex-col gap-[var(--sp-block)]">
            <h2 className="font-serif font-light tracking-tight text-navy leading-tight text-center">
              Moja filozofia, która buduje <span className="whitespace-nowrap">Self-Guidance Space</span>
            </h2>

            <span className="eyebrow !mb-0 text-left">
              W co wierzę
            </span>

            <ul className="list">
              <li>Twoje emocje są prawdziwe, ale obraz, przez który na nie patrzysz, już nie. Twoja rzeczywistość zależy od kąta widzenia - zmieniasz go, uwalniając emocje. Z poziomu spokoju widzisz siebie, świat i konkretne sytuacje zupełnie inaczej.</li>
              <li>Prawda, która Cię ogranicza, to tylko przekonanie. A przekonanie możesz zmienić.</li>
              <li>Możesz mieć inaczej niż sto innych osób. To nie znaczy, że źle - znaczy, że masz inaczej.</li>
              <li>Nikt nie stoi wyżej od Ciebie. Nie musisz prosić o pozwolenie ani o zgodę.</li>
              <li>Kwestionuj rzeczywistość i wszystko, w co do tej pory wierzyłaś. Ale nigdy siebie.</li>
            </ul>
          </div>

          {/* Right Column: Majestic Shard Stage */}
          <div className="col-media flex flex-col items-center">
            
            {/* Shard Container Card with Ivory/Light Glass aesthetic */}
            <div 
              ref={stageRef}
              className="relative w-full max-w-[28rem] aspect-[768/1367] bg-white/40 border-[0.5px] border-grey/30 rounded-sm overflow-hidden group shadow-xl mx-auto"
            >
              {/* Shards rendering */}
              {shards.map((shard) => {
                const tx = shard.shiftX * multiplier;
                const ty = shard.shiftY * multiplier;
                const r = shard.rotate * multiplier;

                return (
                  <motion.div
                    key={shard.id}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      clipPath: shard.clip,
                    }}
                    initial={{
                      x: shard.shiftX,
                      y: shard.shiftY,
                      rotate: shard.rotate,
                      scale: 1.03,
                    }}
                    animate={{
                      x: tx,
                      y: ty,
                      rotate: r,
                      scale: 1 + multiplier * 0.03,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 140,
                      damping: 24,
                    }}
                  >
                    <img
                      src={imageFour}
                      alt="Rozbita Perspektywa"
                      className="w-full h-full object-cover transition-all duration-300 select-none pointer-events-none"
                      style={{
                        filter: `contrast(${1.0 + multiplier * 0.1}) brightness(${1.05 - multiplier * 0.05}) grayscale(${multiplier * 20}%)`,
                      }}
                      referrerPolicy="no-referrer"
                    />

                    {/* Shard border accent */}
                    <div 
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      style={{
                        boxShadow: `inset 0 0 0 1px rgba(10, 30, 60, ${0.04 + multiplier * 0.15})`,
                      }}
                    />
                  </motion.div>
                );
              })}

              {/* Rainbow prism glint highlight */}
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-700 bg-gradient-to-tr from-transparent via-sky-300/10 to-[var(--amber)]/10 mix-blend-screen"
                style={{
                  opacity: multiplier,
                }}
              />
            </div>

          </div>

        </div>

        {/* JAK PRACUJĘ */}
        <div className="w-full flex flex-col items-center text-center">
          <span className="eyebrow">
            JAK PRACUJĘ
          </span>

          <div className="w-full max-w-[34rem] mx-auto text-left flex flex-col">
            <p className="py-5">
              <strong className="font-semibold text-navy">Konfrontuję.</strong> Im szybciej zobaczysz to, co trudne i nieprzyjemne, tym szybciej poczujesz ulgę i zobaczysz efekty.
            </p>
            <p className="py-5">
              <strong className="font-semibold text-navy">Skupiam się na negatywach, ale tylko po to, żeby je UWOLNIĆ.</strong> Zamiast wklepywać afirmacje, wolę pokazać Ci Twoje prawdziwe emocje, żebyś mogła je poczuć, puścić i zrobić w sobie miejsce na naturalne pozytywne myślenie, do którego nie trzeba się przekonywać i zmuszać.
            </p>
            <p className="py-5">
              <strong className="font-semibold text-navy">Szukam klamry.</strong> Zamiast uwalniać każdą blokadę, każdą emocję i każdą trudną historię z osobna, szukam tego, co spina jak najwięcej z nich. Wyłapuję schemat, który objawia się wszystkimi tymi aspektami - żeby skrócić drogę do celu, a nie dzielić włos na czworo.
            </p>
            <p className="py-5">
              <strong className="font-semibold text-navy">Pracuję nad Twoją tożsamością, nie nad Twoją przeszłością.</strong> To, co Ci się kiedyś przydarzyło, sprawia, że tu i teraz patrzysz na siebie w określony sposób. I to ten obraz trzeba zmienić. Nie musisz uwolnić się od wszystkich trudnych historii - możesz sprawić, że przestaną mieć na Ciebie wpływ.
            </p>
            <p className="py-5">
              <strong className="font-semibold text-navy">Nie zadowalam się „względnym spokojem".</strong> Wolę pogrzebać, dopytać i doprowadzić temat do końca, żeby problem przestał Cię dotyczyć, zamiast zatrzymać się na „czuję się trochę lepiej".
            </p>
            <p className="py-5">
              <strong className="font-semibold text-navy">Łączę EFT z manifestacją.</strong> Wierzę, że możesz osiągnąć każdy cel, który dzisiaj wykracza poza Twoją logikę. I nie musisz się do tego zmieniać ani spełniać określonych warunków - musisz przestać je sobie stawiać.
            </p>
          </div>

          <div className="box box--quote mt-10">
            <p>
              Tam, gdzie są nieprzyjemne emocje, tam jest iluzja. Negatywne emocje podtrzymują problem. Gdy je uwolnisz, problem znika.
            </p>
          </div>
        </div>

      </div>
    </section>

      {/* LUSTRO / PRYZMAT / ŹRÓDŁO SECTION → sec--dark */}
      <section className="sec--dark relative w-full py-24 px-6 md:px-16 overflow-hidden flex flex-col justify-center items-center border-t border-white/10">
        <div className="w-full max-w-5xl z-10 flex flex-col items-center">
          
          {/* Stacking layout */}
          <div className="flex flex-col w-full">
            
            {/* LUSTRO block */}
            <div className="flex flex-col items-center text-center">
              <img src={iconLustro} alt="" aria-hidden="true" className="symbol-icon" />
              <h3 className="font-sans text-[var(--fs-h3)] text-[#fff] font-bold tracking-[0.2em] uppercase mb-4">
                LUSTRO
              </h3>
              <p className="font-sans text-[var(--on-dark)] text-base md:text-lg leading-relaxed font-light max-w-[34rem] mx-auto">
                Rzeczywistość odbija Twoją relację ze sobą i z życiem.
              </p>
            </div>

            {/* Hairline spacer */}
            <div className="w-full h-[1px] bg-[rgba(231,228,223,0.14)] my-[clamp(2.5rem,8vw,4rem)]" />

            {/* PRYZMAT block */}
            <div className="flex flex-col items-center text-center">
              <img src={iconPryzmat} alt="" aria-hidden="true" className="symbol-icon" />
              <h3 className="font-sans text-[var(--fs-h3)] text-[#fff] font-bold tracking-[0.2em] uppercase mb-4">
                PRYZMAT
              </h3>
              <p className="font-sans text-[var(--on-dark)] text-base md:text-lg leading-relaxed font-light max-w-[34rem] mx-auto">
                Twoja perspektywa zmienia się zależnie od Twojego stanu świadomości.
              </p>
            </div>

            {/* Hairline spacer */}
            <div className="w-full h-[1px] bg-[rgba(231,228,223,0.14)] my-[clamp(2.5rem,8vw,4rem)]" />

            {/* ŹRÓDŁO block */}
            <div className="flex flex-col items-center text-center">
              <img src={iconZrodlo} alt="" aria-hidden="true" className="symbol-icon" />
              <h3 className="font-sans text-[var(--fs-h3)] text-[#fff] font-bold tracking-[0.2em] uppercase mb-4">
                ŹRÓDŁO
              </h3>
              <p className="font-sans text-[var(--on-dark)] text-base md:text-lg leading-relaxed font-light max-w-[34rem] mx-auto">
                To Ty jesteś źródłem odpowiedzi, miłości i spokoju. Nie musisz szukać ich na zewnątrz.
              </p>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
