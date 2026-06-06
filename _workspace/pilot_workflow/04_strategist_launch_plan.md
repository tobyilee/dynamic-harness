# Harness — GitHub Trending Integrated Launch Plan

> **Project**: Harness — Claude Code Plugin (L3 Meta-Factory / Team-Architecture Factory)
> **One-liner**: One domain sentence -> agent team + the skills they use, via 6 team-architecture patterns.
> **Canonical repo (to be locked in P0)**: https://github.com/revfactory/harness
> **Goal**: Enter GitHub Trending + drive Claude Code community adoption
> **Plan date**: 2026-06-06 · Author: launch-strategist
> **Synthesizes**: 01 Repo Audit · 02 Launch Content · 03 Outreach Target Map

---

## 0. Strategic Read (why this plan is shaped this way)

The audit verdict is unambiguous: Harness is a **high-ceiling, narrative-strong repo (3.5/5) that is currently gated by P0 hygiene issues, not by content quality.** The launch content (02) and outreach map (03) are already mature and tonally disciplined — the honest "+60% (n=15, author-measured, replications pending)" guardrail is consistent across every surface, which is exactly what protects the launch from HN-style credibility blowback.

Therefore the single biggest launch risk is **not** messaging — it is the **repo-identity mismatch**: this working copy's git remote is `tobyilee/dynamic-harness`, but every install command, badge, plugin.json link, and outreach URL points to `revfactory/harness`. If we launch before resolving this, stars/installs scatter to the wrong repo or installs fail outright — the worst possible trending first impression.

**Consequence for sequencing**: the entire Tier 1 outreach blitz (Show HN, Product Hunt, Reddit x3, Discord, X, awesome PRs) is **GATED** behind a P0-complete checkpoint. No public push fires until identity, tags/releases, version reconciliation, and install-command parity are verified end-to-end.

Because no fixed calendar target date was supplied, this plan uses a **relative T-day timeline** anchored to "first day all P0 gates pass." T-7 through T-1 is the prep/gate window; T is launch day; T+1 to T+14 is the amplification tail.

---

## 1. Timeline (relative to T = launch day)

### T-7 to T-4 — P0 Identity & Release Gate (BLOCKING — nothing public ships until these pass)

| # | Action | Owner | Done-when |
|---|--------|-------|-----------|
| P0-1 | **Lock canonical repo identity.** Decide `revfactory/harness` is the public home. Align git remote, README badges (stars/star-history), marketplace `add`/`install`, plugin.json `homepage`/`repository`, and all doc links to ONE slug. | maintainer | `grep` for `tobyilee/dynamic-harness` returns 0 hits in published assets |
| P0-2 | **Cut tagged GitHub Releases.** Tag v1.0.0 -> v1.2.0 (and current), publish release notes. Highest-leverage trust fix after identity. | maintainer | `git tag -l` is non-empty; latest release visible on repo |
| P0-3 | **Reconcile versions + changelog.** Move `[Unreleased]` (3-0/4-0 dedup) into a real version; bump plugin.json/marketplace.json to match SKILL.md; re-verify all 3 README badges. | maintainer | manifest version == changelog top entry == SKILL.md state |
| P0-4 | **Fix + test install commands end-to-end.** Make quickstart.md (`harness@harness`) agree with README (`harness@harness-marketplace`) and the real marketplace name. Run `add` + `install` on a clean machine. | maintainer | fresh `/plugin install` succeeds; both docs identical |

### T-3 to T-2 — P1 Credibility Hardening (strongly recommended before push)

| # | Action | Done-when |
|---|--------|-----------|
| P1-1 | Add a one-screen **"How to reproduce the A/B"** section (exact tasks/scoring) + an explicit **call for third-party replication**. Turns the n=15 weakness into a community hook. | section live in README |
| P1-2 | **Ship or remove forthcoming refs** (`cost-controls.md`, the paper link, Loom TODO) so nothing reads as vaporware. | no dangling "forthcoming" mentions |
| P1-3 | Add a **15-30s demo GIF/asciinema** ("one sentence -> generated team") near top of README. Fastest skim->star converter. | GIF in README header |

### T-2 to T-1 — Pre-launch Outreach Prep (parallel with P1)

- Secure **Product Hunt hunter** and confirm "AI Coding Agents" category + launch slot.
- Send **soft pre-DMs** to Tier 1 influencers (@AnthropicAI/@claudeai relevance, Boris Cherny / Claude Code core, target Claude Code YouTubers) — warm them, do not link-dump.
- **Prepare HN first-comment talking points** + FAQ answers: Q1 (n=15 too small? -> honest framing + replication ask), Q2 (vs Archon -> coexistence/neighbor frame), Q3 (Claude-Code-only too narrow? -> "native + deep" tradeoff, meta-harness Codex port exists).
- Draft all platform posts from content (02) into final form; image-optimize the ~9.4 MB of PNGs (P2, target <500 KB each) so the repo loads fast for arriving traffic.
- **Go/No-Go checkpoint**: confirm all four P0 gates pass. If any fails, **slip T-day** — do not launch on a broken install path.

### T (Launch Day) — Tier 1 Blitz (±1 day concentrated, per outreach map)

Sequenced by channel below (Section 2). Concentrate star velocity into a single day to trigger GitHub Trending auto-exposure.

### T+1 — Follow-through

