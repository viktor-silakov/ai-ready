---
name: ai-ready
description: Analyze any repository for AI agent development efficiency. Scores 8 key aspects (documentation, architecture, testing, type safety, agent instructions, file structure, context optimization, security) from 1-100 with ASCII progress bars. Highlights problems by severity (Critical/Warning/Info), provides overall A-F grade, surveys user on issues to fix, then enters plan mode to create a phased refactoring roadmap. Use when evaluating repository readiness for AI-assisted development or preparing a codebase for Claude Code.
user-invocable: true
argument-hint: [path-to-repo]
---

# AI-Readiness Analysis Skill

## Workflow Checklist

Follow these steps in order:

- [ ] Step 1: Discover repository (language, framework, existing report)
- [ ] Step 2: Analyze all 8 aspects with sub-criteria checks
- [ ] Step 3: Calculate scores (weighted) and overall grade
- [ ] Step 4: Display dashboard with ASCII progress bars
- [ ] Step 5: Present problems grouped by severity then aspect
- [ ] Step 6: Survey user on issues to fix (Critical=Y default, Warning/Info=N)
- [ ] Step 7: Enter plan mode automatically
- [ ] Step 8: Create phased roadmap (Quick Wins → Foundation → Advanced)
- [ ] Step 9: Generate templates for selected missing files
- [ ] Step 10: Save AI-READINESS-REPORT.md with delta tracking

---

## Step 1: Repository Discovery

Analyze the target repository to understand its context:

```
Target: {argument provided OR current working directory}
```

**Discover:**
1. **Primary Language:** Check file extensions, package files (package.json, Cargo.toml, go.mod, pyproject.toml, etc.)
2. **Framework:** Detect from dependencies and file structure
3. **Existing Report:** Check for `AI-READINESS-REPORT.md` (for delta tracking)
4. **Agent Files:** Check for CLAUDE.md, .cursorrules, .github/copilot-instructions.md
5. **Documentation Files:** README.md, ARCHITECTURE.md, CONTRIBUTING.md, docs/

Use Glob and Read tools to gather this information efficiently.

---

## Step 2: Analyze All 8 Aspects

For each aspect, evaluate every sub-criterion on a 0-10 scale.

### Aspect 1: Documentation (Weight: 15%)

| # | Criterion | 0 Points | 5 Points | 10 Points |
|---|-----------|----------|----------|-----------|
| 1.1 | README exists | Missing | Minimal | Comprehensive |
| 1.2 | README has getting started | Missing | Basic | Step-by-step with examples |
| 1.3 | README has project overview | Missing | Brief | Detailed with purpose |
| 1.4 | API documentation | Missing | Partial | Complete with examples |
| 1.5 | JSDoc/docstrings on public APIs | None | <50% coverage | >80% coverage |
| 1.6 | ARCHITECTURE.md exists | Missing | Minimal | Comprehensive C4-style |
| 1.7 | ADRs (Architecture Decision Records) | None | Some decisions | Active ADR practice |
| 1.8 | Diagrams (Mermaid/ASCII) | None | Basic | Comprehensive |
| 1.9 | CONTRIBUTING.md exists | Missing | Basic | Detailed with workflow |
| 1.10 | CHANGELOG maintained | None | Inconsistent | Follows keep-a-changelog |
| 1.11 | Code examples in docs | None | Few | Comprehensive |
| 1.12 | Error handling documented | None | Partial | Complete with codes |
| 1.13 | Environment setup docs | Missing | Basic | Complete with troubleshooting |
| 1.14 | Deployment documentation | Missing | Basic | Full runbook |
| 1.15 | Inline code comments (why, not what) | None/excessive | Some | Appropriate why-comments |

**How to check:**
- Use Glob to find documentation files: `**/*.md`, `**/docs/**`
- Read README.md, ARCHITECTURE.md, CONTRIBUTING.md
- Sample source files for docstrings/JSDoc coverage
- Check for `docs/adr/` or `adr/` directory

