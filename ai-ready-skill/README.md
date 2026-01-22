# ai-ready

A Claude Code skill for analyzing repository AI-readiness.

Scores 8 key aspects from 1-100 with ASCII progress bars, highlights problems by severity, and creates a phased refactoring roadmap.

```
╔══════════════════════════════════════════════════════════════════════╗
║                       AI-READINESS REPORT                            ║
║                       Repository: my-project                         ║
╠══════════════════════════════════════════════════════════════════════╣
║  OVERALL GRADE: B     SCORE: 76/100     ↑+12 from last run          ║
╠══════════════════════════════════════════════════════════════════════╣
║  1. Documentation       ████████░░ 82/100 ↑+5                        ║
║  2. Architecture        ███████░░░ 71/100 →0                         ║
║  3. Testing             ██████░░░░ 65/100 ↑+8                        ║
║  4. Type Safety         ████████░░ 84/100 ↑+2                        ║
║  5. Agent Instructions  █████░░░░░ 52/100 ↑+15                       ║
║  6. File Structure      ████████░░ 78/100 →0                         ║
║  7. Context Optimization██████░░░░ 63/100 ↑+3                        ║
║  8. Security            █████████░ 91/100 →0                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

## Features

- **8 Aspect Analysis** - Documentation, Architecture, Testing, Type Safety, Agent Instructions, File Structure, Context Optimization, Security
- **95 Sub-criteria** - Deep analysis with 10-15 checks per aspect
- **ASCII Dashboard** - Visual progress bars and overall A-F grade
- **Severity Classification** - Critical / Warning / Info issue grouping
- **Interactive Survey** - Choose which issues to address
- **Phased Roadmap** - Quick Wins → Foundation → Advanced
- **Template Generation** - CLAUDE.md, ARCHITECTURE.md, llms.txt
- **Progress Tracking** - Delta comparison between runs (↑+5, ↓-3)
- **Language Agnostic** - Works with any programming language

## Installation

### Option 1: Add to Claude Code settings

```bash
claude config add skills /path/to/ai-ready-skill
```

### Option 2: Clone and add

```bash
git clone https://github.com/yourusername/ai-ready-skill.git
claude config add skills ./ai-ready-skill
```

## Usage

```bash
# Analyze current directory
/ai-ready

# Analyze specific repository
/ai-ready /path/to/repo
```

## Workflow

1. **Discovery** - Detects language, framework, existing files
2. **Analysis** - Evaluates all 8 aspects with sub-criteria
3. **Scoring** - Calculates weighted scores and overall grade
4. **Dashboard** - Displays ASCII progress bars
5. **Problems** - Lists issues grouped by severity
6. **Survey** - Asks which issues to fix (Critical=Y, others=N)
7. **Plan Mode** - Creates phased implementation roadmap
8. **Templates** - Generates missing files from templates
9. **Report** - Saves AI-READINESS-REPORT.md with history

## Aspects & Weights

| Aspect | Weight | Key Checks |
|--------|--------|------------|
| Documentation | 15% | README, JSDoc, ADRs, ARCHITECTURE.md |
| Architecture | 15% | Modularity, boundaries, coupling, cohesion |
| Testing | 12% | Coverage, co-location, naming, CI integration |
| Type Safety | 12% | Strict mode, any usage, null safety |
| Agent Instructions | 15% | CLAUDE.md completeness and quality |
| File Structure | 10% | 150-500 LOC, nesting ≤5, files per dir ≤15 |
| Context Optimization | 11% | llms.txt, chunking-friendly, why-comments |
| Security | 10% | .aiignore, secrets, PII, NEVER rules |

## Grade Scale

| Grade | Score | Description |
|-------|-------|-------------|
| A | 90-100 | Excellent - AI-ready |
| B | 75-89 | Good - Minor improvements needed |
| C | 60-74 | Moderate - Notable gaps |
| D | 45-59 | Poor - Significant work needed |
| F | 0-44 | Critical - Major overhaul required |

## Severity Levels

**Critical** (blocks AI effectiveness)
- Missing CLAUDE.md
- Missing README.md
- Files over 1000 LOC
- Hardcoded secrets

**Warning** (impacts efficiency)
- Files 500-1000 LOC
- Missing ARCHITECTURE.md
- Test coverage <50%
- Deep nesting (>5 levels)

**Info** (optimization opportunities)
- Files 400-500 LOC
- Missing llms.txt
- Minor documentation gaps

## Generated Templates

The skill can generate these files:

- **CLAUDE.md** - AI assistant guide with project context, commands, conventions, ALWAYS/NEVER rules
- **ARCHITECTURE.md** - C4-style documentation with diagrams and design decisions
- **llms.txt** - LLM-optimized project index for quick context loading

## Output Files

After running, the skill creates:

```
your-repo/
└── AI-READINESS-REPORT.md    # Full report with history tracking
```

## Example Output

### Problem List

```
🔴 CRITICAL (2 issues)
──────────────────────────────────────────────────────────────────────
[C1] Agent Instructions: CLAUDE.md is missing
     Impact: AI agents have no project-specific guidance

[C2] File Structure: src/utils/helpers.ts has 1,247 lines
     Impact: Too large for AI context window

🟡 WARNING (3 issues)
──────────────────────────────────────────────────────────────────────
[W1] Documentation: ARCHITECTURE.md is missing
     Impact: AI lacks system design context
...
```

### Phased Roadmap

```markdown
## Phase 1: Quick Wins
- Create CLAUDE.md from template
- Create llms.txt
- Add .aiignore

## Phase 2: Foundation
- Split large files (>500 LOC)
- Create ARCHITECTURE.md
- Improve test coverage

## Phase 3: Advanced
- Increase coverage to >80%
- Implement ADR practice
- Regular security audits
```

## Requirements

- [Claude Code](https://claude.ai/claude-code) CLI installed
- Any repository to analyze

## License

MIT License - see [LICENSE](LICENSE)

## Contributing

Contributions welcome! Please read the skill file and submit PRs for:

- Additional language-specific checks
- New sub-criteria
- Template improvements
- Bug fixes

## Related

- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [CLAUDE.md Best Practices](https://docs.anthropic.com/claude-code/claude-md)
- [llms.txt Specification](https://llmstxt.org/)