- Ben's Bites community vote.
- Influencer RT follow-ups; reply to every HN/Reddit comment (response discipline = trust).
- Submit awesome-claude-code / awesome-claude-skills Tier 1 PRs/recommend-issues (per each list's PR policy).

### T+2 to T+3 — Tier 2 wave

- Newsletter outreach: TLDR AI / TLDR Open Source, The Rundown, Console.dev.
- Tier 2 Reddit **deep** posts: r/LocalLLaMA (architecture + A/B methodology), r/programming (research angle), r/AI_Agents (wiring-automation angle) — **1 subreddit/day spacing, never same-day multi-post (spam flag)**.

### T+7 (Launch Week 2) — Tier 2 long-tail

- awesome-llm-agents / awesome-agents PRs; Dev.to cross-post; YouTube creator walkthrough offers.

### T+14 — Tier 3 / passive discovery

- Long-tail awesome lists; r/MachineLearning `[P]` showcase (with disclosure); remaining newsletters; awesomeclaude.ai, Star History, aggregator registrations.

---

## 2. Channel-by-Channel Execution Order (Launch Day T)

Order is designed to **seed credible discussion first, then drive amplification** — HN/Reddit threads need early-seeded comments before influencers point traffic at them.

1. **(Morning, Tue-Thu 9-11am EST) Show HN** — primary lever. Title: *"Show HN: Harness – turn one sentence into a Claude Code agent team and its skills"* (verb-led, no emoji, no +60% in title). Immediately **self-post the first comment** with the three talking points to seed the thread. HN is the highest-scrutiny / highest-credibility surface — disciplined honesty here sets the tone everywhere.
2. **Product Hunt** launch (hunter pre-arranged), "AI Coding Agents" category. Rally network for early upvotes.
3. **Reddit r/ClaudeAI** (Tier 1, highest community ROI) — use-case-led body, before/after example, honest metric + caveat, end with a genuine discussion question. (r/SideProject and r/opensource follow on subsequent days — 1/day to avoid spam flags.)
4. **Anthropic/Claude official Discord** #showcase / #community-projects — demo GIF + one-sentence trigger; aim for official highlight.
5. **X / Twitter 3-tweet thread** (hook -> 6 patterns -> proof+CTA, emoji as scannability anchors per platform norm). T1 carries repo link; one link per tweet to protect reach. Fire influencer pre-DMs to point at the live thread/repo right after it posts.
6. **awesome-claude-code / awesome-claude-skills Tier 1 PRs** (check each list's PR policy; submit recommend-issue where maintainer-only).
7. **Ben's Bites** community vote (can begin T, push T+1).

> **Cross-platform invariants (enforce on every post):** (a) the +60% figure NEVER appears without "(n=15, author-measured, replications pending)" in the same sentence/tweet; (b) no "revolutionary/game-changing/10x" on HN or Reddit; (c) install commands identical everywhere (`revfactory/harness` + `harness@harness-marketplace`); (d) every post ends with a real discussion prompt, not a hard sell; (e) **harness-100** used as the "see the output before you install" proof asset on all three platforms.

---

## 3. Risk Response

| Risk (from audit) | Severity | Mitigation | Owner / Trigger |
|---|---|---|---|
| **Wrong-repo trending** — stars/installs scatter to wrong slug or installs fail | **Critical** | P0-1 hard gate; launch BLOCKED until `grep` shows 0 wrong-slug refs and a clean-machine install succeeds. Slip T-day if unmet. | maintainer / pre-launch Go-No-Go |
| **Credibility blowback** — a skeptic post on the un-replicated +60% dominates the narrative | Medium | Pre-loaded honest disclosure on every surface; P1-1 reproduction section + explicit replication call; HN first-comment owns the limits proactively; FAQ Q1 ready. Reframe skepticism as "please break it." | content owner / any thread questioning n=15 |
| **Install-path failure** — README vs quickstart command mismatch | Medium | P0-4 end-to-end test on clean machine before launch; identical install string across all 3 platforms. | maintainer / pre-launch |
| **Maintenance-promise gap** — published SLAs + biweekly cadence but 0 tagged releases | Low-Med | P0-2 ships real tagged releases so cadence claim is backed by evidence at launch. | maintainer / T-4 |
| **Forthcoming-doc rot** — `cost-controls.md`, paper, Loom TODO read as vaporware | Low | P1-2: ship or remove before launch. | content owner / T-2 |
| **Heavy image payload** (~9.4 MB) slows the arriving-traffic clone/README load | Low | P2 image optimization in T-2 prep (<500 KB/image or CDN). | maintainer / T-2 |
| **Experimental-flag bounce** — casual installer hits `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` requirement and leaves | Low-Med | Surface the flag earlier in README (P2-9), set expectations before install. | content owner / T-2 |
| **Reddit spam flag** — same content across subs same week | Low | Enforce 1-subreddit/day cadence, Tue-Thu 9-11am EST; retarget r/LocalLLaMA/r/ChatGPTCoding if r/programming rejects. | outreach owner / ongoing |

---

## 4. Success Signals to Watch (during launch window)

- **GitHub Trending entry** (the goal) — track via Trendshift / Star History on T and T+1.
- HN front-page persistence + comment quality (are FAQ pre-answers landing?).
- Reddit upvote ratio and "how do I install" comments resolving cleanly (validates P0-4).
- Install success vs. issue-tracker first-install failures (validates P0-1/P0-4).
- Replication takers responding to the P1-1 call — the strongest medium-term credibility unlock.
