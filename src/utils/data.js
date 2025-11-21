import fs from 'fs';
import path from 'path';

// 용어집 가져오기
export function getGlossaryList() {
  try {
    // 서버 사이드에서만 실행되므로 fs 사용 가능
    const filePath = path.join(process.cwd(), 'data', 'glossary.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading glossary.json:', error);
    return [];
  }
}

