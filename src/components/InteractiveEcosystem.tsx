import { motion } from "motion/react";

interface InteractiveEcosystemProps {
  isPl: boolean;
}

export default function InteractiveEcosystem({ isPl }: InteractiveEcosystemProps) {
  // Polish Copy exactly as requested
  const copy = {
    title: "Ścieżka Self-Guidance Space",
    coreTitle: "ROZMOWY ZE SOBĄ",
    coreSubtitle: "FUNDAMENT PRACY Z EFT",
    coreDesc: "Sercem przestrzeni są Rozmowy ze Sobą, czyli fundament pracy z EFT. Podstawy i zaawansowane techniki, które stosujesz na sobie codziennie, zależnie od bieżących potrzeb, prowadząc swoje własne procesy.",
    aroundDesc: "Wokół nich buduje się reszta: mini-kursy, większe kursy i masterclassy. Każdy element to zamknięty proces wokół jednego, wąskiego tematu. Wszystkie tworzą jeden ekosystem, który prowadzi do trwałej zmiany, wewnętrznej prawdy i życia w zgodzie ze sobą.",
    connectionDesc: "Jedno przekonanie może trzymać Cię w miejscu w kilku obszarach - w pieniądzach, biznesie, zdrowiu czy relacjach. Praca wyłącznie na jednym z nich jest wyrwana z kontekstu. W tej przestrzeni wszystko się przenika.",
    accessTitle: "Na wejściu dostajesz dostęp do:",
    accessItems: [
      {
        title: "Rozmowy ze Sobą - serce przestrzeni",
        separator: ": ",
        desc: "sześć modułów w formie nagrań, w których uczę Cię EFT od podstaw po zaawansowane procesy, plus skrypty technik w PDF."
      },
      {
        title: "Opukaj to Sama",
        separator: " - ",
        desc: "nauczysz się tworzyć własne rundki EFT, dopasowane do Twoich emocji, myśli i wspomnień, zamiast korzystać z gotowych, które nigdy nie trafiają w Twój temat. To moduł z Rozmów ze Sobą, wydzielony osobno - fundament pod wszystkie głębsze procesy."
      },
      {
        title: "Wypukaj sobie BONUSY od życia",
        separator: " - ",
        desc: "nagranie masterclassu o tym, co blokuje Cię przed przyjmowaniem: prezentami, szansami i zbiegami okoliczności, które wykraczają poza Twoje planowanie i kontrolę. Otwierasz się na przyjmowanie zamiast napięcia „nie zasłużyłam\" albo „teraz trzeba się odwdzięczyć\"."
      },
      {
        title: "Zapukaj po więcej pieniędzy",
        separator: " - ",
        desc: "wyzwanie z 15 rundkami EFT w PDF i audio, które pokazują, co naprawdę myślisz i czujesz o pieniądzach pod afirmacjami i technikami manifestacji. Nie po to, żeby poczuć się lepiej, tylko żeby ruszyć to, co się w Tobie zastało."
      },
      {
        title: "Oaza Spokoju",
        separator: " - ",
        desc: "dwa spotkania o emocjach w macierzyństwie, Twoich i Twojego dziecka. Jeśli jesteś mamą, znajdziesz tu narzędzia na wyrzuty sumienia, utratę cierpliwości i powielanie schematów, których nie chcesz powielać."
      }
    ],
    communityDesc: "Co miesiąc dołączam kolejny element - nowy krok na ścieżce do samoprowadzenia. A przez cały czas jesteś częścią społeczności i masz ze mną kontakt: cztery razy w miesiącu spotykamy się na Telegramie w dedykowanej, zamkniętej grupie."
  };

  return (
    <section 
      id="sciezka" 
      className="sec--light relative w-full py-20 md:py-28 px-6 md:px-16 text-ink overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Main Header (Clean, minimal, no line, no chapter label) */}
      <div className="text-center max-w-[34rem] mx-auto mb-12 md:mb-16 z-10 flex flex-col items-center">
        <span className="eyebrow">
          CO DOSTAJESZ
        </span>
        <h2 className="font-serif font-light tracking-tight text-navy mb-4">
          {copy.title}
        </h2>
      </div>

      {/* Stacked Layout: Graphic first, then Copy below */}
      <div className="w-full max-w-5xl flex flex-col items-center z-10 space-y-12 md:space-y-16">
        
        {/* Rebuilt Ecosystem Graphic */}
        <div className="w-full max-w-[600px] mx-auto relative flex flex-col items-center">
          
          {/* Navy Core Circle */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] rounded-full p-4 text-center flex flex-col justify-center items-center border-[1.5px] border-[var(--amber)]/25 select-none shrink-0 z-10"
            style={{
              background: "radial-gradient(circle at 35% 35%, #162E52 0%, #0E192B 55%, #051022 100%)",
              boxShadow: "inset -4px -4px 12px rgba(255,255,255,0.06), inset 4px 4px 12px rgba(0,0,0,0.45), 0 20px 45px rgba(10,30,60,0.22)"
            }}
          >
            <h3 className="font-sans font-bold text-white tracking-[0.18em] text-[0.8125rem] uppercase mb-1">
              {copy.coreTitle}
            </h3>
            <span className="font-sans text-[0.75rem] text-[var(--on-dark-soft)] uppercase tracking-wider">
              {copy.coreSubtitle}
            </span>
          </motion.div>

          {/* 48px Vertical Hairline below core */}
          <div className="w-[1px] h-[48px] bg-grey/30 z-10 my-0" />

          {/* Satellite Row/Stack */}
          <div className="relative w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-12 z-10">
            {/* Desktop horizontal hairline connecting satellite centers */}
            <div className="hidden md:block absolute top-[65px] left-[65px] right-[65px] h-[1px] bg-grey/30 -translate-y-1/2 z-0" />
            {/* Mobile vertical hairline connecting satellite centers */}
            <div className="block md:hidden absolute top-[65px] bottom-[80px] left-1/2 w-[1px] bg-grey/30 -translate-x-1/2 z-0" />

            {/* Satellite 1: KURSY */}
            <div className="flex flex-col items-center text-center z-10">
              <div 
                className="w-[130px] h-[130px] rounded-full flex items-center justify-center text-center p-3 border border-[#E8E2D9] relative z-10 shrink-0"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #FFFFFF 0%, #F1EDE7 55%, #E2DDD5 100%)",
                  boxShadow: "inset -3px -3px 8px rgba(0,0,0,0.07), inset 3px 3px 8px rgba(255,255,255,0.9), 0 10px 20px rgba(0,0,0,0.05)"
                }}
              >
                <span className="font-sans text-[0.8125rem] font-bold text-navy tracking-[0.12em] uppercase">
                  KURSY
                </span>
              </div>
              <span className="text-[0.8125rem] text-[var(--ink-soft)] font-sans font-light mt-3">
                kompletne procesy
              </span>
            </div>

            {/* Satellite 2: MINI KURSY */}
            <div className="flex flex-col items-center text-center z-10">
              <div 
                className="w-[130px] h-[130px] rounded-full flex items-center justify-center text-center p-3 border border-[#E8E2D9] relative z-10 shrink-0"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #FFFFFF 0%, #F1EDE7 55%, #E2DDD5 100%)",
                  boxShadow: "inset -3px -3px 8px rgba(0,0,0,0.07), inset 3px 3px 8px rgba(255,255,255,0.9), 0 10px 20px rgba(0,0,0,0.05)"
                }}
              >
                <span className="font-sans text-[0.8125rem] font-bold text-navy tracking-[0.12em] uppercase">
                  MINI KURSY
                </span>
              </div>
              <span className="text-[0.8125rem] text-[var(--ink-soft)] font-sans font-light mt-3">
                krótkie procesy
              </span>
            </div>

            {/* Satellite 3: MASTERCLASSY */}
            <div className="flex flex-col items-center text-center z-10">
              <div 
                className="w-[130px] h-[130px] rounded-full flex items-center justify-center text-center p-3 border border-[#E8E2D9] relative z-10 shrink-0"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #FFFFFF 0%, #F1EDE7 55%, #E2DDD5 100%)",
                  boxShadow: "inset -3px -3px 8px rgba(0,0,0,0.07), inset 3px 3px 8px rgba(255,255,255,0.9), 0 10px 20px rgba(0,0,0,0.05)"
                }}
              >
                <span className="font-sans text-[0.8125rem] font-bold text-navy tracking-[0.12em] uppercase">
                  MASTERCLASSY
                </span>
              </div>
              <span className="text-[0.8125rem] text-[var(--ink-soft)] font-sans font-light mt-3">
                głębokie warsztaty
              </span>
            </div>
          </div>

        </div>

        {/* coreDesc paragraph rendered directly below the graphic */}
        <p className="font-sans text-[var(--fs-body)] text-ink leading-relaxed font-light text-center max-w-[34rem] mx-auto z-10">
          {copy.coreDesc}
        </p>

        {/* Editorial layout showing exact copy blocks beautifully below the graphic */}
        <div className="w-full max-w-[34rem] mx-auto space-y-12 text-center">
          
          {/* Section 1: Core and Around logic */}
          <div className="space-y-6">
            <p className="font-sans text-base text-ink leading-relaxed font-light tracking-wide text-center max-w-[34rem] mx-auto">
              {copy.aroundDesc}
            </p>
          </div>

          {/* Section 2: Connection logic ("Bo jedno przekonanie...") */}
          <div className="box box--quote">
            <p>
              {copy.connectionDesc}
            </p>
          </div>

          {/* Section 3: Na wejściu dostajesz dostęp do: */}
          <div className="space-y-4">
            <h4 className="font-serif text-base text-navy tracking-wide font-medium text-center">
              {copy.accessTitle}
            </h4>
            <ul className="list">
              {copy.accessItems.map((item, index) => (
                <li key={index}>
                  <p className="leading-relaxed">
                    <strong className="font-semibold text-navy">{item.title}</strong>
                    {item.separator}
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>

            <div className="box mt-6">
              <p>Dostęp do wszystkich elementów przestrzeni i grupy na Telegramie otrzymujesz od razu po zakupie.</p>
            </div>
          </div>

          {/* Section 4: Community narrative */}
          <div className="pt-8">
            <p className="font-sans text-base text-ink leading-relaxed font-light tracking-wide text-center max-w-[34rem] mx-auto">
              {copy.communityDesc}
            </p>
          </div>


        </div>

        {/* Nadchodzące procesy w Self-Guidance Space block */}
        <div className="w-full max-w-[34rem] mx-auto mt-16 text-left space-y-8">
          <h3 className="font-serif text-navy tracking-wide font-normal text-center">
            Nadchodzące procesy w Self-Guidance Space
          </h3>
          
          <div className="space-y-6">
            <div className="box">
              <p>
                <strong>Masterclass: Most do nowej tożsamości</strong>
                <br />
                Czyli jak znaleźć odpowiedź na pytanie „Co mam teraz zrobić?" i odzyskać spokój, gdy stare stało się niewygodne i przestało działać, ale nowe jeszcze nie pojawiło się w Twoim życiu
              </p>
            </div>

            <div className="box">
              <p>
                <strong>Kurs: Spotkanie z Małą Ja</strong>
                <br />
                Twoje emocje z tu i teraz nie należą do Ciebie - czuje je Twoja młodsza wersja, która na Ciebie czeka, żeby poczuć spokój i poczuć się kochana. Pokażę Ci, jak możesz się z nią spotkać i pomóc jej, przy okazji pomagając sobie.
              </p>
            </div>

            <div className="box">
              <p>
                <strong>Kurs: Twój związek = Twoja kreacja</strong>
                <br />
                Możesz być w związku z mężczyzną swoich marzeń - jeśli tylko sobie na to pozwolisz. Twój obecny partner może stać się mężczyzną Twoich marzeń - jeśli tylko mu na to pozwolisz. Pokażę Ci, jak Twoje emocje i przekonania wykreowały Twoje relacje i jak możesz je zmienić, zmieniając swoją energię.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
