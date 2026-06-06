# Repo Audit — Harness (GitHub Trending Readiness)

- **Audited repo:** `dynamic-harness` (local), git remote `https://github.com/tobyilee/dynamic-harness.git`
- **Upstream identity in content:** `revfactory/harness` (README badges, marketplace, plugin.json homepage)
- **Date:** 2026-06-06
- **Auditor:** repo-auditor
- **Scope:** README.md, .claude-plugin/plugin.json, .claude-plugin/marketplace.json, skills/harness/SKILL.md, references/, docs/, CHANGELOG.md, CONTRIBUTING.md, git metadata

## Executive Summary

Harness is a Claude Code plugin that turns a one-sentence domain description into an agent team plus the skills it uses, built on six team-architecture patterns. The content is mature and well-positioned: trilingual READMEs (EN/KO/JA), a clear L3 "meta-factory" category claim, honest disclosure language around its headline metric, a 462-line SKILL.md backed by 7 disciplined reference docs, and full community scaffolding (CONTRIBUTING with SLAs, issue templates, PR template, changelog). Trending readiness is **high on narrative/docs, medium on credibility-proof, and currently blocked by an identity mismatch**: this working copy's git remote is a personal fork (`tobyilee/dynamic-harness`) while every install command, badge, and link points to `revfactory/harness`. There are also zero git tags despite a versioned changelog, and the headline "+60%" claim rests on a single author-measured n=15 study with no third-party replication.

## Strengths

1. **Sharp, defensible positioning.** "Team-architecture factory" (L3 Meta-Factory) with an explicit category table and a coexistence matrix (Archon, meta-harness, ECC, wshobson, LangGraph) reframes competitors as neighbors rather than rivals. This is unusually strong narrative engineering for a trending-stage repo.
2. **Trilingual reach (EN/KO/JA).** Three full READMEs widen the audience to the large Korean and Japanese Claude Code communities — a real trending multiplier.
3. **High-quality skill content.** SKILL.md is well-structured (Phase 0–7, decision matrices, progressive disclosure), within the 500-line target (462), and every reference file is appropriately sized (228–328 lines) with the SKILL.md acting as a lean router. The content practices what it preaches.
4. **Honest metric disclosure.** The "+60%" claim is consistently paired with "n=15, author-measured, third-party replications pending," plus a dedicated FAQ. This pre-empts the "oversold benchmark" criticism that sinks many trending repos.
5. **Mature community scaffolding.** CONTRIBUTING.md with concrete SLAs (PR 72h, triage 48h, security 7d), issue templates (bug/feature/question/config), PR template, semantic-versioned CHANGELOG, Apache-2.0 LICENSE, privacy.html, and a landing index.html. This signals maintained, not abandoned.
6. **Strong onboarding.** docs/quickstart.md is a strict 5-minute path with 5 failure-FAQ branches and copy-paste prompts — exactly what converts a trending visitor into an installer.
7. **Concrete proof-of-output.** The sister repo `harness-100` (100 harnesses, 1,808 markdown files) is tangible evidence the factory produces real artifacts, not just claims.

## Weaknesses

