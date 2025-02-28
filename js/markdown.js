/**
 * Simple Markdown parser
 * Converts markdown to HTML for blog posts
 */
class MarkdownParser {
    constructor() {
        // Regular expressions for parsing
        this.rules = {
            // Headers
            h1: /^# (.*$)/gm,
            h2: /^## (.*$)/gm,
            h3: /^### (.*$)/gm,
            h4: /^#### (.*$)/gm,
            h5: /^##### (.*$)/gm,
            h6: /^###### (.*$)/gm,

            // Bold, italic, and combined
            bold: /\*\*(.*?)\*\*/g,
            italic: /\*(.*?)\*/g,
            bolditalic: /\*\*\*(.*?)\*\*\*/g,

            // Links and images
            link: /\[([^\[]+)\]\(([^\)]+)\)/g,
            image: /!\[([^\[]+)\]\(([^\)]+)\)/g,

            // Lists
            unorderedList: /^\s*[\*\-\+]\s+(.*$)/gm,
            orderedList: /^\s*\d+\.\s+(.*$)/gm,

            // Code blocks and inline code
            codeBlock: /```([\s\S]*?)```/g,
            inlineCode: /`([^`]+)`/g,

            // Blockquotes
            blockquote: /^\> (.*$)/gm,

            // Horizontal rule
            hr: /^(?:[-*_]\s*){3,}$/gm,

            // Paragraphs (this should be last)
            paragraph: /^([^\n]+)(?:\n|$)/gm
        };
    }

    // Convert markdown to HTML
    parse(markdown) {
        if (!markdown) return '';
        
        // Preserve linebreaks for processing
        let html = markdown.replace(/\r\n|\r|\n/g, '\n');
        
        // Process code blocks first to prevent other formatting inside them
        html = this._processCodeBlocks(html);
        
        // Process headings
        html = html.replace(this.rules.h1, '<h1>$1</h1>');
        html = html.replace(this.rules.h2, '<h2>$1</h2>');
        html = html.replace(this.rules.h3, '<h3>$1</h3>');
        html = html.replace(this.rules.h4, '<h4>$1</h4>');
        html = html.replace(this.rules.h5, '<h5>$1</h5>');
        html = html.replace(this.rules.h6, '<h6>$1</h6>');
        
        // Process bold, italic, and combined
        html = html.replace(this.rules.bolditalic, '<strong><em>$1</em></strong>');
        html = html.replace(this.rules.bold, '<strong>$1</strong>');
        html = html.replace(this.rules.italic, '<em>$1</em>');
        
        // Process links and images
        html = html.replace(this.rules.image, '<img src="$2" alt="$1" class="blog-post-image">');
        html = html.replace(this.rules.link, '<a href="$2" target="_blank" rel="noopener">$1</a>');
        
        // Process lists
        html = this._processLists(html);
        
        // Process blockquotes
        html = this._processBlockquotes(html);
        
        // Process horizontal rules
        html = html.replace(this.rules.hr, '<hr>');
        
        // Process inline code
        html = html.replace(this.rules.inlineCode, '<code>$1</code>');
        
        // Process paragraphs (must be last to avoid interfering with other elements)
        html = this._processParagraphs(html);
        
        return html;
    }
    
    // Helper method to process code blocks
    _processCodeBlocks(text) {
        let processedText = text;
        let codeMatches = [];
        let match;
        
        // Find all code blocks and replace with placeholders
        while ((match = this.rules.codeBlock.exec(text)) !== null) {
            const id = `CODE_BLOCK_${codeMatches.length}`;
            codeMatches.push({
                id,
                content: match[1]
            });
            
            // Replace code block with placeholder
            processedText = processedText.replace(match[0], id);
        }
        
        // Now restore code blocks with proper HTML
        codeMatches.forEach(code => {
            const htmlCode = `<pre><code>${this._escapeHtml(code.content.trim())}</code></pre>`;
            processedText = processedText.replace(code.id, htmlCode);
        });
        
        return processedText;
    }
    
    // Helper method to escape HTML in code blocks
    _escapeHtml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
    
    // Helper method to process blockquotes
    _processBlockquotes(text) {
        let lines = text.split('\n');
        let inBlockquote = false;
        let blockquoteContent = [];
        
        for (let i = 0; i < lines.length; i++) {
            const match = this.rules.blockquote.exec(lines[i]);
            
            if (match) {
                if (!inBlockquote) {
                    inBlockquote = true;
                    blockquoteContent = [];
                }
                blockquoteContent.push(match[1]);
                lines[i] = '';  // Remove the line as we'll replace it later
            } else if (inBlockquote) {
                // End of blockquote
                lines[i-1] = `<blockquote>${blockquoteContent.join('<br>')}</blockquote>`;
                inBlockquote = false;
            }
        }
        
        // If the document ends with a blockquote
        if (inBlockquote) {
            lines.push(`<blockquote>${blockquoteContent.join('<br>')}</blockquote>`);
        }
        
        return lines.join('\n');
    }
    
    // Helper method to process lists
    _processLists(text) {
        let lines = text.split('\n');
        let inList = false;
        let listType = '';
        let listContent = [];
        
        for (let i = 0; i < lines.length; i++) {
            const unorderedMatch = this.rules.unorderedList.exec(lines[i]);
            const orderedMatch = this.rules.orderedList.exec(lines[i]);
            
            if (unorderedMatch) {
                if (!inList || listType !== 'ul') {
                    // Start new unordered list
                    if (inList) {
                        // Close previous list
                        lines[i-1] += `</${listType}>`;
                    }
                    inList = true;
                    listType = 'ul';
                    listContent = [];
                    lines[i] = '<ul>';
                }
                
                listContent.push(`<li>${unorderedMatch[1]}</li>`);
                
                // Add the list item
                if (i === lines.length - 1 || !this.rules.unorderedList.test(lines[i+1])) {
                    // End of list
                    lines[i] += `${listContent.join('')}</ul>`;
                    inList = false;
                } else {
                    lines[i] += listContent.join('');
                    listContent = [];
                }
            } else if (orderedMatch) {
                if (!inList || listType !== 'ol') {
                    // Start new ordered list
                    if (inList) {
                        // Close previous list
                        lines[i-1] += `</${listType}>`;
                    }
                    inList = true;
                    listType = 'ol';
                    listContent = [];
                    lines[i] = '<ol>';
                }
                
                listContent.push(`<li>${orderedMatch[1]}</li>`);
                
                // Add the list item
                if (i === lines.length - 1 || !this.rules.orderedList.test(lines[i+1])) {
                    // End of list
                    lines[i] += `${listContent.join('')}</ol>`;
                    inList = false;
                } else {
                    lines[i] += listContent.join('');
                    listContent = [];
                }
            } else if (inList) {
                // End of list
                lines[i-1] += `</${listType}>`;
                inList = false;
            }
        }
        
        return lines.join('\n');
    }
    
    // Helper method to process paragraphs
    _processParagraphs(text) {
        const processedLines = [];
        const lines = text.split('\n');
        
        let skipNext = false;
        
        for (let i = 0; i < lines.length; i++) {
            if (skipNext) {
                skipNext = false;
                continue;
            }
            
            const line = lines[i].trim();
            
            // Skip empty lines
            if (!line) {
                processedLines.push('');
                continue;
            }
            
            // Skip lines that are already wrapped in HTML tags
            if (line.match(/^<\w+[^>]*>.*<\/\w+>$/) || 
                line.match(/^<\w+[^>]*\/>$/) || 
                line.match(/^<\w+[^>]*>$/) && lines[i+1] && lines[i+1].match(/^<\/\w+>$/)) {
                processedLines.push(line);
                if (lines[i+1] && lines[i+1].match(/^<\/\w+>$/)) {
                    skipNext = true;
                    processedLines.push(lines[i+1]);
                }
                continue;
            }
            
            // Otherwise, wrap in paragraph tags
            processedLines.push(`<p>${line}</p>`);
        }
        
        return processedLines.join('\n');
    }
}

// Export the parser
const markdownParser = new MarkdownParser();