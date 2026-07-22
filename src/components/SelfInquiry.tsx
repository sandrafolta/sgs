import React from "react";

interface SelfInquiryProps {
  isPl: boolean;
}

export default function SelfInquiry({ isPl }: SelfInquiryProps) {
  return (
    <>
      {/* 1. INVITATION (light section) */}
      <section className="invitation sec--light w-full py-24 px-6 md:px-16 flex flex-col justify-center items-center">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center">
          <ul className="list">
            <li>Jeśli chcesz zrobić to inaczej niż do tej pory.</li>
            <li>Jeśli chcesz zbudować trwały fundament w sobie, a nie na zewnątrz.</li>
            <li>Jeśli chcesz rozpoznać swój autorytet i zacząć z niego korzystać.</li>
            <li>Jeśli chcesz prowadzić siebie do najpiękniejszych życiowych doświadczeń.</li>
            <li>Jeśli chcesz spokoju, lekkości, spełnienia.</li>
            <li>Jeśli chcesz usłyszeć swój głos i pozwolić mu wyrażać się głośno i pewnie.</li>
          </ul>

          <div className="pt-12">
            <p className="font-serif italic text-[var(--cobalt)] font-light leading-tight">
              <span className="whitespace-nowrap">Self-Guidance Space</span> jest dla Ciebie.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PRICING (light section, id="dolacz") */}
      <section className="pricing sec--light w-full py-24 px-6 md:px-16 flex flex-col justify-center items-center" id="dolacz">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
          <span className="eyebrow">
            DOŁĄCZ DO PRZESTRZENI
          </span>
          <p className="lead-in max-w-[34rem] mx-auto text-center">
            Wybierz opcję płatności
          </p>

          <div className="anchor-card w-full max-w-[34rem] mx-auto mb-8">
            <p className="font-sans text-base leading-relaxed text-left text-ink">
              Ostatnia edycja Rozmów ze Sobą kosztowała 3222 zł. Dziś są one jednym z rozdziałów <span className="whitespace-nowrap">Self-Guidance Space</span> - a wchodząc do przestrzeni, dostajesz znacznie więcej. W cenie masz dodatkowe cztery procesy na wejściu, nowe procesy co miesiąc przez pół roku i grupę na Telegramie.
            </p>
          </div>

          <div className="price-card price-card--featured text-center w-full max-w-[34rem]">
            <p className="price-card__name">Płatność jednorazowa</p>
            <p className="price-card__value">2999 zł</p>
            <p className="price-card__bonus">Dostajesz sesję 1:1 ze mną w prezencie</p>
            <a className="btn btn--primary" href="https://platforma.sandrafolta.pl/s/self-guidance-space.html">Dołączam do przestrzeni</a>
          </div>

          <div className="price-card text-center w-full max-w-[34rem]">
            <p className="price-card__name">Płatność w 3 ratach</p>
            <p className="price-card__value">3 × 999 zł</p>
            <a className="btn btn--primary" href="https://platforma.sandrafolta.pl/s/self-guidance-space.html">Dołączam do przestrzeni</a>
          </div>

          <div className="price-card text-center w-full max-w-[34rem]">
            <p className="price-card__name">Płatność w 6 ratach</p>
            <p className="price-card__value">6 × 555 zł</p>
            <a className="btn btn--primary" href="https://platforma.sandrafolta.pl/s/self-guidance-space.html">Dołączam do przestrzeni</a>
          </div>

          <p className="pricing__note max-w-[34rem] mx-auto text-center">Dostęp do wszystkich elementów przestrzeni i grupy na Telegramie otrzymujesz od razu po zakupie, na 6 miesięcy od dołączenia.</p>
        </div>
      </section>

      {/* 3. CLOSING (dark section, last before the footer) */}
      <section className="closing sec--dark w-full py-28 px-6 md:px-16 flex flex-col justify-center items-center text-center relative">
        <div className="w-full max-w-5xl mx-auto z-10 flex flex-col items-center space-y-12">
          <p className="font-sans text-base md:text-lg text-[var(--on-dark-soft)] font-light leading-relaxed max-w-[34rem] mx-auto">
            Od razu po dołączeniu zaczynasz drogę do samoprowadzenia. Przed Tobą 6 miesięcy poznawania siebie, niesamowitych odkryć i zmian.
          </p>

          <h2 className="font-serif text-[var(--fs-h2)] text-[#fff] font-light tracking-tight leading-tight max-w-[34rem] mx-auto">
            Czekam na Ciebie w Self-Guidance Space.
          </h2>

          <div className="pt-6">
            <a className="btn btn--primary" href="https://platforma.sandrafolta.pl/s/self-guidance-space.html">
              Dołączam do przestrzeni
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
