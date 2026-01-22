#!/usr/bin/env node

import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, unlinkSync, rmdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SKILL_NAME = 'ai-ready';
const SKILL_FILES = [
  'SKILL.md',
  'examples/AI-READINESS-REPORT-EXAMPLE.md'
];

function printHelp() {
  console.log(`
ai-ready-skill - Install AI-Readiness skill for Claude Code

Usage:
  npx ai-ready-skill [command]

Commands:
  install        Install skill to .claude/skills/ai-ready/ (default)
  check          Check if skill is already installed
  update         Update existing skill files
  remove         Remove skill from project

Examples:
  npx ai-ready-skill
  npx ai-ready-skill install
  npx ai-ready-skill check
  npx ai-ready-skill update
  npx ai-ready-skill remove

After installation, use in Claude Code:
  /ai-ready              Analyze current directory
  /ai-ready /path/to/repo   Analyze specific repository
`);
}

function getTargetDir() {
  return join(process.cwd(), '.claude', 'skills', SKILL_NAME);
}

function getSourceDir() {
  return join(__dirname, '..', 'skills', SKILL_NAME);
}

function checkInstalled() {
  const targetDir = getTargetDir();
  const skillFile = join(targetDir, 'SKILL.md');
  return existsSync(skillFile);
}

function install(force = false) {
  const targetDir = getTargetDir();
  const sourceDir = getSourceDir();

  if (checkInstalled() && !force) {
    console.log('Skill already installed. Use "update" to overwrite.');
    return false;
  }

  console.log('Installing ai-ready skill...\n');

  // Create directories
  mkdirSync(targetDir, { recursive: true });

  // Copy files
  for (const file of SKILL_FILES) {
    const sourcePath = join(sourceDir, file);
    const targetPath = join(targetDir, file);

    if (!existsSync(sourcePath)) {
      console.error(`  Source file not found: ${sourcePath}`);
      continue;
    }

    // Create subdirectory if needed
    const targetSubdir = dirname(targetPath);
    if (!existsSync(targetSubdir)) {
      mkdirSync(targetSubdir, { recursive: true });
    }

    copyFileSync(sourcePath, targetPath);
    console.log(`  Copied ${file}`);
  }

  // Update index.md if exists
  updateIndex();

  console.log(`
Skill installed to .claude/skills/${SKILL_NAME}/

Usage in Claude Code:
  /ai-ready              Analyze current directory
  /ai-ready /path/to/repo   Analyze specific repository

Features:
  - 8 aspect analysis (Documentation, Architecture, Testing, etc.)
  - 95 sub-criteria with scoring
  - ASCII dashboard with progress bars
  - A-F grading system
  - Severity classification (Critical/Warning/Info)
  - Phased roadmap generation
  - Template generation (CLAUDE.md, ARCHITECTURE.md, llms.txt)
`);
  return true;
}

function updateIndex() {
  const indexPath = join(process.cwd(), '.claude', 'skills', 'index.md');

  if (!existsSync(indexPath)) {
    // Create new index.md
    const content = `# Skills Index

- [ai-ready](#ai-ready) — [SKILL.md](./ai-ready/SKILL.md)

## ai-ready

Analyze repository AI-readiness. Scores 8 aspects (documentation, architecture, testing, type safety, agent instructions, file structure, context optimization, security) from 1-100. Provides A-F grade, identifies issues by severity, creates improvement roadmap.

Skill file: [./ai-ready/SKILL.md](./ai-ready/SKILL.md)
`;
    mkdirSync(dirname(indexPath), { recursive: true });
    writeFileSync(indexPath, content);
    console.log('  Created index.md');
    return;
  }

  // Check if already in index
  const content = readFileSync(indexPath, 'utf-8');
  if (content.includes('ai-ready')) {
    return; // Already indexed
  }

  // Add to existing index
  const indexEntry = `- [ai-ready](#ai-ready) — [SKILL.md](./ai-ready/SKILL.md)`;
  const sectionEntry = `
## ai-ready

Analyze repository AI-readiness. Scores 8 aspects (documentation, architecture, testing, type safety, agent instructions, file structure, context optimization, security) from 1-100. Provides A-F grade, identifies issues by severity, creates improvement roadmap.

Skill file: [./ai-ready/SKILL.md](./ai-ready/SKILL.md)
`;

  // Find Skills Index header and add entry
  let newContent = content;

  // Add to list if there's a list pattern
  const listMatch = content.match(/^- \[.+\].+$/m);
  if (listMatch) {
    const insertPos = content.indexOf(listMatch[0]) + listMatch[0].length;
    newContent = content.slice(0, insertPos) + '\n' + indexEntry + content.slice(insertPos);
  }

  // Add section at the end
  newContent = newContent.trimEnd() + '\n' + sectionEntry;

  writeFileSync(indexPath, newContent);
  console.log('  Updated index.md');
}

function remove() {
  const targetDir = getTargetDir();

  if (!checkInstalled()) {
    console.log('Skill not installed.');
    return false;
  }

  console.log('Removing ai-ready skill...\n');

  // Remove files
  for (const file of SKILL_FILES) {
    const targetPath = join(targetDir, file);
    if (existsSync(targetPath)) {
      unlinkSync(targetPath);
      console.log(`  Removed ${file}`);
    }
  }

  // Remove subdirectories
  for (const subdir of ['examples']) {
    const subdirPath = join(targetDir, subdir);
    try {
      if (existsSync(subdirPath)) {
        rmdirSync(subdirPath);
        console.log(`  Removed ${subdir}/ directory`);
      }
    } catch {
      // Directory not empty or other error
    }
  }

  // Try to remove main directory if empty
  try {
    rmdirSync(targetDir);
    console.log(`  Removed ${SKILL_NAME}/ directory`);
  } catch {
    // Directory not empty or other error
  }

  console.log('\nSkill removed.');
  return true;
}

// Main
const args = process.argv.slice(2);
const command = args[0] || 'install';

switch (command) {
  case 'install':
    install();
    break;
  case 'check':
    if (checkInstalled()) {
      console.log('ai-ready skill is installed.');
      process.exit(0);
    } else {
      console.log('ai-ready skill is not installed.');
      process.exit(1);
    }
    break;
  case 'update':
    install(true);
    break;
  case 'remove':
    remove();
    break;
  case '-h':
  case '--help':
  case 'help':
    printHelp();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    printHelp();
    process.exit(1);
}
