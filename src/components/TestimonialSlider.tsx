import { useState, KeyboardEvent } from "react";
import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { REVIEWS, MENTORING_REVIEWS } from "../data";

interface TestimonialSliderProps {
  isPl: boolean;
}

interface TestimonialCardProps {
  review: { author: string; text: string };
  cleanAuthor: string;
  activeTab: "kurs" | "mentoring";
}

function TestimonialCard({ review, cleanAuthor }: TestimonialCardProps) {
  return (
    <div className="testimonial-card relative">
      <Quote size={20} className="text-cobalt/15 absolute top-6 right-6 pointer-events-none" />
      
      <p>
        „{review.text}”
      </p>

      <span className="author">{cleanAuthor}</span>
    </div>
  );
}

export default function TestimonialSlider({ isPl }: TestimonialSliderProps) {
  const [activeTab, setActiveTab] = useState<"kurs" | "mentoring">("kurs");
  const [visibleCount, setVisibleCount] = useState(3);

  const testimonials = activeTab === "kurs" ? REVIEWS : MENTORING_REVIEWS;
  const visibleTestimonials = testimonials.slice(0, visibleCount);
  const hiddenCount = testimonials.length - visibleCount;

  const handleTabChange = (tab: "kurs" | "mentoring") => {
    setActiveTab(tab);
    setVisibleCount(3);
  };

  const handleKeyDown = (e: KeyboardEvent, currentTab: "kurs" | "mentoring") => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const nextTab = currentTab === "kurs" ? "mentoring" : "kurs";
      handleTabChange(nextTab);
      setTimeout(() => {
        const nextBtn = document.getElementById(nextTab === "kurs" ? "tab-kurs" : "tab-mentoring");
        nextBtn?.focus();
      }, 50);
    }
  };

  const handleLoadMore = () => {
    if (hiddenCount > 0) {
      setVisibleCount((prev) => Math.min(prev + 3, testimonials.length));
    } else {
      setVisibleCount(3);
    }
  };

  const getSanitizedAuthor = (author: string) => {
    if (author === "Sandra") {
      return activeTab === "kurs" ? "Uczestniczka Rozmów ze Sobą" : "Uczestniczka mentoringu";
    }
    return author;
  };

  return (
    <section 
      id="opinie" 
      className="testimonials sec--dark w-full py-24 px-6 md:py-28 md:px-16 overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Header and Guidance */}
        <div className="w-full max-w-[34rem] mx-auto z-10 flex flex-col items-center text-center mb-[calc(var(--sp-block)*0.5)] gap-[calc(var(--sp-block)*0.5)]">
          <span className="eyebrow !mb-0">
            OPINIE
          </span>
          <h2 className="font-serif font-light tracking-tight text-white !mb-0">
            Prawdziwe doświadczenia kobiet
          </h2>

          <p className="lead-in max-w-[34rem] mx-auto text-[#E7E4DF]/90 font-light !m-0">
            Przełącz zakładkę, żeby zobaczyć opinie o Rozmowach ze Sobą albo o pracy 1:1 ze mną
          </p>

          <div 
            className="flex justify-center space-x-8 w-full max-w-[34rem] mx-auto !pt-0"
            role="tablist"
            aria-label="Kategorie opinii"
          >
            <button
              id="tab-kurs"
              role="tab"
              aria-selected={activeTab === "kurs"}
              aria-controls="panel-reviews"
              tabIndex={activeTab === "kurs" ? 0 : -1}
              onClick={() => handleTabChange("kurs")}
              onKeyDown={(e) => handleKeyDown(e, "kurs")}
              className={`tab ${activeTab === "kurs" ? "is-active" : ""}`}
            >
              Rozmowy ze Sobą
            </button>
            
            <button
              id="tab-mentoring"
              role="tab"
              aria-selected={activeTab === "mentoring"}
              aria-controls="panel-reviews"
              tabIndex={activeTab === "mentoring" ? 0 : -1}
              onClick={() => handleTabChange("mentoring")}
              onKeyDown={(e) => handleKeyDown(e, "mentoring")}
              className={`tab ${activeTab === "mentoring" ? "is-active" : ""}`}
            >
              Mentoring
            </button>
          </div>
        </div>

        {/* Testimonials Vertical List */}
        <div 
          id="panel-reviews"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="w-full max-w-5xl z-10 flex flex-col space-y-6"
        >
          {visibleTestimonials.map((review, index) => {
            const cleanAuthor = getSanitizedAuthor(review.author || "Uczestniczka");
            return (
              <motion.div
                key={`${activeTab}-${index}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <TestimonialCard 
                  review={review}
                  cleanAuthor={cleanAuthor}
                  activeTab={activeTab}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Expand/Collapse Button */}
        {testimonials.length > 3 && (
          <button
            onClick={handleLoadMore}
            className="btn mt-8 z-10"
          >
            {hiddenCount > 0 ? `Pokaż więcej opinii (${hiddenCount})` : "Zwiń opinie"}
          </button>
        )}
      </div>
    </section>
  );
}