### Aspect 2: Architecture (Weight: 15%)

| # | Criterion | 0 Points | 5 Points | 10 Points |
|---|-----------|----------|----------|-----------|
| 2.1 | Clear module boundaries | Spaghetti | Some separation | Clean boundaries |
| 2.2 | Dependency direction | Circular deps | Some issues | Unidirectional |
| 2.3 | Layer separation | Mixed concerns | Partial | Clean layers |
| 2.4 | Single responsibility | God objects | Mixed | Focused modules |
| 2.5 | Coupling (low) | Tight coupling | Moderate | Loose coupling |
| 2.6 | Cohesion (high) | Scattered logic | Moderate | Highly cohesive |
| 2.7 | Vertical slices | Horizontal only | Mixed | Feature-based |
| 2.8 | Configuration externalized | Hardcoded | Partial | Full externalization |
| 2.9 | Error boundaries defined | None | Partial | Clear boundaries |
| 2.10 | Interface segregation | Fat interfaces | Some | Focused interfaces |
| 2.11 | Dependency injection | Hard deps | Partial | Full DI |
| 2.12 | Consistent patterns | Ad-hoc | Mostly consistent | Uniform patterns |

**How to check:**
- Analyze import/require statements for circular dependencies
- Check directory structure for separation of concerns
- Look for god files (>1000 LOC with many responsibilities)
- Review configuration handling

### Aspect 3: Testing (Weight: 12%)

| # | Criterion | 0 Points | 5 Points | 10 Points |
|---|-----------|----------|----------|-----------|
| 3.1 | Test files exist | None | Some | Comprehensive |
| 3.2 | Test coverage | <20% | 50-70% | >80% |
| 3.3 | Tests co-located with source | Separate tree only | Mixed | Co-located *.test.* |
| 3.4 | Test naming (descriptive) | Poor names | Inconsistent | Clear behavior names |
| 3.5 | Unit tests present | None | Some | Comprehensive |
| 3.6 | Integration tests present | None | Some | Key paths covered |
| 3.7 | E2E tests present | None | Basic | Critical flows covered |
| 3.8 | Test fixtures organized | None/scattered | Basic | Well-organized |
| 3.9 | Mocking approach | No mocks/over-mocking | Inconsistent | Strategic mocking |
| 3.10 | Test documentation | None | Some | Clear test purpose |
| 3.11 | CI test integration | None | Basic | Full pipeline |
| 3.12 | Test data management | Hardcoded | Partial | Factories/builders |

**How to check:**
- Glob for test files: `**/*.test.*`, `**/*.spec.*`, `**/test/**`, `**/__tests__/**`
- Check for coverage config/reports
- Sample test files for naming conventions
- Look for CI config (`.github/workflows/`, `.gitlab-ci.yml`, etc.)

### Aspect 4: Type Safety (Weight: 12%)

| # | Criterion | 0 Points | 5 Points | 10 Points |
|---|-----------|----------|----------|-----------|
| 4.1 | Static typing enabled | None | Optional | Strict mode |
| 4.2 | `any` usage | Widespread | Limited | None/justified |
| 4.3 | Null safety | Unchecked nulls | Partial | strictNullChecks |
| 4.4 | Type exports | Missing | Partial | Complete |
| 4.5 | Generic usage | None | Basic | Appropriate generics |
| 4.6 | Branded/nominal types | None | N/A | Used for IDs |
| 4.7 | Type narrowing | instanceof only | Mixed | Proper discriminants |
| 4.8 | Return types explicit | Implicit | Mixed | Explicit |
| 4.9 | Parameter types | Implicit | Mixed | All typed |
| 4.10 | Type assertions | Excessive | Minimal | Rare/justified |

