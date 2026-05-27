import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const js = readFileSync("script.js", "utf8");

const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

const h1Count = (html.match(/<h1\b/gi) || []).length;
expect(h1Count === 1, `Esperado exatamente 1 H1, encontrado ${h1Count}.`);

const requiredText = [
  "Advocacia criminal com atuação estratégica, técnica e humanizada.",
  "Mayane Ferreira",
  "OAB/PR 124.249",
  "Caarapó/MS",
  "@mayaneferreira.adv",
  "Perguntas frequentes",
  "Atendimento com técnica, discrição e proximidade."
];

requiredText.forEach((text) => {
  expect(html.includes(text), `Texto obrigatório ausente: ${text}`);
});

const forbiddenClaims = [
  "garantir liberdade",
  "resultado garantido",
  "ganhar processo",
  "aprovação certa",
  "resolver seu caso"
];

forbiddenClaims.forEach((claim) => {
  expect(!html.toLowerCase().includes(claim), `Promessa jurídica proibida encontrada: ${claim}`);
});

const whatsappLinks = [...html.matchAll(/<a\s+[^>]*href="(https:\/\/wa\.me\/5567992044544[^"]*)"[^>]*>/gi)];
expect(whatsappLinks.length >= 8, `Esperado pelo menos 8 links de WhatsApp, encontrados ${whatsappLinks.length}.`);
expect(!html.includes("556792044544"), "Número antigo de WhatsApp ainda encontrado.");
expect(html.includes("+5567992044544"), "Telefone do schema não está padronizado com 9 dígitos.");
expect(html.includes("(67) 99204-4544"), "Texto com telefone padronizado ausente.");
expect(!html.includes("CTA:"), 'Texto interno "CTA:" não deve aparecer no HTML público.');

whatsappLinks.forEach(([tag], index) => {
  expect(tag.includes('target="_blank"'), `Link WhatsApp ${index + 1} sem target="_blank".`);
  expect(tag.includes('rel="noopener noreferrer"'), `Link WhatsApp ${index + 1} sem rel seguro.`);
});

expect(html.includes('https://www.instagram.com/mayaneferreira.adv'), "Link do Instagram ausente.");
expect(!html.includes("Atendimento avaliado em 5 estrelas"), "Depoimento/avaliação falsa ainda presente.");
expect(!html.includes("Cliente atendido"), "Depoimentos genéricos ainda presentes.");
expect(html.includes('"@type": "LegalService"'), "Schema LegalService ausente.");
expect(html.includes('twitter:card" content="summary_large_image"'), "Twitter Card ausente.");
expect(html.includes('https://dra-mayane-ferreira.vercel.app/'), "Canonical/OG URL final da Vercel ausente.");
expect(html.includes('https://dra-mayane-ferreira.vercel.app/assets/og-mayane.jpg'), "OG/Twitter image deve usar URL absoluta.");
expect(html.includes('rel="icon" href="assets/favicon.svg"'), "Favicon ausente.");
expect(html.includes("aria-expanded"), "Atributos de acessibilidade do FAQ/menu ausentes.");
expect(css.includes("@media (max-width: 760px)"), "CSS mobile principal ausente.");
expect(!css.includes("100vw"), "CSS contém 100vw, risco de overflow horizontal.");
expect(html.includes("template-section"), "Estrutura visual fiel ao template ausente.");
expect(!html.includes("seo-content"), "Bloco SEO escondido legado ainda presente.");
expect((html.match(/class="semantic-layer"/g) || []).length >= 8, "Camadas semânticas por seção ausentes.");
expect(css.includes(".semantic-layer") && css.includes("clip-path: inset(50%)"), "Camada semântica precisa estar escondida visualmente.");
expect(css.includes(".motion-ready") && js.includes("IntersectionObserver"), "Animações premium de reveal ausentes.");
expect((html.match(/\.webp"/g) || []).length >= 8, "Imagens principais não foram trocadas por WebP.");
expect(js.includes("faqAnswers"), "Controle do FAQ ausente.");

if (failures.length) {
  console.error("Validação do site falhou:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Validação do site concluída com sucesso.");

