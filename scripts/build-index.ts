import * as fs from 'fs';
import * as path from 'path';

// Define the shape of our documentation index
interface DocEntry {
  path: string;
  title: string;
  content: string;
}

const docsDir = path.join(process.cwd(), 'docs');
const rootDocs = ['CLAUDE.md', 'AGENTS.md'];
const outputIndex = path.join(docsDir, 'index.json');

function walkDir(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      if (file !== 'coursework' && file !== 'node_modules') { // Ignore non-canonical directories
        walkDir(path.join(dir, file), fileList);
      }
    } else if (file.endsWith('.md')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

function processDocument(absolutePath: string): DocEntry | null {
  try {
    const content = fs.readFileSync(absolutePath, 'utf8');
    const relativePath = path.relative(process.cwd(), absolutePath);
    
    // Extract title (first # heading)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : path.basename(absolutePath);

    return {
      path: relativePath,
      title,
      // Strip out huge code blocks to keep the index light, but keep text
      content: content.replace(/```[\s\S]*?```/g, '').replace(/[^\w\s]/gi, ' ').replace(/\s+/g, ' ').trim()
    };
  } catch (err) {
    console.error(`Failed to process ${absolutePath}`, err);
    return null;
  }
}

function buildIndex() {
  console.log('Building documentation index...');
  const allMdFiles = walkDir(docsDir);
  
  // Add root canonical docs
  for (const rootDoc of rootDocs) {
    const docPath = path.join(process.cwd(), rootDoc);
    if (fs.existsSync(docPath)) {
      allMdFiles.push(docPath);
    }
  }

  const index: DocEntry[] = [];

  for (const file of allMdFiles) {
    const entry = processDocument(file);
    if (entry) {
      index.push(entry);
    }
  }

  // Write to index.json
  const outputData = {
    generatedAt: new Date().toISOString(),
    totalDocs: index.length,
    documents: index
  };

  fs.writeFileSync(outputIndex, JSON.stringify(outputData, null, 2), 'utf8');
  console.log(`✅ Index built successfully! Indexed ${index.length} documents.`);
  console.log(`Saved to ${outputIndex}`);
}

buildIndex();