**Language-specific adaptations:**
- **TypeScript:** Check tsconfig.json for strict mode, search for `any`
- **Python:** Check for type hints, mypy/pyright config
- **Go:** Inherently typed, check for interface{}/any usage
- **Rust:** Inherently typed, check for unsafe blocks
- **Ruby/JS:** Check for Sorbet/Flow, reduce weight if dynamically typed

### Aspect 5: Agent Instructions (Weight: 15%)

| # | Criterion | 0 Points | 5 Points | 10 Points |
|---|-----------|----------|----------|-----------|
| 5.1 | CLAUDE.md exists | Missing | Basic | Comprehensive |
| 5.2 | Project overview section | Missing | Brief | Clear context |
| 5.3 | Tech stack documented | Missing | Listed | Explained with versions |
| 5.4 | Code conventions section | Missing | Basic | Detailed with examples |
| 5.5 | File structure explained | Missing | Basic tree | Annotated with purposes |
| 5.6 | Common commands listed | Missing | Few | Complete with descriptions |
| 5.7 | Testing instructions | Missing | Basic | Comprehensive |
| 5.8 | NEVER rules defined | Missing | Few | Comprehensive don'ts |
| 5.9 | ALWAYS rules defined | Missing | Few | Comprehensive dos |
| 5.10 | Error handling patterns | Missing | Basic | Detailed patterns |
| 5.11 | Key abstractions explained | Missing | Some | All major abstractions |
| 5.12 | Workflow patterns | Missing | Basic | Detailed workflows |
| 5.13 | Security considerations | Missing | Basic | Comprehensive |
| 5.14 | Dependencies explained | Missing | Listed | Explained why each |
| 5.15 | Quick reference section | Missing | Basic | Complete cheatsheet |

**How to check:**
- Check for CLAUDE.md at root
- Check for .cursorrules, .github/copilot-instructions.md as alternatives
- Read and evaluate each section's quality
- Look for actionable, specific instructions vs vague guidelines

### Aspect 6: File Structure (Weight: 10%)

| # | Criterion | 0 Points | 5 Points | 10 Points |
|---|-----------|----------|----------|-----------|
| 6.1 | Lines per file (150-500 ideal) | >1000 LOC common | 500-1000 LOC | 150-500 LOC |
| 6.2 | Max nesting depth | >7 levels | 5-7 levels | ≤4 levels |
| 6.3 | Files per directory | >30 files | 15-30 files | ≤15 files |
| 6.4 | File naming consistency | Inconsistent | Mostly consistent | Uniform convention |
| 6.5 | Directory naming | Unclear | Somewhat clear | Self-documenting |
| 6.6 | Index/barrel files | None or excessive | Some | Strategic |
| 6.7 | Colocation (related files together) | Scattered | Partial | Well colocated |
| 6.8 | Config file organization | Scattered | Root only | Organized config/ |
| 6.9 | Asset organization | Mixed with code | Partial | Dedicated assets/ |
| 6.10 | Monorepo structure (if applicable) | Unclear boundaries | Basic | Clear workspaces |

**How to check:**
- Count lines in source files (sample 20+ files)
- Measure directory depth
- Count files per directory
- Analyze naming patterns

### Aspect 7: Context Optimization (Weight: 11%)

| # | Criterion | 0 Points | 5 Points | 10 Points |
|---|-----------|----------|----------|-----------|
| 7.1 | llms.txt exists | Missing | Basic | Comprehensive |
| 7.2 | llms-full.txt for deep context | Missing | N/A | Present |
| 7.3 | Chunking-friendly structure | Long functions | Mixed | Small, focused units |
| 7.4 | Self-documenting names | Cryptic | Mostly clear | Excellent naming |
| 7.5 | Why-comments (not what) | None/what-comments | Mixed | Appropriate why |
| 7.6 | Magic numbers eliminated | Common | Some | Named constants |
| 7.7 | Dead code removed | Significant | Some | Clean |
| 7.8 | Consistent formatting | Inconsistent | Mostly | Enforced (Prettier/etc) |
| 7.9 | Import organization | Random | Grouped | Sorted/grouped |
| 7.10 | Single export per file (when sensible) | Multiple mixed | Mixed | Clean exports |
| 7.11 | Context-efficient error messages | Generic | Basic | Descriptive with context |

