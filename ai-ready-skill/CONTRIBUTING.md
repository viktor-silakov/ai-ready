# Contributing to ai-ready

Thank you for your interest in contributing to the ai-ready skill!

## How to Contribute

### Reporting Issues

- Check existing issues before creating a new one
- Include steps to reproduce the problem
- Provide example repository if possible

### Suggesting Enhancements

- Open an issue with the `enhancement` label
- Describe the use case and expected behavior
- Explain why this would be useful

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes to `SKILL.md`
4. Test with `/ai-ready` on various repositories
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Areas for Contribution

### New Sub-criteria

Add checks for specific patterns or issues:

```markdown
| # | Criterion | 0 Points | 5 Points | 10 Points |
|---|-----------|----------|----------|-----------|
| X.Y | New check | Bad | Medium | Good |
```

### Language-Specific Checks

Enhance type safety or other aspects for specific languages:

- Python: mypy, pyright, type hints
- Go: interface{} usage, error handling
- Rust: unsafe blocks, clippy lints
- Java: null annotations, generics

### Template Improvements

Improve the generated templates:

- More comprehensive CLAUDE.md sections
- Better ARCHITECTURE.md diagrams
- Enhanced llms.txt structure

### Benchmark Data

Help establish better benchmarks:

- Analyze open-source repositories
- Collect anonymized scores
- Suggest benchmark adjustments

## Code Style

### SKILL.md Structure

- Use consistent heading levels
- Include clear scoring rubrics
- Provide "How to check" guidance
- Keep examples concise

### Markdown Guidelines

- Use tables for criteria lists
- Use code blocks for examples
- Keep lines under 100 characters
- Use consistent formatting

## Testing Your Changes

Before submitting:

1. Run `/ai-ready` on a TypeScript project
2. Run `/ai-ready` on a Python project
3. Run `/ai-ready` on a project with missing files
4. Verify dashboard displays correctly
5. Check survey flow works
6. Confirm templates generate properly

## Questions?

Open an issue with the `question` label.
