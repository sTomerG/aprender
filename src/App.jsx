import React, { useState, useEffect } from "react";
import { Check, Lightbulb, ArrowRight, Info } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Fixed auxiliary conjugation tables (identical for every verb)       */
/* ------------------------------------------------------------------ */

const AUX_ESTAR = ["estoy", "estás", "está", "estamos", "estáis", "están"];
const AUX_HABER = ["he", "has", "ha", "hemos", "habéis", "han"];
const PERSONS = ["yo", "tú", "él/ella/usted", "nosotros", "vosotros", "ellos/ellas/ustedes"];

/* ------------------------------------------------------------------ */
/* Verb data                                                            */
/* ------------------------------------------------------------------ */

const VERBS = [
  {
    id: "hablar", infinitive: "hablar", gloss: "praten",
    gerundio: "hablando", participio: "hablado",
    nl: {
      presente: ["Ik praat", "Jij praat", "Hij praat", "Wij praten", "Jullie praten", "Zij praten"],
      indefinido: ["Ik praatte", "Jij praatte", "Hij praatte", "Wij praatten", "Jullie praatten", "Zij praatten"],
      continuo: ["Ik ben aan het praten", "Jij bent aan het praten", "Hij is aan het praten", "Wij zijn aan het praten", "Jullie zijn aan het praten", "Zij zijn aan het praten"],
      ppc: ["Ik heb gepraat", "Jij hebt gepraat", "Hij heeft gepraat", "Wij hebben gepraat", "Jullie hebben gepraat", "Zij hebben gepraat"],
    },
    forms: {
      presente: ["hablo", "hablas", "habla", "hablamos", "habláis", "hablan"],
      indefinido: ["hablé", "hablaste", "habló", "hablamos", "hablasteis", "hablaron"],
    },
  },
  {
    id: "comer", infinitive: "comer", gloss: "eten",
    gerundio: "comiendo", participio: "comido",
    nl: {
      presente: ["Ik eet", "Jij eet", "Hij eet", "Wij eten", "Jullie eten", "Zij eten"],
      indefinido: ["Ik at", "Jij at", "Hij at", "Wij aten", "Jullie aten", "Zij aten"],
      continuo: ["Ik ben aan het eten", "Jij bent aan het eten", "Hij is aan het eten", "Wij zijn aan het eten", "Jullie zijn aan het eten", "Zij zijn aan het eten"],
      ppc: ["Ik heb gegeten", "Jij hebt gegeten", "Hij heeft gegeten", "Wij hebben gegeten", "Jullie hebben gegeten", "Zij hebben gegeten"],
    },
    forms: {
      presente: ["como", "comes", "come", "comemos", "coméis", "comen"],
      indefinido: ["comí", "comiste", "comió", "comimos", "comisteis", "comieron"],
    },
  },
  {
    id: "vivir", infinitive: "vivir", gloss: "wonen",
    gerundio: "viviendo", participio: "vivido",
    nl: {
      presente: ["Ik woon", "Jij woont", "Hij woont", "Wij wonen", "Jullie wonen", "Zij wonen"],
      indefinido: ["Ik woonde", "Jij woonde", "Hij woonde", "Wij woonden", "Jullie woonden", "Zij woonden"],
      continuo: ["Ik ben aan het wonen", "Jij bent aan het wonen", "Hij is aan het wonen", "Wij zijn aan het wonen", "Jullie zijn aan het wonen", "Zij zijn aan het wonen"],
      ppc: ["Ik heb gewoond", "Jij hebt gewoond", "Hij heeft gewoond", "Wij hebben gewoond", "Jullie hebben gewoond", "Zij hebben gewoond"],
    },
    forms: {
      presente: ["vivo", "vives", "vive", "vivimos", "vivís", "viven"],
      indefinido: ["viví", "viviste", "vivió", "vivimos", "vivisteis", "vivieron"],
    },
  },
  {
    id: "ser", infinitive: "ser", gloss: "zijn",
    gerundio: "siendo", participio: "sido",
    continuoUnusual: true,
    nl: {
      presente: ["Ik ben", "Jij bent", "Hij is", "Wij zijn", "Jullie zijn", "Zij zijn"],
      indefinido: ["Ik was", "Jij was", "Hij was", "Wij waren", "Jullie waren", "Zij waren"],
      continuo: ["Ik ben aan het zijn", "Jij bent aan het zijn", "Hij is aan het zijn", "Wij zijn aan het zijn", "Jullie zijn aan het zijn", "Zij zijn aan het zijn"],
      ppc: ["Ik ben geweest", "Jij bent geweest", "Hij is geweest", "Wij zijn geweest", "Jullie zijn geweest", "Zij zijn geweest"],
    },
    forms: {
      presente: ["soy", "eres", "es", "somos", "sois", "son"],
      indefinido: ["fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron"],
    },
  },
  {
    id: "tener", infinitive: "tener", gloss: "hebben",
    gerundio: "teniendo", participio: "tenido",
    continuoUnusual: true,
    nl: {
      presente: ["Ik heb", "Jij hebt", "Hij heeft", "Wij hebben", "Jullie hebben", "Zij hebben"],
      indefinido: ["Ik had", "Jij had", "Hij had", "Wij hadden", "Jullie hadden", "Zij hadden"],
      continuo: ["Ik ben aan het hebben", "Jij bent aan het hebben", "Hij is aan het hebben", "Wij zijn aan het hebben", "Jullie zijn aan het hebben", "Zij zijn aan het hebben"],
      ppc: ["Ik heb gehad", "Jij hebt gehad", "Hij heeft gehad", "Wij hebben gehad", "Jullie hebben gehad", "Zij hebben gehad"],
    },
    forms: {
      presente: ["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen"],
      indefinido: ["tuve", "tuviste", "tuvo", "tuvimos", "tuvisteis", "tuvieron"],
    },
  },
  {
    id: "hacer", infinitive: "hacer", gloss: "doen",
    gerundio: "haciendo", participio: "hecho",
    nl: {
      presente: ["Ik doe", "Jij doet", "Hij doet", "Wij doen", "Jullie doen", "Zij doen"],
      indefinido: ["Ik deed", "Jij deed", "Hij deed", "Wij deden", "Jullie deden", "Zij deden"],
      continuo: ["Ik ben aan het doen", "Jij bent aan het doen", "Hij is aan het doen", "Wij zijn aan het doen", "Jullie zijn aan het doen", "Zij zijn aan het doen"],
      ppc: ["Ik heb gedaan", "Jij hebt gedaan", "Hij heeft gedaan", "Wij hebben gedaan", "Jullie hebben gedaan", "Zij hebben gedaan"],
    },
    forms: {
      presente: ["hago", "haces", "hace", "hacemos", "hacéis", "hacen"],
      indefinido: ["hice", "hiciste", "hizo", "hicimos", "hicisteis", "hicieron"],
    },
  },
  {
    id: "ir", infinitive: "ir", gloss: "gaan",
    gerundio: "yendo", participio: "ido",
    continuoUnusual: true,
    nl: {
      presente: ["Ik ga", "Jij gaat", "Hij gaat", "Wij gaan", "Jullie gaan", "Zij gaan"],
      indefinido: ["Ik ging", "Jij ging", "Hij ging", "Wij gingen", "Jullie gingen", "Zij gingen"],
      continuo: ["Ik ben aan het gaan", "Jij bent aan het gaan", "Hij is aan het gaan", "Wij zijn aan het gaan", "Jullie zijn aan het gaan", "Zij zijn aan het gaan"],
      ppc: ["Ik ben gegaan", "Jij bent gegaan", "Hij is gegaan", "Wij zijn gegaan", "Jullie zijn gegaan", "Zij zijn gegaan"],
    },
    forms: {
      presente: ["voy", "vas", "va", "vamos", "vais", "van"],
      indefinido: ["fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron"],
    },
  },
  {
    id: "querer", infinitive: "querer", gloss: "willen",
    gerundio: "queriendo", participio: "querido",
    continuoUnusual: true,
    nl: {
      presente: ["Ik wil", "Jij wilt", "Hij wil", "Wij willen", "Jullie willen", "Zij willen"],
      indefinido: ["Ik wilde", "Jij wilde", "Hij wilde", "Wij wilden", "Jullie wilden", "Zij wilden"],
      continuo: ["Ik ben aan het willen", "Jij bent aan het willen", "Hij is aan het willen", "Wij zijn aan het willen", "Jullie zijn aan het willen", "Zij zijn aan het willen"],
      ppc: ["Ik heb gewild", "Jij hebt gewild", "Hij heeft gewild", "Wij hebben gewild", "Jullie hebben gewild", "Zij hebben gewild"],
    },
    forms: {
      presente: ["quiero", "quieres", "quiere", "queremos", "queréis", "quieren"],
      indefinido: ["quise", "quisiste", "quiso", "quisimos", "quisisteis", "quisieron"],
    },
  },
];