**How to check:**
- Check for llms.txt, llms-full.txt at root
- Sample function lengths
- Review naming conventions
- Check for formatting tools (.prettierrc, .editorconfig)

### Aspect 8: Security (Weight: 10%)

| # | Criterion | 0 Points | 5 Points | 10 Points |
|---|-----------|----------|----------|-----------|
| 8.1 | .aiignore exists | Missing | Basic | Comprehensive |
| 8.2 | .gitignore covers secrets | Missing | Basic | Complete |
| 8.3 | No hardcoded secrets | Secrets found | Suspicious patterns | Clean |
| 8.4 | No PII in code | PII found | Minor issues | Clean |
| 8.5 | Environment variables for secrets | Hardcoded | Mixed | All externalized |
| 8.6 | NEVER rules for sensitive ops | None | Basic | Comprehensive |
| 8.7 | Input validation | None | Partial | Comprehensive |
| 8.8 | Output encoding | None | Partial | Proper encoding |
| 8.9 | Dependency security | Outdated/vulnerable | Some updates | Regular updates |
| 8.10 | Security documentation | None | Basic | Threat model |

**How to check:**
- Check for .aiignore, .gitignore
- Grep for common secret patterns: `API_KEY=`, `password=`, `secret=`, AWS keys
- Check for .env.example vs .env in repo
- Look for security-focused NEVER rules in CLAUDE.md

---

## Step 3: Calculate Scores

### Per-Aspect Score Calculation

```
Aspect Score = (Sum of criterion scores / Max possible) * 100
```

Example for Documentation (15 criteria):
- If scores sum to 105 out of 150 possible: (105/150) * 100 = 70/100

### Overall Score Calculation (Weighted)

```
Overall = (Doc * 0.15) + (Arch * 0.15) + (Test * 0.12) + (Type * 0.12)
        + (Agent * 0.15) + (File * 0.10) + (Context * 0.11) + (Security * 0.10)
```

### Grade Scale

| Grade | Score Range | Description |
|-------|-------------|-------------|
| A | 90-100 | Excellent - AI-ready |
| B | 75-89 | Good - Minor improvements needed |
| C | 60-74 | Moderate - Notable gaps |
| D | 45-59 | Poor - Significant work needed |
| F | 0-44 | Critical - Major overhaul required |

---

## Step 4: Display Dashboard

Output this ASCII dashboard with actual scores:

```
╔══════════════════════════════════════════════════════════════════════╗
║                       AI-READINESS REPORT                            ║
║                       Repository: {repo-name}                        ║
║                       Language: {language} | Framework: {framework}  ║
╠══════════════════════════════════════════════════════════════════════╣
║  OVERALL GRADE: {X}     SCORE: {XX}/100     {delta}                  ║
╠══════════════════════════════════════════════════════════════════════╣
║  1. Documentation       {bar} {score}/100 {delta}                    ║
║  2. Architecture        {bar} {score}/100 {delta}                    ║
║  3. Testing             {bar} {score}/100 {delta}                    ║
║  4. Type Safety         {bar} {score}/100 {delta}                    ║
║  5. Agent Instructions  {bar} {score}/100 {delta}                    ║
║  6. File Structure      {bar} {score}/100 {delta}                    ║
║  7. Context Optimization{bar} {score}/100 {delta}                    ║
║  8. Security            {bar} {score}/100 {delta}                    ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Progress Bar Generation

For a score of N out of 100:
- Filled blocks: N / 10 (rounded)
- Empty blocks: 10 - filled

```
Score 82 → ████████░░ 82/100
Score 45 → ████░░░░░░ 45/100
Score 100 → ██████████ 100/100
```

Use: █ for filled, ░ for empty

### Delta Display

- Improvement: `↑+{N}` (e.g., `↑+5`)
- Decline: `↓-{N}` (e.g., `↓-3`)
- No change: `→0`
- First run: `(new)`

---

## Step 5: Present Problems

Group problems by severity, then by aspect. List all identified issues.

### Severity Classification

**CRITICAL (Must fix - blocks AI effectiveness):**
- Missing CLAUDE.md entirely
- Missing README.md
- Files over 1000 LOC
- Hardcoded secrets found
- No .gitignore
- Circular dependencies
- No tests at all

**WARNING (Should fix - impacts AI efficiency):**
- Incomplete CLAUDE.md sections
- Files 500-1000 LOC
- Missing ARCHITECTURE.md
- Test coverage <50%
- No type safety
- Deep nesting (>5 levels)
- >20 files per directory

**INFO (Nice to fix - optimization opportunities):**
- Files 400-500 LOC
- Missing llms.txt
- Minor documentation gaps
- No llms-full.txt
- Missing CONTRIBUTING.md
- Could add more why-comments

### Output Format

```
══════════════════════════════════════════════════════════════════════
                         IDENTIFIED ISSUES
