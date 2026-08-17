"use client";

import { useLang } from "@/context/LanguageContext";

const articles = [
  {
    slug: "cholesterol",
    cs: { title: "Pravda o cholesterolu", desc: "Vaše tělo si vyrábí 80 % vlastního cholesterolu. Proč jsme byli 40 let přesvědčováni, že problémem je cholesterol v potravě?" },
    en: { title: "The Truth About Cholesterol", desc: "Your body produces 80% of its own cholesterol. Why were we convinced for 40 years that dietary cholesterol was the problem?" },
  },
  {
    slug: "insulin-blood-pressure",
    cs: { title: "Inzulinová rezistence a krevní tlak", desc: "Metabolické problémy jako vysoký krevní tlak mají často společného jmenovatele: tělo špatně reaguje na inzulin." },
    en: { title: "Insulin Resistance & Blood Pressure", desc: "Metabolic issues like high blood pressure often share a common denominator: the body's poor response to insulin." },
  },
  {
    slug: "salt-myths",
    cs: { title: "Sůl, krevní tlak a srdce", desc: "Velké vědecké studie ukázaly, že omezování soli má na krevní tlak jen malý účinek." },
    en: { title: "Salt, Blood Pressure & Heart", desc: "Large scientific studies have shown that restricting salt has only a small effect on blood pressure." },
  },
  {
    slug: "hidden-tests",
    cs: { title: "Skryté metabolické testy", desc: "Existuje celý metabolický příběh, který vám běžné laboratorní testy neodhalí. Hladina inzulinu nalačno je klíčový ukazatel." },
    en: { title: "Hidden Metabolic Tests", desc: "There's a whole metabolic story that standard lab tests don't reveal. Fasting insulin is a key marker." },
  },
  {
    slug: "small-meals-myth",
    cs: { title: "Proč není ideální jíst 4–5× denně", desc: "Časté jídlo udržuje inzulin neustále zvýšený. Hlavním faktorem přibírání je chronicky zvýšený inzulin." },
    en: { title: "Why 4–5 Small Meals a Day Isn't Ideal", desc: "Frequent eating keeps insulin constantly elevated. Chronically high insulin is the main driver of weight gain." },
  },
  {
    slug: "calories-myth",
    cs: { title: "Proč kalorie přijaté vs. vydané nefungují", desc: "Tělo se přizpůsobí nižším kaloriím a hormony rozhodují o ukládání tuku." },
    en: { title: "Why Calories In vs Out Doesn't Work", desc: "The body adapts to lower calories and hormones determine fat storage." },
  },
  {
    slug: "low-carb-arthritis",
    cs: { title: "Nízkosacharidová strava a artritida", desc: "Přínosy nízkosacharidové stravy pro post-traumatickou artritidu a osteoartrózu." },
    en: { title: "Low-Carb Diet & Arthritis", desc: "Benefits of a low-carb diet for post-traumatic arthritis and osteoarthritis." },
  },
  {
    slug: "carbs-part-one",
    cs: { title: "Proč přemýšlet o sacharidech — část první", desc: "Proč přemýšlet o výši sacharidů v naší stravě a jak ovlivňují naše zdraví." },
    en: { title: "Why Rethink Carbs — Part One", desc: "Why to reconsider the amount of carbohydrates in our diet and how they affect our health." },
  },
  {
    slug: "muscles-metabolism",
    cs: { title: "Proč jsou svaly důležité pro metabolické zdraví", desc: "Svaly představují hlavní metabolický zásobník. Až 80 % glukózy z jídla je využito svaly." },
    en: { title: "Why Muscles Matter for Metabolic Health", desc: "Muscles are the body's main metabolic reservoir. Up to 80% of glucose from food is used by muscles." },
  },
  {
    slug: "visceral-fat",
    cs: { title: "Viscerální tuk — skrytý nepřítel", desc: "Tuk, který nedokážete sevřít mezi prsty, může být ten, kterého byste se měli bát." },
    en: { title: "Visceral Fat — The Hidden Enemy", desc: "The fat you can't pinch between your fingers might be the one you should fear most." },
  },
  {
    slug: "body-fat-types",
    cs: { title: "Typy tělesného tuku", desc: "Podkožní vs. viscerální tuk — jak fungují, proč na tom záleží a jak ovlivňují vaše zdraví." },
    en: { title: "Types of Body Fat", desc: "Subcutaneous vs. visceral fat — how they work, why it matters and how they affect your health." },
  },
  {
    slug: "ldl-cholesterol",
    cs: { title: "LDL cholesterol — kyslík pro oheň", desc: "LDL cholesterol je pro cévní onemocnění to, co kyslík pro oheň. Nezbytný, ale sám o sobě nestačí." },
    en: { title: "LDL Cholesterol — Oxygen for Fire", desc: "LDL cholesterol is to heart disease what oxygen is to fire. Necessary, but not sufficient on its own." },
  },
  {
    slug: "insulin-resistance-whole-body",
    cs: { title: "Inzulinová rezistence — problém celého těla", desc: "Inzulinová rezistence není jen o diabetu. Ovlivňuje hormony, mozek, štítnou žlázu a celý organismus." },
    en: { title: "Insulin Resistance — A Whole-Body Problem", desc: "Insulin resistance isn't just about diabetes. It affects hormones, brain, thyroid and the entire body." },
  },
  {
    slug: "metabolic-flexibility",
    cs: { title: "Metabolická flexibilita", desc: "Schopnost těla efektivně přepínat mezi spalováním sacharidů a tuků je klíčem k dlouhodobému zdraví." },
    en: { title: "Metabolic Flexibility", desc: "The body's ability to efficiently switch between burning carbs and fats is key to long-term health." },
  },
  {
    slug: "alcohol-fructose",
    cs: { title: "Co mají alkohol a fruktóza společného", desc: "Metabolické účinky alkoholu a fruktózy v játrech jsou překvapivě podobné." },
    en: { title: "What Alcohol and Fructose Have in Common", desc: "The metabolic effects of alcohol and fructose in the liver are surprisingly similar." },
  },
  {
    slug: "blood-sugar-low-carb",
    cs: { title: "Zvýšená glykémie na začátku low-carb stravy", desc: "Proč může být hladina krevního cukru nalačno dočasně zvýšená při přechodu na nízkosacharidovou stravu." },
    en: { title: "High Fasting Blood Sugar on Low-Carb", desc: "Why fasting blood sugar may be temporarily elevated when transitioning to a low-carb diet." },
  },
  {
    slug: "3-month-results",
    cs: { title: "Výsledky za 3 měsíce", desc: "Pokles hmotnosti o 3,5 kg, redukce tuku o 4,3 % — 94 % úbytku tvořil tělesný tuk." },
    en: { title: "3-Month Results", desc: "3.5 kg weight loss, 4.3% fat reduction — 94% of total weight lost was body fat." },
  },
  {
    slug: "cholesterol-statins",
    cs: { title: "Cholesterol a statiny — hledejte příčinu", desc: "Vysoký cholesterol není jen o stravě. Skutečnou příčinou je často inzulinová rezistence." },
    en: { title: "Cholesterol & Statins — Find the Cause", desc: "High cholesterol isn't just about diet. The real cause is often insulin resistance." },
  },
];

export default function StudiesIndex() {
  const { lang, t } = useLang();

  return (
    <div className="dashboard">
      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-welcome">
            <h1>{t("Studijní materiály", "Study Materials")}</h1>
            <p>{t(
              "Vzdělávací články o metabolickém zdraví, výživě a vědecky podložených přístupech ke zdraví.",
              "Educational articles on metabolic health, nutrition and evidence-based approaches to wellbeing."
            )}</p>
          </div>
          <div className="studies-grid">
            {articles.map((a) => {
              const data = lang === "cs" ? a.cs : a.en;
              return (
                <a href={`/dashboard/courses/${a.slug}`} className="study-card" key={a.slug}>
                  <h3>{data.title}</h3>
                  <p>{data.desc}</p>
                  <span className="study-card-link">{t("Číst článek \u2192", "Read article \u2192")}</span>
                </a>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