const MASTERY_THRESHOLD = 2;
const DEMOTION_CHANCE = 0.25;

const TENSE_TITLES = {
  presente: "Presente",
  indefinido: "Pretérito indefinido",
  continuo: "Presente continuo",
  ppc: "Pretérito perfecto compuesto",
};

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

function stripAccents(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function evaluate(input, answer) {
  const a = input.trim().toLowerCase();
  const b = answer.trim().toLowerCase();
  if (a.length === 0) return 0;
  if (a === b) return 1;
  if (stripAccents(a) === stripAccents(b)) return 0.5;
  return 0;
}

function lowerFirst(s) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

// The 15 rows the learner actually fills in: 3 basisvormen + 6 Presente + 6 Indefinido
function buildRows(verb, masteryHistory) {
  const rows = {};

  const topDefs = [
    { key: "top_inf", tag: "Infinitief", cue: verb.gloss, answer: verb.infinitive, mkey: `${verb.id}|top|inf` },
    { key: "top_cont", tag: "Presente continuo · ik", cue: lowerFirst(verb.nl.continuo[0]), answer: `estoy ${verb.gerundio}`, mkey: `${verb.id}|top|cont`, unusual: !!verb.continuoUnusual },
    { key: "top_ppc", tag: "Pretérito perfecto compuesto · ik", cue: lowerFirst(verb.nl.ppc[0]), answer: `he ${verb.participio}`, mkey: `${verb.id}|top|ppc` },
  ];

  topDefs.forEach((d) => {
    const mastered = (masteryHistory[d.mkey] || 0) >= MASTERY_THRESHOLD;
    rows[d.key] = {
      key: d.key, kind: "top", tag: d.tag, cue: d.cue, answer: d.answer,
      input: mastered ? d.answer : "",
      status: mastered ? "mastered" : "active",
      worst: mastered ? 1 : null, lastScore: null, hintUsed: false, revealed: false,
      masteryKey: d.mkey, unusual: d.unusual || false,
    };
  });

  ["presente", "indefinido"].forEach((tenseId) => {
    PERSONS.forEach((person, i) => {
      const key = `${tenseId}__p${i}`;
      const mkey = `${verb.id}|${tenseId}|p${i}`;
      const mastered = (masteryHistory[mkey] || 0) >= MASTERY_THRESHOLD;
      const answer = verb.forms[tenseId][i];
      rows[key] = {
        key, kind: "person", tense: tenseId, person, answer,
        input: mastered ? answer : "",
        status: mastered ? "mastered" : "active",
        worst: mastered ? 1 : null, lastScore: null, hintUsed: false, revealed: false,
        masteryKey: mkey,
      };
    });
  });

  return rows;
}

function derivedAnswer(tenseId, personIndex, verb) {
  return tenseId === "continuo"
    ? `${AUX_ESTAR[personIndex]} ${verb.gerundio}`
    : `${AUX_HABER[personIndex]} ${verb.participio}`;
}

/* ------------------------------------------------------------------ */
/* Fonts + colors                                                       */
/* ------------------------------------------------------------------ */

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');`;

const COLORS = {
  paper: "#EEF2ED",
  card: "#FCFBF7",
  ink: "#20283F",
  inkMuted: "#5B6478",
  rule: "#C7D2DE",
  margin: "#C1443C",
  pine: "#2F7A5C",
  amber: "#C6862B",
  plum: "#6E5AA0",
  teal: "#2E8A9A",
};

/* ------------------------------------------------------------------ */
/* Basisvormen row (stacked layout)                                     */
/* ------------------------------------------------------------------ */

function TopFillRow({ row, onChange, onCheck, onHint }) {
  const isActive = row.status === "active";
  const isMastered = row.status === "mastered";
  const isLocked = row.status === "locked";

  let borderColor = COLORS.rule;
  let bg = "#FFFFFF";
  if (isMastered) { borderColor = COLORS.plum; bg = "#F6F3FB"; }
  else if (isLocked) { borderColor = COLORS.pine; bg = "#F1F8F4"; }
  else if (row.lastScore === 0.5) { borderColor = COLORS.amber; bg = "#FBF4E7"; }
  else if (row.lastScore === 0) { borderColor = COLORS.margin; bg = "#FBEEEC"; }

  return (
    <div className="py-3 px-3 sm:px-4" style={{ borderBottom: `1px solid ${COLORS.rule}` }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.inkMuted }} className="text-[11px] uppercase tracking-wide mb-0.5">
        {row.tag}
      </div>
      <div style={{ fontFamily: "'Fraunces', serif", color: COLORS.ink }} className="text-base italic leading-snug mb-2">
        “{row.cue}”
      </div>
      {row.unusual && (
        <div style={{ color: COLORS.amber }} className="text-[11px] italic mb-2">
          grammaticaal geldig (Spaans én Nederlands), in de praktijk ongebruikelijk
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          value={row.input}
          disabled={!isActive}
          onChange={(e) => onChange(row.key, e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") onCheck(row.key); }}
          placeholder={isActive ? "typ hier…" : ""}
          style={{ fontFamily: "'IBM Plex Sans', sans-serif", backgroundColor: bg, borderColor, color: COLORS.ink }}
          className="flex-1 min-w-0 rounded-md border-2 px-3 py-1.5 text-[15px] outline-none transition-colors disabled:opacity-90"
        />
        {isActive && (
          <>
            <button onClick={() => onCheck(row.key)} title="Controleer" style={{ backgroundColor: COLORS.pine }} className="shrink-0 rounded-md p-1.5 text-white hover:opacity-90 active:scale-95 transition">
              <Check size={16} strokeWidth={2.5} />
            </button>
            <button onClick={() => onHint(row.key)} title="Hint" style={{ borderColor: COLORS.amber, color: COLORS.amber }} className="shrink-0 rounded-md border-2 p-1.5 hover:bg-amber-50 active:scale-95 transition">
              <Lightbulb size={16} strokeWidth={2.5} />
            </button>
          </>
        )}
        {isLocked && (
          <span style={{ backgroundColor: COLORS.pine, transform: "rotate(-6deg)" }} className="shrink-0 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white select-none">Goed</span>
        )}
        {isMastered && (
          <span style={{ borderColor: COLORS.plum, color: COLORS.plum, transform: "rotate(-6deg)", fontFamily: "'IBM Plex Mono', monospace" }} className="shrink-0 rounded border-2 border-dashed px-2 py-1 text-[10px] font-bold uppercase tracking-wider select-none">Beheerst</span>
        )}
      </div>

      {row.revealed && (
        <div style={{ color: COLORS.amber, fontFamily: "'IBM Plex Sans', sans-serif" }} className="text-xs italic mt-1.5">
          Antwoord: {row.answer} <span className="not-italic">(telt als fout)</span>
        </div>
      )}
      {isLocked && row.worst < 1 && !row.revealed && (
        <div style={{ color: COLORS.inkMuted, fontFamily: "'IBM Plex Sans', sans-serif" }} className="text-xs italic mt-1.5">
          eerdere fout in deze rij telt mee voor de score
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Drill rows — label = Dutch meaning; optional `tag` = pronoun          */
/* (tag is shown when the block is grouped by tense, so the person is    */
/* no longer implied by the block header)                                */
/* ------------------------------------------------------------------ */

function TenseFillRow({ row, label, tag, onChange, onCheck, onHint }) {
  const isActive = row.status === "active";
  const isMastered = row.status === "mastered";
  const isLocked = row.status === "locked";

  let borderColor = COLORS.rule;
  let bg = "#FFFFFF";
  if (isMastered) { borderColor = COLORS.plum; bg = "#F6F3FB"; }
  else if (isLocked) { borderColor = COLORS.pine; bg = "#F1F8F4"; }
  else if (row.lastScore === 0.5) { borderColor = COLORS.amber; bg = "#FBF4E7"; }
  else if (row.lastScore === 0) { borderColor = COLORS.margin; bg = "#FBEEEC"; }

  return (
    <div className="flex items-start gap-3 py-2 px-3 sm:px-4" style={{ borderBottom: `1px solid ${COLORS.rule}` }}>
      <div className="w-32 sm:w-48 shrink-0 pt-2">
        {tag && (
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.inkMuted }} className="text-[10px] uppercase tracking-wide mb-0.5">{tag}</div>
        )}
        <div style={{ fontFamily: "'Fraunces', serif", color: COLORS.ink }} className="text-[13px] sm:text-sm italic leading-tight">
          {label}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <input
            value={row.input}
            disabled={!isActive}
            onChange={(e) => onChange(row.key, e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") onCheck(row.key); }}
            placeholder={isActive ? "typ hier…" : ""}
            style={{ fontFamily: "'IBM Plex Sans', sans-serif", backgroundColor: bg, borderColor, color: COLORS.ink }}
            className="w-full rounded-md border-2 px-3 py-1.5 text-[15px] outline-none transition-colors disabled:opacity-90"
          />
          {isActive && (
            <>
              <button onClick={() => onCheck(row.key)} title="Controleer" style={{ backgroundColor: COLORS.pine }} className="shrink-0 rounded-md p-1.5 text-white hover:opacity-90 active:scale-95 transition">
                <Check size={16} strokeWidth={2.5} />
              </button>
              <button onClick={() => onHint(row.key)} title="Hint" style={{ borderColor: COLORS.amber, color: COLORS.amber }} className="shrink-0 rounded-md border-2 p-1.5 hover:bg-amber-50 active:scale-95 transition">
                <Lightbulb size={16} strokeWidth={2.5} />
              </button>
            </>
          )}
          {isLocked && (
            <span style={{ backgroundColor: COLORS.pine, transform: "rotate(-6deg)" }} className="shrink-0 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white select-none">Goed</span>
          )}
          {isMastered && (
            <span style={{ borderColor: COLORS.plum, color: COLORS.plum, transform: "rotate(-6deg)", fontFamily: "'IBM Plex Mono', monospace" }} className="shrink-0 rounded border-2 border-dashed px-2 py-1 text-[10px] font-bold uppercase tracking-wider select-none">Beheerst</span>
          )}
        </div>
        {row.revealed && (
          <div style={{ color: COLORS.amber, fontFamily: "'IBM Plex Sans', sans-serif" }} className="text-xs italic mt-1 pl-1">
            Antwoord: {row.answer} <span className="not-italic">(telt als fout)</span>
          </div>
        )}
        {isLocked && row.worst < 1 && !row.revealed && (
          <div style={{ color: COLORS.inkMuted, fontFamily: "'IBM Plex Sans', sans-serif" }} className="text-xs italic mt-1 pl-1">
            eerdere fout in deze rij telt mee voor de score
          </div>
        )}
      </div>
    </div>
  );
}

function DerivedRow({ label, tag, answer, unlocked }) {
  return (
    <div className="flex items-start gap-3 py-2 px-3 sm:px-4" style={{ borderBottom: `1px solid ${COLORS.rule}` }}>
      <div className="w-32 sm:w-48 shrink-0 pt-2">
        {tag && (
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.inkMuted }} className="text-[10px] uppercase tracking-wide mb-0.5">{tag}</div>
        )}
        <div style={{ fontFamily: "'Fraunces', serif", color: COLORS.ink }} className="text-[13px] sm:text-sm italic leading-tight">{label}</div>
      </div>
      <div className="flex-1 min-w-0 flex items-center gap-2">
        {unlocked ? (
          <>
            <div style={{ backgroundColor: "#EAF4F4", borderColor: COLORS.teal, color: COLORS.ink, fontFamily: "'IBM Plex Sans', sans-serif" }} className="flex-1 rounded-md border-2 px-3 py-1.5 text-[15px]">
              {answer}
            </div>
            <span style={{ backgroundColor: COLORS.teal, transform: "rotate(-6deg)" }} className="shrink-0 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white select-none">Auto</span>
          </>
        ) : (
          <div style={{ borderColor: COLORS.rule, color: COLORS.inkMuted, fontFamily: "'IBM Plex Sans', sans-serif" }} className="flex-1 rounded-md border-2 border-dashed px-3 py-1.5 text-[13px] italic">
            wacht op basisvorm hierboven…
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Grouping mode: by person (block = pronoun, rows = 4 tenses)           */
/* ------------------------------------------------------------------ */

function PersonBlock({ personIndex, personLabel, verb, rows, onChange, onCheck, onHint, contUnlocked, ppcUnlocked }) {
  const presenteRow = rows[`presente__p${personIndex}`];
  const indefRow = rows[`indefinido__p${personIndex}`];

  return (
    <div style={{ backgroundColor: COLORS.card, borderColor: COLORS.rule }} className="rounded-lg border overflow-hidden mb-5 shadow-sm">
      <div style={{ backgroundColor: COLORS.ink }} className="px-4 py-2">
        <h3 style={{ fontFamily: "'Fraunces', serif", color: "#FCFBF7" }} className="text-lg sm:text-xl font-medium tracking-tight">
          {personLabel}
        </h3>
      </div>
      <div>
        <TenseFillRow row={presenteRow} label={verb.nl.presente[personIndex]} onChange={onChange} onCheck={onCheck} onHint={onHint} />
        <TenseFillRow row={indefRow} label={verb.nl.indefinido[personIndex]} onChange={onChange} onCheck={onCheck} onHint={onHint} />
        <DerivedRow label={verb.nl.continuo[personIndex]} answer={derivedAnswer("continuo", personIndex, verb)} unlocked={contUnlocked} />
        <DerivedRow label={verb.nl.ppc[personIndex]} answer={derivedAnswer("ppc", personIndex, verb)} unlocked={ppcUnlocked} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Grouping mode: by tense (block = tense, rows = 6 persons)             */
/* ------------------------------------------------------------------ */

function TenseGroupedBlock({ tenseId, kind, verb, rows, onChange, onCheck, onHint, unlocked }) {
  return (
    <div style={{ backgroundColor: COLORS.card, borderColor: COLORS.rule }} className="rounded-lg border overflow-hidden mb-5 shadow-sm">
      <div style={{ backgroundColor: COLORS.ink }} className="px-4 py-2 flex items-baseline gap-2">
        <h3 style={{ fontFamily: "'Fraunces', serif", color: "#FCFBF7" }} className="text-base sm:text-lg font-medium tracking-tight">
          {TENSE_TITLES[tenseId]}
        </h3>
        {kind === "derived" && (
          <span style={{ color: COLORS.teal, fontFamily: "'IBM Plex Mono', monospace" }} className="text-[10px] uppercase tracking-wide">automatisch afgeleid</span>
        )}
      </div>
      <div>
        {PERSONS.map((pronoun, i) =>
          kind === "typeable" ? (
            <TenseFillRow key={i} row={rows[`${tenseId}__p${i}`]} tag={pronoun} label={verb.nl[tenseId][i]} onChange={onChange} onCheck={onCheck} onHint={onHint} />
          ) : (
            <DerivedRow key={i} tag={pronoun} label={verb.nl[tenseId][i]} answer={derivedAnswer(tenseId, i, verb)} unlocked={unlocked} />
          )
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main app                                                              */
/* ------------------------------------------------------------------ */

export default function AprenderApp() {
  const [verbIndex, setVerbIndex] = useState(0);
  const [masteryHistory, setMasteryHistory] = useState({});
  const [rows, setRows] = useState(() => buildRows(VERBS[0], {}));
  const [showCompletion, setShowCompletion] = useState(false);
  const [exerciseScore, setExerciseScore] = useState(0);
  const [verbsDone, setVerbsDone] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [groupBy, setGroupBy] = useState("person"); // "person" | "tense"
  const [showModal, setShowModal] = useState(false);

  const verb = VERBS[verbIndex];
  const rowList = Object.values(rows); // the 15 typeable rows
  const doneCount = rowList.filter((r) => r.status !== "active").length;

  const contUnlocked = rows.top_cont.status !== "active";
  const ppcUnlocked = rows.top_ppc.status !== "active";

  const handleChange = (key, value) => {
    setRows((prev) => ({ ...prev, [key]: { ...prev[key], input: value } }));
  };

  const checkOne = (row) => {
    if (row.status !== "active") return row;
    const score = evaluate(row.input, row.answer);
    const worst = row.worst === null ? score : Math.min(row.worst, score);
    const status = score === 1 ? "locked" : "active";
    return { ...row, worst, lastScore: score, status };
  };

  const handleCheck = (key) => setRows((prev) => ({ ...prev, [key]: checkOne(prev[key]) }));

  const handleHint = (key) => {
    setRows((prev) => {
      const row = prev[key];
      if (row.status !== "active") return prev;
      const worst = row.worst === null ? 0 : Math.min(row.worst, 0);
      return { ...prev, [key]: { ...row, worst, hintUsed: true, revealed: true } };
    });
  };

  const handleCheckAll = () => {
    setRows((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        const row = next[key];
        if (row.status === "active" && row.input.trim() !== "") next[key] = checkOne(row);
      });
      return next;
    });
  };

  useEffect(() => {
    if (rowList.length === 0 || showCompletion) return;
    const allDone = rowList.every((r) => r.status !== "active");
    if (!allDone) return;

    const total = rowList.reduce((sum, r) => sum + (r.worst ?? 0), 0);
    setExerciseScore(Math.round((total / rowList.length) * 100));

    setMasteryHistory((prev) => {
      const next = { ...prev };
      rowList.forEach((r) => {
        if (r.status === "mastered") {
          if (Math.random() < DEMOTION_CHANCE) next[r.masteryKey] = 0;
        } else if (r.worst === 1) {
          next[r.masteryKey] = Math.min((prev[r.masteryKey] || 0) + 1, MASTERY_THRESHOLD + 3);
        } else {
          next[r.masteryKey] = 0;
        }
      });
      return next;
    });

    setShowCompletion(true);
    setShowModal(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  const handleNextVerb = () => {
    const nextIndex = (verbIndex + 1) % VERBS.length;
    setVerbIndex(nextIndex);
    setRows(buildRows(VERBS[nextIndex], masteryHistory));
    setShowCompletion(false);
    setShowModal(false);
    setVerbsDone((c) => c + 1);
  };

  const handleStartReview = () => setShowModal(false);

  const perfectCount = rowList.filter((r) => r.status === "locked" && r.worst === 1).length;
  const masteredCount = rowList.filter((r) => r.status === "mastered").length;
  const accentCount = rowList.filter((r) => r.worst === 0.5).length;
  const faultCount = rowList.filter((r) => r.worst === 0).length;

  const toggleBtnStyle = (active) => ({
    backgroundColor: active ? COLORS.ink : "transparent",
    color: active ? "#FCFBF7" : COLORS.inkMuted,
    fontFamily: "'IBM Plex Sans', sans-serif",
  });

  return (
    <div style={{ backgroundColor: COLORS.paper, fontFamily: "'IBM Plex Sans', sans-serif", minHeight: "100vh" }} className="relative w-full">
      <style>{FONT_IMPORT}</style>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(${COLORS.paper}, ${COLORS.paper} 34px, ${COLORS.rule} 35px)` }} />
      <div aria-hidden="true" className="pointer-events-none absolute top-0 bottom-0 left-10 sm:left-16 w-px" style={{ backgroundColor: COLORS.margin, opacity: 0.55 }} />

      <div className="relative max-w-2xl mx-auto px-6 sm:px-10 py-8 pb-32">
        <div className="flex items-start justify-between gap-4 mb-1">
          <div>
            <h1 style={{ fontFamily: "'Fraunces', serif", color: COLORS.ink }} className="text-3xl sm:text-4xl font-semibold tracking-tight">Aprender</h1>
            <p style={{ color: COLORS.inkMuted }} className="text-sm mt-0.5">Spaanse werkwoorden stampen via invuloefeningen</p>
          </div>
          <button onClick={() => setShowInfo((s) => !s)} style={{ color: COLORS.inkMuted, borderColor: COLORS.rule }} className="shrink-0 rounded-full border p-2 hover:bg-white/60 transition mt-1" title="Over dit prototype">
            <Info size={16} />
          </button>
        </div>

        {showInfo && (
          <div style={{ borderColor: COLORS.rule, color: COLORS.inkMuted, backgroundColor: "#FFFFFFAA" }} className="text-xs rounded-md border p-3 mb-4 leading-relaxed space-y-1.5">
            <p>
              <strong style={{ color: COLORS.ink }}>Basisvormen, één keer per werkwoord:</strong> infinitief, en de ik-vorm van
              Presente continuo en Pretérito perfecto compuesto. Daaruit worden het gerundium en voltooid deelwoord gehaald.
            </p>
            <p>
              <strong style={{ color: COLORS.ink }}>Rijlabels zijn de Nederlandse betekenis</strong>, niet de tijdsvormnaam.
              Presente continuo en PPC worden automatisch samengesteld uit de vaste vervoeging van estar/haber + jouw
              gerundium/deelwoord, en tellen niet mee voor de score.
            </p>
            <p>
              <strong style={{ color: COLORS.ink }}>Beheerst-schema</strong> ({MASTERY_THRESHOLD}× foutloos → Beheerst,
              daarna {Math.round(DEMOTION_CHANCE * 100)}% kans per Oefening op terugzetten) is een placeholder — het echte
              spaced-repetition-algoritme staat nog niet in de spec. Alles leeft alleen in deze sessie, niets wordt opgeslagen.
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-6 mt-4">
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.ink, borderColor: COLORS.rule }} className="text-xs border rounded-full px-2.5 py-1 bg-white/70">
            werkwoord {verbIndex + 1} / {VERBS.length}
          </span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.ink, borderColor: COLORS.rule }} className="text-xs border rounded-full px-2.5 py-1 bg-white/70">
            {doneCount} / 15 in te vullen rijen
          </span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.teal, borderColor: COLORS.rule }} className="text-xs border rounded-full px-2.5 py-1 bg-white/70">
            + 12 automatisch
          </span>
          {verbsDone > 0 && (
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.inkMuted }} className="text-xs">
              {verbsDone} werkwoord{verbsDone === 1 ? "" : "en"} voltooid deze sessie
            </span>
          )}
        </div>

        {/* Review summary — non-blocking, shown once "Bekijk antwoorden" is gekozen */}
        {showCompletion && !showModal && (
          <div style={{ backgroundColor: COLORS.card, borderColor: COLORS.pine }} className="rounded-lg border-2 shadow-sm p-4 sm:p-5 mb-6">
            <div className="flex items-start gap-3 mb-3">
              <span style={{ borderColor: COLORS.margin, color: COLORS.margin, transform: "rotate(-6deg)", fontFamily: "'IBM Plex Mono', monospace" }} className="shrink-0 rounded border-2 border-double px-2 py-1 text-[10px] font-bold uppercase tracking-wider select-none">
                Voltooid
              </span>
              <div>
                <div style={{ fontFamily: "'Fraunces', serif", color: COLORS.ink }} className="text-lg font-semibold leading-tight">
                  {verb.infinitive} · {exerciseScore}%
                </div>
                <div style={{ color: COLORS.inkMuted }} className="text-xs mt-0.5">
                  Bekijk je antwoorden hieronder. Klik onderaan op "Volgend werkwoord" zodra je klaar bent met reviewen.
                </div>
              </div>
            </div>
            <div style={{ color: COLORS.inkMuted, fontFamily: "'IBM Plex Mono', monospace" }} className="text-xs grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>✓ foutloos: {perfectCount}</div>
              <div>◆ beheerst: {masteredCount}</div>
              <div>~ accentfout: {accentCount}</div>
              <div>× fout: {faultCount}</div>
            </div>
          </div>
        )}

        {/* Basisvormen */}
        <div style={{ backgroundColor: COLORS.card, borderColor: COLORS.rule }} className="rounded-lg border overflow-hidden mb-4 shadow-sm">
          <div style={{ backgroundColor: COLORS.plum }} className="px-4 py-2">
            <h3 style={{ fontFamily: "'Fraunces', serif", color: "#FCFBF7" }} className="text-base sm:text-lg font-medium tracking-tight">
              Basisvormen — één keer per werkwoord
            </h3>
          </div>
          <div>
            <TopFillRow row={rows.top_inf} onChange={handleChange} onCheck={handleCheck} onHint={handleHint} />
            <TopFillRow row={rows.top_cont} onChange={handleChange} onCheck={handleCheck} onHint={handleHint} />
            <TopFillRow row={rows.top_ppc} onChange={handleChange} onCheck={handleCheck} onHint={handleHint} />
          </div>
        </div>

        {/* Groepering toggle */}
        <div className="flex items-center gap-2 mb-6">
          <span style={{ color: COLORS.inkMuted, fontFamily: "'IBM Plex Mono', monospace" }} className="text-[11px] uppercase tracking-wide">Groeperen:</span>
          <div style={{ borderColor: COLORS.rule, backgroundColor: "#FFFFFF" }} className="inline-flex rounded-full border p-0.5">
            <button onClick={() => setGroupBy("person")} style={toggleBtnStyle(groupBy === "person")} className="rounded-full px-3 py-1 text-xs font-medium transition">
              per persoonsvorm
            </button>
            <button onClick={() => setGroupBy("tense")} style={toggleBtnStyle(groupBy === "tense")} className="rounded-full px-3 py-1 text-xs font-medium transition">
              per tijdsvorm
            </button>
          </div>
        </div>

        {/* Drill blocks */}
        {groupBy === "person"
          ? PERSONS.map((personLabel, i) => (
              <PersonBlock
                key={personLabel}
                personIndex={i}
                personLabel={personLabel}
                verb={verb}
                rows={rows}
                onChange={handleChange}
                onCheck={handleCheck}
                onHint={handleHint}
                contUnlocked={contUnlocked}
                ppcUnlocked={ppcUnlocked}
              />
            ))
          : (
            <>
              <TenseGroupedBlock tenseId="presente" kind="typeable" verb={verb} rows={rows} onChange={handleChange} onCheck={handleCheck} onHint={handleHint} />
              <TenseGroupedBlock tenseId="indefinido" kind="typeable" verb={verb} rows={rows} onChange={handleChange} onCheck={handleCheck} onHint={handleHint} />
              <TenseGroupedBlock tenseId="continuo" kind="derived" verb={verb} rows={rows} unlocked={contUnlocked} />
              <TenseGroupedBlock tenseId="ppc" kind="derived" verb={verb} rows={rows} unlocked={ppcUnlocked} />
            </>
          )}

        <div style={{ color: COLORS.inkMuted }} className="text-xs flex flex-wrap gap-x-4 gap-y-1 mt-2">
          <span className="flex items-center gap-1.5"><span style={{ backgroundColor: COLORS.pine }} className="w-2.5 h-2.5 rounded-sm inline-block" /> goed</span>
          <span className="flex items-center gap-1.5"><span style={{ backgroundColor: COLORS.amber }} className="w-2.5 h-2.5 rounded-sm inline-block" /> accentfout</span>
          <span className="flex items-center gap-1.5"><span style={{ backgroundColor: COLORS.margin }} className="w-2.5 h-2.5 rounded-sm inline-block" /> fout</span>
          <span className="flex items-center gap-1.5"><span style={{ backgroundColor: COLORS.plum }} className="w-2.5 h-2.5 rounded-sm inline-block" /> beheerst</span>
          <span className="flex items-center gap-1.5"><span style={{ backgroundColor: COLORS.teal }} className="w-2.5 h-2.5 rounded-sm inline-block" /> automatisch afgeleid</span>
        </div>
      </div>

      {/* Sticky footer: check-all while active, next-verb once reviewing. Hidden behind the popup. */}
      {!showModal && (
        <div style={{ backgroundColor: "#FCFBF7EE", borderColor: COLORS.rule }} className="fixed bottom-0 left-0 right-0 border-t backdrop-blur-sm">
          <div className="max-w-2xl mx-auto px-6 sm:px-10 py-3 flex items-center justify-between gap-4">
            {showCompletion ? (
              <>
                <div style={{ color: COLORS.inkMuted }} className="text-xs">Score: {exerciseScore}% — klaar met reviewen?</div>
                <button onClick={handleNextVerb} style={{ backgroundColor: COLORS.pine }} className="shrink-0 rounded-md text-white px-4 py-2 text-sm font-medium hover:opacity-90 active:scale-95 transition flex items-center gap-2">
                  Volgend werkwoord <ArrowRight size={16} />
                </button>
              </>
            ) : (
              <>
                <div style={{ color: COLORS.inkMuted }} className="text-xs">"Controleer alles" evalueert alleen ingevulde, nog actieve rijen.</div>
                <button onClick={handleCheckAll} style={{ backgroundColor: COLORS.pine, fontFamily: "'IBM Plex Sans', sans-serif" }} className="shrink-0 rounded-md text-white px-4 py-2 text-sm font-medium hover:opacity-90 active:scale-95 transition">
                  Controleer alles
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Completion popup — first thing shown when the Exercise is done */}
      {showModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center px-6" style={{ backgroundColor: "#20283FCC" }}>
          <div style={{ backgroundColor: COLORS.card }} className="relative w-full max-w-sm rounded-xl shadow-2xl px-8 py-9 text-center">
            <div style={{ borderColor: COLORS.margin, color: COLORS.margin, transform: "rotate(-8deg)", fontFamily: "'IBM Plex Mono', monospace" }} className="mx-auto mb-5 w-fit rounded border-4 border-double px-4 py-1.5 text-sm font-bold uppercase tracking-[0.2em] select-none">
              Voltooid
            </div>
            <h2 style={{ fontFamily: "'Fraunces', serif", color: COLORS.ink }} className="text-2xl font-semibold mb-1">{verb.infinitive}</h2>
            <p style={{ color: COLORS.inkMuted }} className="text-sm italic mb-5">{verb.gloss}</p>
            <div style={{ fontFamily: "'Fraunces', serif", color: COLORS.pine }} className="text-5xl font-semibold mb-1">{exerciseScore}%</div>
            <p style={{ color: COLORS.inkMuted }} className="text-xs mb-6">Oefeningscore (15 ingevulde rijen)</p>
            <div style={{ color: COLORS.inkMuted, fontFamily: "'IBM Plex Mono', monospace" }} className="text-xs grid grid-cols-2 gap-2 mb-7 text-left">
              <div>✓ foutloos: {perfectCount}</div>
              <div>◆ beheerst: {masteredCount}</div>
              <div>~ accentfout: {accentCount}</div>
              <div>× fout: {faultCount}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleStartReview}
                style={{ borderColor: COLORS.pine, color: COLORS.pine }}
                className="flex-1 rounded-md border-2 px-4 py-2.5 text-sm font-medium hover:bg-green-50 active:scale-95 transition"
              >
                Bekijk antwoorden
              </button>
              <button
                onClick={handleNextVerb}
                style={{ backgroundColor: COLORS.pine }}
                className="flex-1 rounded-md text-white px-4 py-2.5 text-sm font-medium hover:opacity-90 active:scale-95 transition flex items-center justify-center gap-2"
              >
                Volgend <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
