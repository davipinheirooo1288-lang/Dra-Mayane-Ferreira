const faqAnswers = {
  1: "Busque orientação jurídica imediata. A advogada poderá avaliar o caso, acompanhar a audiência de custódia e adotar as medidas cabíveis para preservar direitos desde o primeiro momento.",
  2: "Antes de comparecer, é recomendável buscar orientação jurídica. Uma declaração mal conduzida pode impactar o andamento do caso. A defesa técnica ajuda a entender riscos e próximos passos.",
  3: "A audiência de custódia ocorre após a prisão em flagrante e serve para verificar a legalidade da prisão, avaliar eventuais irregularidades e analisar medidas cabíveis conforme o caso.",
  4: "A atuação pode ocorrer em prisão em flagrante, audiência de custódia, inquérito policial, intimação para depoimento, ação penal, execução penal e demais situações criminais que exijam defesa técnica."
};

const faqButtons = [...document.querySelectorAll("[data-faq]")];
const faqPopover = document.querySelector("#faq-answer-popover");
const faqPopoverText = faqPopover?.querySelector("p");
const faqClose = faqPopover?.querySelector(".faq-close");

function closeFaq() {
  if (!faqPopover) return;
  faqPopover.hidden = true;
  faqButtons.forEach((button) => button.setAttribute("aria-expanded", "false"));
}

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const answer = faqAnswers[button.dataset.faq];
    if (!faqPopover || !faqPopoverText || !answer) return;

    const isOpen = button.getAttribute("aria-expanded") === "true" && !faqPopover.hidden;
    closeFaq();
    if (isOpen) return;

    faqPopoverText.textContent = answer;
    faqPopover.hidden = false;
    button.setAttribute("aria-expanded", "true");
  });
});

faqClose?.addEventListener("click", closeFaq);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeFaq();
  }
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealTargets = [
  ...document.querySelectorAll(".template-section, .trust-section, .trust-cards article")
];

if (!reduceMotion.matches && revealTargets.length) {
  let templateIndex = 0;

  revealTargets.forEach((target, index) => {
    target.style.setProperty("--motion-delay", `${Math.min(index * 35, 180)}ms`);

    if (target.classList.contains("template-section")) {
      target.classList.add(templateIndex % 2 === 0 ? "motion-right" : "motion-left");
      templateIndex += 1;
    }
  });

  document.querySelector("#hero")?.classList.add("is-visible");
  document.documentElement.classList.add("motion-ready");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.14
      }
    );

    revealTargets
      .filter((target) => !target.classList.contains("is-visible"))
      .forEach((target) => revealObserver.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }
}