══════════════════════════════════════════════════════════════════════

🔴 CRITICAL ({count} issues)
──────────────────────────────────────────────────────────────────────
[C1] Agent Instructions: CLAUDE.md is missing
     Impact: AI agents have no project-specific guidance

[C2] File Structure: src/utils/helpers.ts has 1,247 lines
     Impact: Too large for AI context window, hard to understand

[C3] Security: Potential API key found in src/config.ts:23
     Impact: Security risk, should not be in version control

🟡 WARNING ({count} issues)
──────────────────────────────────────────────────────────────────────
[W1] Documentation: ARCHITECTURE.md is missing
     Impact: AI lacks system design context

[W2] Testing: Test coverage is 34%
     Impact: AI-generated code may introduce regressions

[W3] File Structure: src/components/ has 28 files
     Impact: Hard to navigate, consider subdirectories

🔵 INFO ({count} issues)
──────────────────────────────────────────────────────────────────────
[I1] Context Optimization: llms.txt is missing
     Impact: No optimized entry point for AI tools

[I2] Documentation: CONTRIBUTING.md is missing
     Impact: No contribution guidelines for AI to follow
```

---

## Step 6: User Survey

Present issues for user selection. Use AskUserQuestion tool with smart defaults.

### Survey Flow (By Severity)

**Critical Issues (Default: Y):**
```
Critical issues significantly impact AI effectiveness.
Recommend fixing all of these.

[C1] Create CLAUDE.md? (Y/n)
[C2] Split helpers.ts into smaller files? (Y/n)
[C3] Remove hardcoded secrets? (Y/n)
```

**Warning Issues (Default: n):**
```
Warning issues impact efficiency but aren't blocking.

[W1] Create ARCHITECTURE.md? (y/N)
[W2] Improve test coverage? (y/N)
[W3] Reorganize src/components/? (y/N)
```

**Info Issues (Default: n):**
```
Info issues are optimization opportunities.

[I1] Create llms.txt? (y/N)
[I2] Create CONTRIBUTING.md? (y/N)
```

### Implementation

Use AskUserQuestion with multiSelect for each severity level:

```
Questions:
1. "Which CRITICAL issues should we address?" (default all selected)
2. "Which WARNING issues should we address?" (default none selected)
3. "Which INFO issues should we address?" (default none selected)
```

---

## Step 7: Enter Plan Mode

After survey completion, automatically enter plan mode using EnterPlanMode tool.

State the transition clearly:
```
Based on your selections, I'll now create a phased implementation plan.
Entering plan mode...
```

---

## Step 8: Create Phased Roadmap

In plan mode, create a roadmap with three phases:

### Phase 1: Quick Wins (Immediate Impact)

Tasks that can be done quickly with high impact:
- Create CLAUDE.md from template
- Create llms.txt
- Add .aiignore
- Fix obvious security issues
- Add missing .gitignore entries

### Phase 2: Foundation (Structural Improvements)

Tasks requiring more effort:
- Split large files (>500 LOC)
- Create ARCHITECTURE.md
- Reorganize cluttered directories
- Add type safety improvements
- Establish testing patterns

### Phase 3: Advanced (Long-term Excellence)

Ongoing improvements:
- Increase test coverage to >80%
- Add comprehensive documentation
- Implement ADR practice
- Optimize for AI context windows
- Regular security audits

### Plan Format

```markdown
# AI-Readiness Improvement Plan

