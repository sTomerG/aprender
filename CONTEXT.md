# Aprender

Spaanse werkwoorden stampen via invuloefeningen, met focus op persoonsvormen.

## Language

**Learner**:
A person who practices Exercises. Each Learner has their own Mastery history and Exercise records. Accounts are created manually for a small known set of people; there is no public self-registration. Practice requires being signed in — there is no anonymous or guest practice.
_Avoid_: User, account, student, profile, guest

**Tense**:
One of the four grammatical tenses initially in scope: Presente (como), Pretérito indefinido (comí), Presente continuo (estoy comiendo), Pretérito perfecto compuesto / PPC (he comido). Presente and Pretérito indefinido are fully typed and scored per person; Presente continuo and PPC are only typed/scored for the yo form (as part of Basic forms) — the other five persons are Derived rows.
_Avoid_: Time, form (as a synonym), verb form

**Basic forms**:
Three fill-ins asked once per verb, not per Tense: the Infinitive, the yo form of Presente continuo (e.g. "estoy comiendo"), and the yo form of PPC (e.g. "he comido"). Cued by their Dutch meaning. Scored the same as any other row.
_Avoid_: Basisvormen (untranslated), base row

**Infinitive**:
The unconjugated dictionary form of the Spanish verb; one of the three Basic forms, cued by its Dutch meaning (Gloss).
_Avoid_: Base form, stem, dictionary form

**Person form**:
A conjugated verb form, in Presente or Pretérito indefinido, for one of the six grammatical persons: yo, tú, él/ella/usted, nosotros, vosotros, ellos/ellas/ustedes — each cued by its Dutch meaning. These are the only per-person rows the learner types and that are scored.
_Avoid_: Conjugation (alone), ending, answer row

**Derived row**:
A read-only, correct-by-construction display of Presente continuo or PPC for one person, built from the verb's gerundio/participio and the fixed estar/haber conjugation. Shown for reference, contributes nothing to the Exercise score, and is not editable. A Tense's Derived rows only appear once the matching Basic form (yo) row is no longer active (i.e. answered correctly or already Mastered).
_Avoid_: Auto row, generated row, computed conjugation

**Exercise**:
One practice unit for a single Spanish verb: the 3 Basic forms + 6 Presente Person forms + 6 Pretérito indefinido Person forms (15 scored rows total), plus 12 Derived rows shown for reference (Presente continuo and PPC, all 6 persons each). The Exercise is done only when every one of the 15 scored rows has been Checked correct (directly or already Mastered).
_Avoid_: Card, quiz, lesson, session

**Gloss**:
The Dutch meaning shown as the cue for a Basic form or Person form fill-in. Direction of practice is Dutch → Spanish.
_Avoid_: Translation, prompt

**Check**:
Evaluating one scored row, or all filled-in scored rows in the Exercise at once. Shows only outcome color — green (correct), yellow (Accent fault), red (Full fault) — and never reveals the answer. Comparison ignores letter case and surrounding spaces, but diacritics matter. After a non-green result the learner may edit and Check again. A green result locks that row for the rest of the Exercise. Checking all skips rows left blank; a blank row can still be Full-faulted by Checking it individually.
_Avoid_: Submit (as a domain concept), grade, validate

**Hint**:
A per-row control the learner must click to reveal the correct answer for that scored row; it does not insert the answer. Available at any time, even before a first guess. Using a Hint counts as a Full fault for that row. Reveal is never automatic on Check.
_Avoid_: Reveal, cheat, autofill, solution button, answer button

**Full fault**:
A scored row that does not match the answer beyond diacritics (wrong letters, empty, etc.), or a row where the learner used a Hint. Counts as a whole fault; shown as red when discovered by Check (Hint use is a Full fault even if the typed value later matches).
_Avoid_: Error, miss

**Accent fault**:
A scored row that matches the answer except for missing or wrong diacritics (and no Hint was used). Counts as a half fault; shown as yellow.
_Avoid_: Soft error, typo, almost correct

**Row result**:
The scored outcome for one scored row within an Exercise, based on the worst attempt on that row: Hint or Full fault → 0, Accent fault → 0.5, only correct Checks → 1. A later correct Check does not erase an earlier worse result.
_Avoid_: Attempt score, line grade

**Exercise score**:
The average of the 15 scored Row results (Basic forms + Presente + Pretérito indefinido Person forms) for one completed Exercise. Drives how often that verb returns in future Exercises.
_Avoid_: Grade, accuracy, mastery (as a synonym for this average)

**Mastered row**:
A specific scored row (one verb + one Basic form, or one verb + Tense + person for Presente/Indefinido) that is pre-filled with the correct answer and auto-confirmed as correct in a new Exercise, based on the learner's history for that exact row. The learner takes no action on it. Mastery is not permanent: on a schedule, a Mastered row is demoted back to a normal blank fill-in to reconfirm the learner still knows it. The current threshold (correct in every Exercise it appeared in, twice) and demotion chance (25% per Exercise) are an explicit placeholder, not the real spaced-repetition algorithm, which is still to be designed.
_Avoid_: Known row, learned row, skipped row

**Practice row**:
A scored row that is not currently Mastered: it starts blank and must be filled in and Checked like any other row.
_Avoid_: Normal row, active row

**Completion screen**:
Shown once all 15 scored rows in an Exercise are correct, as a blocking popup with the Exercise score and per-Exercise stats (perfect / Mastered / Accent fault / Full fault counts). From there the learner either dismisses it to review the finished Exercise (rows stay visible, still no auto-advance) or goes straight to the next verb. The app never advances automatically.
_Avoid_: Summary, results page, auto-advance

**Mastery history**:
The Learner's durable record, per scored-row identity (verb + Basic form, or verb + Tense + person for Presente/Indefinido), of outcomes across Exercises. Each update is tied to when that Exercise was completed — time is part of the history, because future Mastery promotion/demotion will depend on it. Updated only when an Exercise is completed, together with that Exercise's Exercise record. How history maps to Mastered vs Practice remains the placeholder policy on Mastered row — not a finalized spaced-repetition algorithm — but the stored history must remain rich enough for a time-based policy later.
_Avoid_: Progress (alone), save state, mastery store

**Exercise record**:
A durable, append-only record of one completed Exercise for a Learner: which verb, when it was completed, the Exercise score, and the per-Exercise stats shown on the Completion screen (perfect / Mastered / Accent fault / Full fault counts). Created only at Exercise completion (when the Completion screen appears); records are kept indefinitely and are never updated or deleted as part of normal practice. Mid-Exercise fill-in state is not an Exercise record and is not persisted — a reload abandons an unfinished Exercise.
_Avoid_: Progress (alone), session log, attempt history, resume state

**Exercise history**:
The in-app chronological list of a Learner's Exercise records across all verbs (when completed, which verb, Exercise score, and the Completion-screen stats). This is how a Learner browses past completions; it is not a per-verb view.
_Avoid_: Progress log, stats page, dashboard, per-verb history

**Session-only state**:
Typed answers, Check colors, Hint use, and other in-flight Exercise UI state for the current page load. Not persisted; deliberately discarded on reload.
_Avoid_: Progress, save, auto-save
