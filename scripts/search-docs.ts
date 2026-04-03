import * as fs from 'fs';
import * as path from 'path';

interface DocEntry {
  path: string;
  title: string;
  content: string;
}

interface IndexData {
  generatedAt: string;
  totalDocs: number;
  documents: DocEntry[];
}

function processText(text: string): string[] {
  // Lowercase, remove punctuation, split into tokens, filter short words
  return text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);
}

// Compute TF (Term Frequency)
function computeTF(tokens: string[]): Record<string, number> {
  const tf: Record<string, number> = {};
  for (const token of tokens) {
    tf[token] = (tf[token] || 0) + 1;
  }
  const maxFreq = Math.max(...Object.values(tf), 1);
  for (const token in tf) {
    tf[token] = 0.5 + 0.5 * (tf[token] / maxFreq); // Augmented TF
  }
  return tf;
}

// Compute IDF (Inverse Document Frequency)
function computeIDF(docsTokens: string[][]): Record<string, number> {
  const idf: Record<string, number> = {};
  const N = docsTokens.length;
  
  for (const tokens of docsTokens) {
    const uniqueTokens = new Set(tokens);
    for (const token of uniqueTokens) {
      idf[token] = (idf[token] || 0) + 1;
    }
  }
  
  for (const token in idf) {
    idf[token] = Math.log(N / (1 + idf[token])); // Using smoothed IDF
  }
  return idf;
}

// Calculate Cosine Similarity
function cosineSimilarity(vec1: Record<string, number>, vec2: Record<string, number>): number {
  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;
  
  for (const token in vec1) {
    dotProduct += vec1[token] * (vec2[token] || 0);
    norm1 += vec1[token] * vec1[token];
  }
  
  for (const token in vec2) {
    norm2 += vec2[token] * vec2[token];
  }
  
  if (norm1 === 0 || norm2 === 0) return 0;
  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
}

function searchDocs(query: string) {
  const indexPath = path.join(process.cwd(), 'docs', 'index.json');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ Error: index.json not found. Run "npm run docs:index" first.');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(indexPath, 'utf8')) as IndexData;
  const docs = data.documents;

  // Process all docs
  const docsTokens = docs.map(doc => processText(doc.title + ' ' + doc.content));
  const idf = computeIDF(docsTokens);

  // Compute TF-IDF for all docs
  const docsTfIdf = docsTokens.map(tokens => {
    const tf = computeTF(tokens);
    const tfidf: Record<string, number> = {};
    for (const token in tf) {
      tfidf[token] = tf[token] * (idf[token] || 0);
    }
    return tfidf;
  });

  // Process query
  const queryTokens = processText(query);
  if (queryTokens.length === 0) {
    console.log('⚠️  Please provide a meaningful search query.');
    return;
  }
  const queryTf = computeTF(queryTokens);
  const queryTfIdf: Record<string, number> = {};
  for (const token in queryTf) {
    // If token not in docs, assign a default high IDF assuming it's rare
    queryTfIdf[token] = queryTf[token] * (idf[token] || Math.log(docs.length + 1)); 
  }

  // Calculate similarities
  const results = docs.map((doc, index) => {
    return {
      doc,
      score: cosineSimilarity(queryTfIdf, docsTfIdf[index])
    };
  });

  // Sort and filter results
  results.sort((a, b) => b.score - a.score);
  const topResults = results.filter(r => r.score > 0.05).slice(0, 5);

  console.log(`\n🔍 Semantic Search Results for: "\x1b[35m${query}\x1b[0m"\n`);
  
  if (topResults.length === 0) {
    console.log('No relevant documents found.');
    return;
  }

  topResults.forEach((res, i) => {
    console.log(`${i + 1}. \x1b[36m${res.doc.title}\x1b[0m (Similarity: ${(res.score*100).toFixed(1)}%)`);
    console.log(`   📂 Path: \x1b[33m${res.doc.path}\x1b[0m`);
    
    // Attempt to extract snippet
    let snippet = '';
    const contentLower = res.doc.content.toLowerCase();
    const queryTerm = queryTokens[0];
    const matchIdx = contentLower.indexOf(queryTerm);
    
    if (matchIdx !== -1) {
      const start = Math.max(0, matchIdx - 50);
      const end = Math.min(res.doc.content.length, matchIdx + 150);
      snippet = res.doc.content.substring(start, end).replace(/\n/g, ' ') + '...';
    } else {
      snippet = res.doc.content.substring(0, 150).replace(/\n/g, ' ') + '...';
    }
    console.log(`   📝 "${snippet}"\n`);
  });
}

const queryArg = process.argv.slice(2).join(' ');
if (!queryArg) {
  console.log('Usage: npm run docs:search "<query>"');
  process.exit(0);
}

searchDocs(queryArg);