## Phase 1: Quick Wins
Estimated items: {N}

### 1.1 Create CLAUDE.md
- [ ] Generate from template
- [ ] Customize for this project
- [ ] Add project-specific commands
- [ ] Document key abstractions

### 1.2 Create llms.txt
- [ ] Generate index
- [ ] Include key entry points
- [ ] Add navigation hints

...

## Phase 2: Foundation
Estimated items: {N}

### 2.1 Split large files
- [ ] src/utils/helpers.ts → multiple focused modules
- [ ] src/api/handlers.ts → route-specific handlers

...

## Phase 3: Advanced
Estimated items: {N}

### 3.1 Improve test coverage
- [ ] Add unit tests for core utilities
- [ ] Add integration tests for API
- [ ] Set up coverage reporting

...
```

---

## Step 9: Generate Templates

For selected missing files, generate from these templates:

### CLAUDE.md Template

```markdown
# CLAUDE.md - AI Assistant Guide for {project-name}

## Project Overview

{Brief description of what this project does and its purpose}

## Tech Stack

- **Language:** {language} {version}
- **Framework:** {framework} {version}
- **Package Manager:** {npm/yarn/pnpm/pip/cargo/etc}
- **Key Dependencies:**
  - {dep1}: {why it's used}
  - {dep2}: {why it's used}

## Project Structure

```
{project-root}/
├── src/                    # Source code
│   ├── components/         # UI components (if applicable)
│   ├── services/           # Business logic
│   ├── utils/              # Utility functions
│   └── types/              # Type definitions
├── tests/                  # Test files
├── docs/                   # Documentation
└── config/                 # Configuration files
```

## Common Commands

```bash
# Install dependencies
{install-command}

# Run development server
{dev-command}

# Run tests
{test-command}

# Build for production
{build-command}

# Lint code
{lint-command}
```

## Code Conventions

### Naming
- Files: {kebab-case/camelCase/PascalCase}
- Functions: {camelCase/snake_case}
- Components: {PascalCase}
- Constants: {SCREAMING_SNAKE_CASE}

### Patterns
- {Pattern 1 description}
- {Pattern 2 description}

## Key Abstractions

### {Abstraction 1}
{Description of what it does and when to use it}

### {Abstraction 2}
{Description of what it does and when to use it}

## ALWAYS

- Write tests for new functionality
- Use TypeScript strict mode (if applicable)
- Handle errors explicitly
- Use meaningful variable names
- Keep functions under 50 lines
- Add JSDoc for public APIs

## NEVER

- Commit secrets or API keys
- Use `any` type without justification
- Ignore TypeScript errors
- Skip error handling
- Create files over 500 lines
- Use magic numbers without constants

## Error Handling

```{language}
// Pattern for error handling in this project
{error-handling-example}
```

## Testing

### Running Tests
```bash
{test-command}
```

### Test Structure
- Unit tests: `*.test.{ext}` co-located with source
- Integration tests: `tests/integration/`
- E2E tests: `tests/e2e/`

### Writing Tests
```{language}
// Example test pattern
{test-example}
```

## Quick Reference

| Task | Command |
|------|---------|
| Install deps | `{install}` |
| Dev server | `{dev}` |
| Run tests | `{test}` |
| Build | `{build}` |
| Lint | `{lint}` |
| Format | `{format}` |
```

### ARCHITECTURE.md Template

```markdown
# Architecture Overview

## System Context (C4 Level 1)

{Project name} is a {type of system} that {primary purpose}.

### External Systems
- **{External System 1}:** {How we interact with it}
- **{External System 2}:** {How we interact with it}

### Users
- **{User Type 1}:** {What they do with the system}
- **{User Type 2}:** {What they do with the system}

## Container Diagram (C4 Level 2)

```
┌─────────────────────────────────────────────────────────┐
│                     {System Name}                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Frontend  │  │   Backend   │  │  Database   │     │
│  │   {tech}    │──│   {tech}    │──│   {tech}    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

## Component Architecture (C4 Level 3)

### {Component 1}
- **Purpose:** {What it does}
- **Key Files:** `{path/to/files}`
- **Dependencies:** {What it depends on}

### {Component 2}
- **Purpose:** {What it does}
- **Key Files:** `{path/to/files}`
- **Dependencies:** {What it depends on}

## Data Flow

```
{User Action}
     │
     ▼
{Component 1} ──► {Component 2} ──► {Component 3}
     │                                    │
     ▼                                    ▼
{Side Effect 1}                    {Side Effect 2}
```

## Key Design Decisions

### {Decision 1}
- **Context:** {Why we needed to decide}
- **Decision:** {What we decided}
- **Consequences:** {Trade-offs and implications}

### {Decision 2}
- **Context:** {Why we needed to decide}
- **Decision:** {What we decided}
- **Consequences:** {Trade-offs and implications}

## Module Dependencies

```
{Module A}
    │
    ├──► {Module B}
    │        │
    │        └──► {Module D}
    │
    └──► {Module C}
             │
             └──► {Module D}
```

## API Boundaries

### Public API
- `{endpoint/function 1}`: {Description}
- `{endpoint/function 2}`: {Description}

### Internal APIs
- `{internal API 1}`: {Description}
- `{internal API 2}`: {Description}

## Security Architecture

### Authentication
{How authentication works}

### Authorization
{How authorization works}

### Data Protection
{How sensitive data is protected}

## Deployment Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    CDN      │────►│  Load       │────►│  App        │
│             │     │  Balancer   │     │  Servers    │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                              ▼
                                        ┌─────────────┐
                                        │  Database   │
                                        │  Cluster    │
                                        └─────────────┘
```

## Appendix: Technology Choices

| Category | Choice | Rationale |
|----------|--------|-----------|
| Language | {lang} | {why} |
| Framework | {fw} | {why} |
| Database | {db} | {why} |
| Hosting | {host} | {why} |
```

### llms.txt Template

```markdown
# {Project Name}

> {One-line description of what this project does}

## Quick Start

{Minimal steps to get the project running}

## Documentation Index

- [README](./README.md) - Project overview and setup
- [ARCHITECTURE](./ARCHITECTURE.md) - System design and structure
- [CLAUDE](./CLAUDE.md) - AI assistant guidelines
- [CONTRIBUTING](./CONTRIBUTING.md) - Contribution guidelines

## Key Entry Points

- `{main-file}` - Application entry point
- `{config-file}` - Configuration
- `{routes-file}` - API routes (if applicable)

## Directory Guide

| Directory | Purpose |
|-----------|---------|
| `src/` | Source code |
| `tests/` | Test files |
| `docs/` | Documentation |
| `config/` | Configuration |

## Core Concepts

1. **{Concept 1}:** {Brief explanation}
2. **{Concept 2}:** {Brief explanation}
3. **{Concept 3}:** {Brief explanation}

## Common Tasks

### {Task 1}
```bash
{command}
```

### {Task 2}
```bash
{command}
```

## Links

- [Documentation]({docs-url})
- [API Reference]({api-url})
- [Examples]({examples-url})
```

---

## Step 10: Save Report

After analysis, save results to `AI-READINESS-REPORT.md` in the repository root.

### Report Format

```markdown
# AI-Readiness Report

**Generated:** {YYYY-MM-DD HH:MM}
**Repository:** {repo-name}
**Language:** {language}
**Framework:** {framework}

## Overall Score

| Grade | Score | Change |
|-------|-------|--------|
| {X} | {XX}/100 | {delta} |

## Aspect Scores

| Aspect | Score | Change | Status |
|--------|-------|--------|--------|
| Documentation | {XX}/100 | {delta} | {emoji} |
| Architecture | {XX}/100 | {delta} | {emoji} |
| Testing | {XX}/100 | {delta} | {emoji} |
| Type Safety | {XX}/100 | {delta} | {emoji} |
| Agent Instructions | {XX}/100 | {delta} | {emoji} |
| File Structure | {XX}/100 | {delta} | {emoji} |
| Context Optimization | {XX}/100 | {delta} | {emoji} |
| Security | {XX}/100 | {delta} | {emoji} |

Status: ✅ Good (≥75) | ⚠️ Needs Work (45-74) | ❌ Critical (<45)

## Issues Summary

- **Critical:** {count}
- **Warning:** {count}
- **Info:** {count}

## Detailed Issues

### Critical
{list of critical issues}

### Warning
{list of warning issues}

### Info
{list of info issues}

## Recommendations

### Immediate Actions
1. {action 1}
2. {action 2}

### Short-term Improvements
1. {improvement 1}
2. {improvement 2}

### Long-term Goals
1. {goal 1}
2. {goal 2}

---

## History

| Date | Score | Grade | Notes |
|------|-------|-------|-------|
| {date} | {score} | {grade} | {summary} |

---

*Generated by ai-ready skill*
```

### Delta Tracking

When saving:
1. Check for existing `AI-READINESS-REPORT.md`
2. If exists, parse previous scores from History table
3. Calculate deltas for each aspect
4. Append new row to History table
5. Update current scores with delta indicators

---

## Benchmark Comparison

Provide context by comparing to benchmarks:

```
Industry Benchmarks (AI-Ready Repositories):
──────────────────────────────────────────────
Documentation:       75/100 (You: {XX} {comparison})
Architecture:        70/100 (You: {XX} {comparison})
Testing:             65/100 (You: {XX} {comparison})
Type Safety:         70/100 (You: {XX} {comparison})
Agent Instructions:  60/100 (You: {XX} {comparison})
File Structure:      75/100 (You: {XX} {comparison})
Context Optimization:55/100 (You: {XX} {comparison})
Security:            80/100 (You: {XX} {comparison})

Comparison: ✅ Above | ⚠️ Below | ≈ Similar
```

---

## Quick Fix Suggestions

For common issues, provide inline quick fixes:

```
💡 Quick Fixes Available:

[C1] Missing CLAUDE.md
     → Run: I can generate a customized CLAUDE.md template now

[W1] Files over 500 LOC
     → src/utils/helpers.ts: Consider splitting into:
       - stringHelpers.ts (lines 1-150)
       - dateHelpers.ts (lines 151-300)
       - validationHelpers.ts (lines 301-450)

[I1] Missing llms.txt
     → Run: I can generate llms.txt from your current structure
```

---

## Error Handling

If analysis cannot complete:

1. **Permission errors:** Report which files couldn't be accessed
2. **Binary files:** Skip with notice
3. **Encoding issues:** Note and continue
4. **Missing directories:** Report as part of File Structure issues

Always provide partial results when possible rather than failing completely.

---

## Notes

- This skill is language-agnostic but adapts type safety checks per language
- Focus is on Claude Code but principles apply to other AI tools
- All criteria have clear scoring rubrics for consistency
- Templates should be customized after generation
- Run periodically to track improvement over time
