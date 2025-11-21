// 간단한 마크다운 파서
export function parseMarkdown(content) {
  let html = content.trim();

  // 코드 블록 먼저 처리 (다른 변환에 영향받지 않도록)
  const codeBlocks = [];
  html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push(`<pre><code>${code.trim()}</code></pre>`);
    return placeholder;
  });

  // 인라인 코드
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // 헤더 변환 (순서 중요: h3 -> h2 -> h1)
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // 볼드
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // 이탤릭 (볼드 이후에 처리, 단일 *만)
  html = html.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');

  // 순서 있는 리스트
  const lines = html.split('\n');
  const processed = [];
  let inOrderedList = false;
  let inUnorderedList = false;
  let currentParagraph = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // 헤더나 코드 블록 플레이스홀더
    if (trimmed.match(/^<h[1-3]>/) || trimmed.includes('__CODE_BLOCK_')) {
      if (currentParagraph.length > 0) {
        processed.push('<p>' + currentParagraph.join(' ') + '</p>');
        currentParagraph = [];
      }
      if (inOrderedList) {
        processed.push('</ol>');
        inOrderedList = false;
      }
      if (inUnorderedList) {
        processed.push('</ul>');
        inUnorderedList = false;
      }
      processed.push(trimmed);
      continue;
    }

    // 순서 있는 리스트
    if (trimmed.match(/^\d+\.\s/)) {
      if (currentParagraph.length > 0) {
        processed.push('<p>' + currentParagraph.join(' ') + '</p>');
        currentParagraph = [];
      }
      if (!inOrderedList) {
        if (inUnorderedList) {
          processed.push('</ul>');
          inUnorderedList = false;
        }
        processed.push('<ol>');
        inOrderedList = true;
      }
      const text = trimmed.replace(/^\d+\.\s/, '');
      processed.push('<li>' + text + '</li>');
      continue;
    }

    // 순서 없는 리스트
    if (trimmed.match(/^-\s/)) {
      if (currentParagraph.length > 0) {
        processed.push('<p>' + currentParagraph.join(' ') + '</p>');
        currentParagraph = [];
      }
      if (!inUnorderedList) {
        if (inOrderedList) {
          processed.push('</ol>');
          inOrderedList = false;
        }
        processed.push('<ul>');
        inUnorderedList = true;
      }
      const text = trimmed.replace(/^-\s/, '');
      processed.push('<li>' + text + '</li>');
      continue;
    }

    // 빈 줄
    if (trimmed === '') {
      if (currentParagraph.length > 0) {
        processed.push('<p>' + currentParagraph.join(' ') + '</p>');
        currentParagraph = [];
      }
      if (inOrderedList) {
        processed.push('</ol>');
        inOrderedList = false;
      }
      if (inUnorderedList) {
        processed.push('</ul>');
        inUnorderedList = false;
      }
      continue;
    }

    // 일반 텍스트
    if (inOrderedList) {
      processed.push('</ol>');
      inOrderedList = false;
    }
    if (inUnorderedList) {
      processed.push('</ul>');
      inUnorderedList = false;
    }
    currentParagraph.push(trimmed);
  }

  // 마지막 처리
  if (currentParagraph.length > 0) {
    processed.push('<p>' + currentParagraph.join(' ') + '</p>');
  }
  if (inOrderedList) {
    processed.push('</ol>');
  }
  if (inUnorderedList) {
    processed.push('</ul>');
  }

  html = processed.join('\n');

  // 코드 블록 복원
  codeBlocks.forEach((block, index) => {
    html = html.replace(`__CODE_BLOCK_${index}__`, block);
  });

  // 빈 단락 제거
  html = html.replace(/<p>\s*<\/p>/g, '');

  return html;
}