1. **Repo identity mismatch (highest impact).** The git remote is `tobyilee/dynamic-harness`, but README badges (stars/star-history), marketplace `add` commands, plugin.json `homepage`/`repository`, and all docs link to `revfactory/harness`. If this fork is what gets published/trended, every install command and stats badge points at the wrong repo, and users cannot install from this URL.
2. **No git tags / releases.** 42 commits and a changelog through v1.2.1, but `git tag -l` returns nothing. GitHub Releases are a primary trending and trust surface; their total absence undercuts the "biweekly release cadence" claim in CONTRIBUTING.
3. **Version drift history (now partly fixed, still fragile).** plugin.json and marketplace.json are v1.2.0, but the changelog's top entry is `[Unreleased]` describing the 3-0/4-0 dedup feature that is already shipped in SKILL.md — so the manifests under-report the current state. The 1.2.1 changelog entry documents a prior 3-way version mismatch; the same class of drift can recur without a release process.
4. **Quickstart command inconsistency.** README install uses `/plugin install harness@harness-marketplace`; quickstart.md uses `claude plugin install harness@harness`. The marketplace name is `harness-marketplace`, so the quickstart command is likely wrong, and the two docs disagree.
5. **Single-source evidence.** The entire quantitative case (+60%, 15/15 win-rate, −32% variance) traces to one author (Hwang, M.) and one repo. The cited 2026 paper and `docs/cost-controls.md` are forthcoming/unverifiable from here. Trending audiences and HN-style scrutiny will probe this hard.
6. **Heavy image payload.** Four PNGs total ~9.4 MB (banner 2.9 MB, social 2.5 MB, team 2.7 MB, icon 1.3 MB) committed to the repo. Slows clone and inflates repo size; should be optimized or offloaded.
7. **Experimental dependency.** Core functionality requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` and Claude Code v2.x. This is disclosed, but a flag-gated, research-preview dependency is a fragility a casual trending installer may hit and bounce on.

## Risks

- **Wrong-repo trending (critical):** Stars/installs could accrue to `revfactory/harness` while traffic lands on `tobyilee/dynamic-harness`, or installs simply fail. Resolve identity before any launch push.
- **Credibility blowback (medium):** A skeptical post questioning the un-replicated +60% could dominate the narrative. The honest-disclosure framing mitigates but does not eliminate this.
- **Install-path failure (medium):** Mismatched marketplace/plugin names in quickstart vs README can produce a failed first install — the worst possible trending first impression.
- **Maintenance-promise gap (low-medium):** Published SLAs and biweekly cadence with zero tagged releases invites "talks the talk, no releases" critique.
- **Forthcoming-doc rot (low):** Multiple references to not-yet-existing docs (`cost-controls.md`, the paper, Loom embed TODO) read as vaporware if they linger.

## Improvement Recommendations (prioritized)

### P0 — Before any trending push
1. **Resolve repo identity.** Decide canonical home (`revfactory/harness` vs this fork). Make git remote, README badges, marketplace `add`/`install`, plugin.json `homepage`/`repository`, and all doc links agree on one slug.
2. **Cut tagged GitHub Releases.** Tag v1.0.0 → v1.2.0 (the changelog already plans soft-tagging) and publish a current release with notes. This is the single highest-leverage trust/visibility fix after identity.
3. **Reconcile versions + changelog.** Move `[Unreleased]` (3-0/4-0 dedup) into a real version, bump plugin.json/marketplace.json to match SKILL.md's actual content, and re-verify all three README badges.
4. **Fix install commands.** Align quickstart.md (`harness@harness`) with README (`harness@harness-marketplace`) and the actual marketplace name; test both `add` and `install` end-to-end.

### P1 — Strengthen credibility
5. **Add a one-screen "how to reproduce the A/B" section** linking the exact tasks/scoring in `claude-code-harness`, and open an explicit call for third-party replication (turns the weakness into community engagement).
6. **Ship or remove forthcoming refs.** Either add `docs/cost-controls.md` and the paper link, or drop the TODO/Loom/forthcoming mentions so nothing reads as vaporware.

### P2 — Polish
7. **Optimize images.** Compress the ~9.4 MB of PNGs (or move to a CDN/release asset); target <500 KB per in-README image.
8. **Add a 15–30s demo GIF/asciinema** of "one sentence → generated team" near the top — the fastest way to convert a trending skim into a star.
9. **Surface the experimental flag earlier** in the README (not only Requirements/quickstart) so expectations are set before install.

## Trending-Readiness Scorecard

| Dimension | Score (1–5) | Note |
|-----------|:-----------:|------|
| Positioning / narrative | 5 | Category-defining, coexistence framing, trilingual |
| Documentation | 4 | Excellent depth; install-command inconsistency drags it |
| Skill/content quality | 5 | Disciplined, progressive-disclosure, within size targets |
| Credibility / proof | 2 | Single-author n=15, no replication, no tagged releases |
| Repo hygiene / identity | 2 | Fork-vs-upstream mismatch, no tags, heavy images |
| Community readiness | 4 | SLAs, templates, changelog; cadence unproven |
| **Overall** | **3.5 / 5** | High-ceiling repo gated by P0 identity + release fixes |
