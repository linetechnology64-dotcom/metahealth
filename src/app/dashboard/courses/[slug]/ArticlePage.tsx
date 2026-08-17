"use client";

import { useLang } from "@/context/LanguageContext";

const articles: Record<string, { cs: { title: string; content: string }; en: { title: string; content: string } }> = {
  cholesterol: {
    cs: {
      title: "Pravda o cholesterolu",
      content: `Vaše tělo si vyrábí 80 % vlastního cholesterolu. Můžete přestat jíst vajíčka úplně a vaše hodnoty se téměř nezmění.

Tak proč jsme byli 40 let přesvědčováni, že problémem je cholesterol v potravě?

V roce 1984 vyhlásily časopisy po celém světě válku potravinovému cholesterolu. To ovlivnilo, jak celá generace začala snídat. Vědecké důkazy toto nikdy nepotvrdily.

Většinu cholesterolu v krvi vyrábí vaše játra. Když sníte více cholesterolu, játra obvykle začnou produkovat méně. Systém se tak sám vyrovnává.

Co tedy skutečně způsobuje vysoký cholesterol? Inzulinová rezistence. A většina lidí nikdy neslyšela, jak spolu tyto věci souvisejí.

Když buňky přestávají reagovat na inzulin, spouští se řetězec problémů: játra začnou nadměrně vyrábět triglyceridů a LDL částice se stávají menšími a hustšími — právě ty, které jsou skutečně nebezpečné.`,
    },
    en: {
      title: "The Truth About Cholesterol",
      content: `Your body produces 80% of its own cholesterol. You could stop eating eggs entirely and your levels would barely change.

So why were we told for 40 years that dietary cholesterol was the problem?

In 1984, magazines around the world declared war on dietary cholesterol. This changed how an entire generation ate breakfast. The scientific evidence never actually supported this.

Most of the cholesterol in your blood is produced by your liver. When you eat more cholesterol, your liver typically produces less. The system balances itself.

So what actually causes high cholesterol? Insulin resistance. And most people have never heard how these things are connected.

When cells stop responding to insulin, a chain of problems begins: the liver starts overproducing triglycerides and LDL particles become smaller and denser — exactly the ones that are truly dangerous.`,
    },
  },
  "insulin-blood-pressure": {
    cs: {
      title: "Inzulinová rezistence — příčina vysokého krevního tlaku",
      content: `Metabolické problémy, jako je vysoký krevní tlak, mají často společného jmenovatele: tělo špatně reaguje na inzulin (inzulinová rezistence).

Když je v těle příliš inzulinu, ledviny zadržují více soli, a tím stoupá krevní tlak.

Inzulinová rezistence také aktivuje stresový systém v těle, který tlak dále zvyšuje.

Vysoký tlak je součástí takzvaného metabolického syndromu, tedy souboru problémů spojených s narušeným zpracováním cukru.

Když se zlepší citlivost těla na inzulin, krevní tlak často klesá.`,
    },
    en: {
      title: "Insulin Resistance — The Cause of High Blood Pressure",
      content: `Metabolic problems like high blood pressure often share a common denominator: the body responds poorly to insulin (insulin resistance).

When there is too much insulin in the body, the kidneys retain more salt, which raises blood pressure.

Insulin resistance also activates the body's stress system, further increasing pressure.

High blood pressure is part of the so-called metabolic syndrome — a set of problems linked to impaired sugar processing.

When the body's insulin sensitivity improves, blood pressure often drops.`,
    },
  },
  "salt-myths": {
    cs: {
      title: "Sůl, krevní tlak a srdce",
      content: `Velké vědecké studie ukázaly, že omezování soli má na krevní tlak jen malý účinek — i velké snížení soli snížilo tlak jen nepatrně.

V mnoha zdravých národech lidé jedí více soli, než se obecně doporučuje, a přesto mají nízký výskyt srdečních onemocnění.

Problém není v soli samotné, ale v metabolickém kontextu. Když je tělo v inzulinové rezistenci, ledviny zpracovávají sůl jinak.

Řešením není omezovat sůl, ale řešit základní metabolický problém.`,
    },
    en: {
      title: "Salt, Blood Pressure & Heart",
      content: `Large scientific studies have shown that restricting salt has only a small effect on blood pressure — even significant salt reduction lowered pressure only marginally.

In many healthy nations, people eat more salt than generally recommended yet have low rates of heart disease.

The problem isn't salt itself, but the metabolic context. When the body is insulin resistant, the kidneys process salt differently.

The solution isn't to restrict salt, but to address the underlying metabolic problem.`,
    },
  },
  "hidden-tests": {
    cs: {
      title: "Skryté metabolické testy",
      content: `Vaše každoroční preventivní prohlídka pravděpodobně zahrnuje kontrolu cholesterolu, hladiny cukru v krvi a možná i funkci štítné žlázy. Lékař vám řekne, že je vše v normě. Odcházíte s dobrým pocitem.

Ale existuje celý metabolický příběh, který vám běžné laboratorní testy neodhalí.

Hladina inzulinu nalačno je jedním z nejvýznamnějších ukazatelů v preventivní medicíně, a přesto většina standardních panelů tento test neobsahuje.

Vaše hladina glukózy nalačno může vypadat naprosto normálně, zatímco inzulin pracuje na plné obrátky, aby ji udržel v normě. Ve chvíli, kdy začne glukóza stoupat, se inzulinová rezistence často rozvíjí už celé roky.

To je důležité, protože inzulinová rezistence stojí na počátku téměř všech chronických onemocnění: srdečních chorob, diabetu, Alzheimerovy choroby a dalších.`,
    },
    en: {
      title: "Hidden Metabolic Tests",
      content: `Your annual check-up probably includes cholesterol, blood sugar, and maybe thyroid function. Your doctor tells you everything is normal. You leave feeling reassured.

But there's an entire metabolic story that standard lab tests don't reveal.

Fasting insulin is one of the most important markers in preventive medicine, yet most standard panels don't include this test.

Your fasting glucose may look perfectly normal while insulin is working overtime to keep it that way. By the time glucose starts rising, insulin resistance has often been developing for years.

This matters because insulin resistance is at the root of nearly every chronic disease: heart disease, diabetes, Alzheimer's and more.`,
    },
  },
  "small-meals-myth": {
    cs: {
      title: "Proč není ideální jíst malé porce 4–5× denně",
      content: `1. Časté jídlo udržuje inzulin neustále zvýšený

Hlavním faktorem přibírání na váze je chronicky zvýšený inzulin, nikoli celkový příjem kalorií. Každé jídlo — i malé — zvyšuje hladinu inzulinu.

Časté jedení znamená, že inzulin nemá čas klesnout na základní úroveň, což blokuje spalování tuků. Snížení frekvence jídla umožňuje pokles inzulinu a zahájení spalování tuků.

I „zdravé svačiny" způsobují vzestupy inzulinu. Tělo potřebuje období bez jídla, aby mohlo resetovat hormonální dráhy.

2. Časté stravování zhoršuje inzulinovou rezistenci

Nepřetržitá stimulace inzulinem vede k tomu, že buňky na něj přestávají reagovat. To je začátek metabolického syndromu.`,
    },
    en: {
      title: "Why Eating 4–5 Small Meals a Day Isn't Ideal",
      content: `1. Frequent eating keeps insulin constantly elevated

The main factor in weight gain is chronically elevated insulin, not total calorie intake. Every meal — even a small one — raises insulin levels.

Frequent eating means insulin never has time to drop to baseline, which blocks fat burning. Reducing meal frequency allows insulin to drop and fat burning to begin.

Even "healthy snacks" cause insulin spikes. The body needs food-free periods to reset hormonal pathways.

2. Frequent eating worsens insulin resistance

Continuous insulin stimulation causes cells to stop responding to it. This is the beginning of metabolic syndrome.`,
    },
  },
  "calories-myth": {
    cs: {
      title: "Proč kalorie přijaté vs. vydané nefungují",
      content: `1. Tělo se přizpůsobí nižším kaloriím
Když jíte méně, tělo začne šetřit energii a zpomalí metabolismus. Spalujete pak méně kalorií, takže hubnutí se zastaví nebo se obrátí.

2. Hormony rozhodují o ukládání tuku
Inzulin určuje, zda tělo kalorie spálí nebo uloží. Časté jídlo a sladké/rafinované potraviny zvyšují inzulin a podporují ukládání tuku. Pokud hormony tlačí tělo k ukládání tuku, samotné snižování kalorií nepomůže.

3. Kalorický model ignoruje hladové signály
Často nejíme kvůli energii, ale kvůli zvyku, stresu nebo podnětům kolem nás. Není to o vůli — je to o biologii a prostředí. Diety selhávají, když neřeší skutečný důvod, proč máme hlad nebo chuť jíst.`,
    },
    en: {
      title: "Why Calories In vs Out Doesn't Work",
      content: `1. The body adapts to lower calories
When you eat less, the body conserves energy and slows metabolism. You then burn fewer calories, so weight loss stalls or reverses.

2. Hormones determine fat storage
Insulin determines whether the body burns or stores calories. Frequent eating and sugary/refined foods raise insulin and promote fat storage. If hormones push the body to store fat, simply reducing calories won't help.

3. The calorie model ignores hunger signals
We often eat not for energy, but out of habit, stress, or environmental cues. It's not about willpower — it's about biology and environment. Diets fail when they don't address the real reason we're hungry or craving food.`,
    },
  },
  "low-carb-arthritis": {
    cs: {
      title: "Nízkosacharidová strava a artritida",
      content: `Přínosy nízkosacharidové stravy pro post-traumatickou artritidu a osteoartrózu:

1. Inhibuje inflammasom NLRP3 — klíčový při zánětu u osteoartrózy
Velká studie o osteoartróze ukazuje, že nízkosacharidová strava snižuje aktivitu NLRP3, IL-1β, IL-18 a enzymy rozkládající chrupavku. To je důležité, protože inflammasom NLRP3 je významným faktorem i u post-traumatického zánětu kloubů.

2. Snižuje hlavní zánětlivé cytokiny
Protože bolest u post-traumatické artritidy často souvisí s těmito cytokiny, nízkosacharidová strava může pomoci snížit zánět a bolest.`,
    },
    en: {
      title: "Low-Carb Diet & Arthritis",
      content: `Benefits of a low-carb diet for post-traumatic arthritis and osteoarthritis:

1. Inhibits the NLRP3 inflammasome — key in osteoarthritis inflammation
A major study on osteoarthritis shows that a low-carb diet reduces the activity of NLRP3, IL-1β, IL-18 and cartilage-degrading enzymes. This is important because the NLRP3 inflammasome is a significant factor in post-traumatic joint inflammation.

2. Reduces major inflammatory cytokines
Since pain in post-traumatic arthritis is often related to these cytokines, a low-carb diet can help reduce inflammation and pain.`,
    },
  },
  "carbs-part-one": {
    cs: {
      title: "Proč přemýšlet o sacharidech — část první",
      content: `Rozhodla jsem se sdílet své zkušenosti a vědomosti o metabolické vědě, fyziologii těla, stravování a potravinách. Doufám, že toto někoho obohatí.

Dnešní téma: Post-traumatická artritida & osteoartróza

Nízkosacharidová strava může pomoci snížit zánět, bolest kloubů a zpomalit degradaci chrupavky. Vědecké důkazy ukazují na spojitost mezi vysokým příjmem sacharidů, inzulinovou rezistencí a chronickým zánětem.

Když snížíte příjem sacharidů, tělo přejde na spalování tuků a produkci ketolátek, které mají protizánětlivé účinky.`,
    },
    en: {
      title: "Why Rethink Carbs — Part One",
      content: `I decided to share my experiences and knowledge about metabolic science, body physiology, nutrition and food. I hope this will enrich someone.

Today's topic: Post-traumatic arthritis & osteoarthritis

A low-carb diet can help reduce inflammation, joint pain and slow cartilage degradation. Scientific evidence points to a connection between high carbohydrate intake, insulin resistance and chronic inflammation.

When you reduce carbohydrate intake, the body switches to burning fat and producing ketone bodies, which have anti-inflammatory effects.`,
    },
  },
  "muscles-metabolism": {
    cs: {
      title: "Proč jsou svaly důležité pro metabolické zdraví",
      content: `Svaly představují hlavní metabolický zásobník a fungují jako obrovská houba na glukózu v krvi. Budováním a udržováním svalové hmoty rozšiřujete svou metabolickou kapacitu.

Zpracování glukózy: Až 80 % glukózy přijaté z jídla je využito svaly. Čím více svalové hmoty máte, tím větší je schopnost vašeho těla tuto energii ukládat a spalovat.

Spotřeba energie: Svalová tkáň neustále spotřebovává energii, a to i v klidovém stavu.

Prevence anabolické rezistence: Pokud svaly pravidelně nepoužíváte, postupně ztrácejí schopnost správně reagovat na podněty. To může urychlovat rozvoj inzulinové rezistence.

Celkové zdraví organismu: Při stahu svalů se uvolňují prospěšné látky (myokiny) s protizánětlivými účinky, které podporují zdraví téměř všech orgánových systémů.

Vše, co potřebujete: správně nastavená výživa, pravidelná chůze a 30 minut silového tréninku 5× týdně. A to všechno bez pocitu hladu. Konzistence vždy porazí extrémy.`,
    },
    en: {
      title: "Why Muscles Matter for Metabolic Health",
      content: `Muscles are the body's main metabolic reservoir, functioning as a massive sponge for blood glucose. By building and maintaining muscle mass, you expand your metabolic capacity.

Glucose processing: Up to 80% of glucose from food is used by muscles. The more muscle mass you have, the greater your body's ability to store and burn this energy.

Energy consumption: Muscle tissue constantly consumes energy, even at rest.

Prevention of anabolic resistance: If you don't regularly use your muscles, they gradually lose the ability to respond to stimuli properly. This can accelerate insulin resistance.

Overall health: When muscles contract, they release beneficial substances (myokines) with anti-inflammatory effects that support the health of nearly all organ systems.

All you need: properly set nutrition, regular walking and 30 minutes of strength training 5× per week. All without feeling hungry. Consistency always beats extremes.`,
    },
  },
  "visceral-fat": {
    cs: {
      title: "Viscerální tuk — skrytý nepřítel",
      content: `Tuk, který nedokážete sevřít mezi prsty, může být ten, kterého byste se měli bát. Viscerální tuk se skrývá hluboko v břiše, obalený kolem orgánů — a na rozdíl od podkožního tuku ovlivňuje přímo játra.

Podporuje inzulinovou rezistenci. Zvětšené buňky viscerálního tuku přestávají reagovat na inzulin, takže tuk vniká do krevního oběhu — a ukládá se tam, kam nepatří.

Velké tukové buňky jsou vystresované buňky. Když přerostou svoje krevní zásobení, začnou trpět nedostatkem kyslíku a zanítí se.

Hormony hrají roli. Muži častěji ukládají tuk v oblasti břicha a viscerální tuk často přibývá po menopauze.

Dobrá zpráva: viscerální tuk velmi dobře reaguje na cvičení. Silně reaguje na adrenalin, takže pohyb ho dokáže zmenšit — i když se číslo na váze skoro nehne.

Přestaňte se upínat na váhu. Zaměřte se na to, jak vaše tělo ukládá tuk a jak dobře funguje váš inzulin.`,
    },
    en: {
      title: "Visceral Fat — The Hidden Enemy",
      content: `The fat you can't pinch between your fingers might be the one you should fear most. Visceral fat hides deep in the abdomen, wrapped around organs — and unlike subcutaneous fat, it directly affects the liver.

It promotes insulin resistance. Enlarged visceral fat cells stop responding to insulin, so fat enters the bloodstream and deposits where it doesn't belong.

Large fat cells are stressed cells. When they outgrow their blood supply, they start suffering from oxygen deprivation and become inflamed.

Hormones play a role. Men more often store fat in the abdominal area, and visceral fat often increases after menopause.

Good news: visceral fat responds very well to exercise. It strongly reacts to adrenaline, so movement can shrink it — even if the number on the scale barely moves.

Stop fixating on weight. Focus on how your body stores fat and how well your insulin works.`,
    },
  },
  "body-fat-types": {
    cs: {
      title: "Typy tělesného tuku",
      content: `Podkožní tuk je měkký tuk uložený přímo pod kůží — ten, který můžete uchopit mezi prsty. Zvětšuje se hlavně tvorbou nových tukových buněk (hyperplazie), což umožňuje bezpečnější ukládání tuku. Funguje jako metabolický „pufr" a chrání orgány.

Viscerální tuk je uložen hluboko v břišní dutině a obklopuje orgány jako játra, slinivka a střeva. Je vysoce metabolicky aktivní — produkuje zánětlivé chemické látky a hormony, které narušují signalizaci inzulinu.

Viscerální tuk odvádí své produkty do portální žíly, čímž dopravuje zánětlivé látky přímo do jater. Výsledkem je začarovaný kruh: vysoký inzulin → více viscerálního tuku → vyšší zánět → větší inzulinová rezistence → ještě vyšší inzulin.

Chronický stres zvyšuje hladinu kortizolu, který podporuje ukládání tuku právě v oblasti viscerálního prostoru.`,
    },
    en: {
      title: "Types of Body Fat",
      content: `Subcutaneous fat is soft fat stored just under the skin — the kind you can pinch between your fingers. It grows mainly by creating new fat cells (hyperplasia), which allows for safer fat storage. It acts as a metabolic "buffer" protecting organs.

Visceral fat is stored deep in the abdominal cavity surrounding organs like the liver, pancreas and intestines. It's highly metabolically active — producing inflammatory chemicals and hormones that disrupt insulin signalling.

Visceral fat sends its products into the portal vein, delivering inflammatory substances directly to the liver. The result is a vicious cycle: high insulin → more visceral fat → more inflammation → greater insulin resistance → even higher insulin.

Chronic stress raises cortisol levels, which promotes fat storage specifically in the visceral area.`,
    },
  },
  "ldl-cholesterol": {
    cs: {
      title: "LDL cholesterol — kyslík pro oheň",
      content: `LDL cholesterol je pro srdeční nebo cévní onemocnění to, co je kyslík pro oheň. Nemůžete mít onemocnění cév bez LDL cholesterolu. Nemůžete mít oheň bez kyslíku. Ale kyslík sám o sobě požár nezpůsobí.

Aby vznikl oheň, potřebujete tři věci: jiskru, kyslík a něco, co může hořet. Aby vzniklo srdeční onemocnění, potřebujete LDL cholesterol, zánět, imunitní reakci — a inzulinová rezistence v podstatě zažehne jiskru.

Lidé se na internetu snaží říkat, že LDL cholesterol neznamená nic. To ale není pravda — znamená něco, ale neznamená všechno. Na lidském těle není nic, co by bylo jednoduché nebo lineární. Je to propojená síť fyziologických procesů.`,
    },
    en: {
      title: "LDL Cholesterol — Oxygen for Fire",
      content: `LDL cholesterol is to heart disease what oxygen is to fire. You can't have vascular disease without LDL cholesterol. You can't have fire without oxygen. But oxygen alone doesn't cause a fire.

To start a fire, you need three things: a spark, oxygen, and something that can burn. To develop heart disease, you need LDL cholesterol, inflammation, an immune response — and insulin resistance essentially strikes the spark.

People on the internet try to say that LDL cholesterol means nothing. That's not true — it means something, but it doesn't mean everything. Nothing in the human body is simple or linear. It's an interconnected network of physiological processes.`,
    },
  },
  "insulin-resistance-whole-body": {
    cs: {
      title: "Inzulinová rezistence — problém celého těla",
      content: `Inzulin je hormon, který řídí nejen hladinu cukru v krvi, ale i spoustu dalších procesů v těle. Když na něj buňky přestanou správně reagovat, nejde jen o cukr — je to problém komunikace v celém těle.

Ukládání tuku: Když je inzulin dlouhodobě vysoký, tělo ukládá tuk a zároveň brání jeho spalování.

Zánět: Inzulinová rezistence a chronický zánět se navzájem zhoršují a vytváří začarovaný kruh.

Hormony u žen (PCOS): Vysoký inzulin zvyšuje mužské hormony, což narušuje ovulaci.

Mozek: Inzulin je důležitý pro paměť, soustředění a funkci nervů. Jeho porucha může způsobit „mozkovou mlhu" a souvisí s Alzheimerovou chorobou.

Štítná žláza: Inzulinová rezistence a poruchy štítné žlázy se navzájem zhoršují.

Pohlavní hormony: Estrogen chrání citlivost na inzulin — proto se po menopauze často zhoršuje metabolismus.

Tělo to dokáže dlouho maskovat. Slinivka vyrábí víc inzulinu, takže cukr v krvi vypadá normálně. Diagnóza přijde až pozdě.`,
    },
    en: {
      title: "Insulin Resistance — A Whole-Body Problem",
      content: `Insulin is a hormone that controls not just blood sugar, but many other processes in the body. When cells stop responding to it properly, it's not just about sugar — it's a communication problem throughout the entire body.

Fat storage: When insulin is chronically high, the body stores fat while preventing its burning.

Inflammation: Insulin resistance and chronic inflammation worsen each other in a vicious cycle.

Women's hormones (PCOS): High insulin raises male hormones, disrupting ovulation.

Brain: Insulin is important for memory, concentration and nerve function. Its dysfunction can cause "brain fog" and is linked to Alzheimer's disease.

Thyroid: Insulin resistance and thyroid disorders worsen each other.

Sex hormones: Estrogen protects insulin sensitivity — which is why metabolism often worsens after menopause.

The body can mask this for a long time. The pancreas produces more insulin, so blood sugar looks normal. Diagnosis comes too late.`,
    },
  },
  "metabolic-flexibility": {
    cs: {
      title: "Metabolická flexibilita",
      content: `Metabolická flexibilita je schopnost těla efektivně přepínat mezi spalováním sacharidů a tuků podle jejich dostupnosti. Umožňuje optimální využití energie a lepší citlivost na inzulin.

Udržitelné řízení hmotnosti: Když tělo přepne mezi jídly na spalování tuků, vyhnete se extrémnímu hladu.

Stabilní energie a mentální jasnost: Mozek má konstantní zásobu energie buď z glukózy nebo z ketonů — žádná mozková mlha.

Prevence chronických onemocnění: Chrání před inzulinovou rezistencí, pomáhá udržovat zdravý cholesterol.

Dlouhověkost: Fáze spalování tuků aktivují autofagii — proces, při kterém buňky opravují samy sebe.

Známky narušeného metabolismu: neschopnost přepnout na spalování tuků, časté chutě a hlad, energetické výpadky, snadnější přibírání.`,
    },
    en: {
      title: "Metabolic Flexibility",
      content: `Metabolic flexibility is the body's ability to efficiently switch between burning carbs and fats based on their availability. It enables optimal energy use and better insulin sensitivity.

Sustainable weight management: When the body switches to fat burning between meals, you avoid extreme hunger.

Stable energy and mental clarity: The brain has a constant energy supply from either glucose or ketones — no brain fog.

Chronic disease prevention: Protects against insulin resistance, helps maintain healthy cholesterol.

Longevity: Fat-burning phases activate autophagy — a process where cells repair themselves.

Signs of impaired metabolism: inability to switch to fat burning, frequent cravings and hunger, energy crashes, easy weight gain.`,
    },
  },
  "alcohol-fructose": {
    cs: {
      title: "Co mají alkohol a fruktóza společného",
      content: `Alkohol a fruktóza se primárně metabolizují v játrech. Na rozdíl od glukózy obcházejí většinu tkání a míří přímo do jater. Fruktózu můžeme nazvat „alkohol bez opojení".

Obě látky podporují ukládání tuku v játrech (de novo lipogeneze). To může vést ke zvýšeným triglyceridům, viscerálnímu tuku a nealkoholovému ztučnění jater.

Obě látky mohou způsobit inzulinovou rezistenci a aktivují dopaminové odměňovací dráhy — mohou být návykové a podporovat přejídání.

Ani jedna z látek neobsahuje esenciální živiny — jsou to prázdné kalorie.

Fruktóza se nachází v: ovoci, stolním cukru (50 % fruktózy), kukuřičném sirupu, medu, agávovém sirupu, limonádách, cereáliích, sladkostech, kečupu, sušeném ovoci a ovocných šťávách.`,
    },
    en: {
      title: "What Alcohol and Fructose Have in Common",
      content: `Both alcohol and fructose are primarily metabolised in the liver. Unlike glucose, they bypass most tissues and head straight to the liver. Fructose can be called "alcohol without the buzz."

Both promote fat storage in the liver (de novo lipogenesis). This can lead to elevated triglycerides, visceral fat and non-alcoholic fatty liver disease.

Both can cause insulin resistance and activate dopamine reward pathways — they can be addictive and promote overeating.

Neither contains essential nutrients — they are empty calories.

Fructose is found in: fruit, table sugar (50% fructose), corn syrup, honey, agave syrup, soft drinks, cereals, sweets, ketchup, dried fruit and fruit juices.`,
    },
  },
  "blood-sugar-low-carb": {
    cs: {
      title: "Zvýšená glykémie na začátku low-carb stravy",
      content: `Na začátku nízkosacharidové stravy může dojít k dočasnému zvýšení glykémie nalačno. Důvodů je několik:

Fyziologická inzulinová rezistence: Svaly se dočasně přepnou na spalování tuků a snižují citlivost na inzulin, aby glukóza zůstala dostupná pro mozek.

Glukoneogeneze: Při nízkém příjmu sacharidů začnou játra vyrábět glukózu z bílkovin nebo glycerolu z tuků.

Hormonální adaptace: Přechod na low-carb představuje pro tělo formu stresu. Stresové hormony mohou stimulovat játra k uvolnění glukózy.

Dehydratace: Na začátku odchází z těla více vody spolu s glykogenem, krev může být koncentrovanější.

Toto zvýšení bývá obvykle mírné a dočasné. Pokud přetrvává, je vhodné konzultovat s lékařem.`,
    },
    en: {
      title: "High Fasting Blood Sugar on Low-Carb",
      content: `At the beginning of a low-carb diet, fasting blood sugar may temporarily increase. There are several reasons:

Physiological insulin resistance: Muscles temporarily switch to burning fat and reduce insulin sensitivity so glucose remains available for the brain.

Gluconeogenesis: With low carb intake, the liver starts producing glucose from proteins or glycerol from fats.

Hormonal adaptation: Transitioning to low-carb is a form of stress for the body. Stress hormones can stimulate the liver to release glucose.

Dehydration: Initially, more water leaves the body along with glycogen, making blood more concentrated.

This increase is usually mild and temporary. If it persists, consult your doctor.`,
    },
  },
  "3-month-results": {
    cs: {
      title: "Výsledky za 3 měsíce",
      content: `Čeho lze dosáhnout za 3 měsíce při správně nastavené výživě, pravidelném pohybu a silovém tréninku:

Pravidelný pohyb: přibližně 10 000 kroků denně. Silový trénink: 5× týdně po 30 minutách. Důraz na konzistenci.

Výsledky: Pokles tělesné hmotnosti o 3,5 kg. Zachování svalové hmoty — úbytek pouze 0,2 kg (méně než 1 %). Redukce tělesného tuku o 4,3 %. 94 % celkového úbytku hmotnosti tvořil tělesný tuk.

Velmi kvalitní redukce tělesného tuku při excelentním zachování svalové hmoty. Tento výsledek potvrzuje, že správně nastavená výživa v kombinaci s pravidelným silovým tréninkem vede nejen ke snížení hmotnosti, ale především ke zlepšení tělesného složení.`,
    },
    en: {
      title: "3-Month Results",
      content: `What can be achieved in 3 months with properly set nutrition, regular movement and strength training:

Regular movement: approximately 10,000 steps per day. Strength training: 5× per week for 30 minutes. Focus on consistency.

Results: Body weight decrease of 3.5 kg. Muscle mass preserved — loss of only 0.2 kg (less than 1%). Body fat reduction of 4.3%. 94% of total weight lost was body fat.

Very high-quality body fat reduction with excellent muscle mass preservation. This result confirms that properly set nutrition combined with regular strength training leads not only to weight loss, but primarily to improved body composition.`,
    },
  },
  "cholesterol-statins": {
    cs: {
      title: "Cholesterol a statiny — hledejte příčinu",
      content: `V řadě případů platí, že pokud je zjištěna zvýšená hladina cholesterolu, lékař doporučí nízkotučnou dietu a předepíše statiny. Zpravidla se však nezjišťuje příčina.

Doporučení nízkotučných produktů může situaci dále zhoršit — tyto výrobky bývají pro zachování chuti obohaceny o vyšší obsah sacharidů.

Je-li hladina inzulinu dlouhodobě zvýšená, mohou játra začít ukládat větší množství tuku a ve zvýšené míře produkovat triglyceridy. Dochází ke zvýšení triglyceridů, může se měnit hodnota LDL a hladina ochranného HDL bývá nižší.

U mnoha jedinců hraje významnou roli inzulinová rezistence, nadměrný příjem sacharidů, průmyslově zpracovaných potravin, nedostatek pohybu, chronický stres a nedostatečná kvalita spánku.

Skutečným cílem by nemělo být pouze snížení laboratorních hodnot, nýbrž zlepšení celkového metabolického zdraví. Nezaměřujme se pouze na čísla — zaměřme se na jejich příčinu.`,
    },
    en: {
      title: "Cholesterol & Statins — Find the Cause",
      content: `In many cases, when elevated cholesterol is found, the doctor recommends a low-fat diet and prescribes statins. However, the underlying cause is rarely investigated.

Recommending low-fat products can actually worsen the situation — these products are often enriched with higher carbohydrate content to maintain taste.

When insulin levels are chronically elevated, the liver may start storing more fat and increasingly produce triglycerides. Triglycerides rise, LDL values may change, and protective HDL tends to be lower.

For many individuals, the key factors are insulin resistance, excessive carbohydrate intake, processed foods, lack of movement, chronic stress and poor sleep quality.

The real goal should not just be lowering lab numbers, but improving overall metabolic health. Let's not focus only on the numbers — let's focus on their cause.`,
    },
  },
};

export default function ArticlePage({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const article = articles[slug];

  if (!article) {
    return (
      <div className="dashboard">
        <main className="dashboard-main">
          <div className="container">
            <h1>{t("Článek nenalezen", "Article not found")}</h1>
            <a href="/dashboard/courses" className="dashboard-card-link">
              {t("\u2190 Zpět na materiály", "\u2190 Back to materials")}
            </a>
          </div>
        </main>
      </div>
    );
  }

  const data = lang === "cs" ? article.cs : article.en;

  return (
    <div className="dashboard">
      <main className="dashboard-main">
        <div className="container">
          <a href="/dashboard/courses" className="article-back">
            {t("\u2190 Zpět na materiály", "\u2190 Back to materials")}
          </a>
          <article className="article-content">
            <h1>{data.title}</h1>
            {data.content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </article>
        </div>
      </main>
    </div>
  );
}
