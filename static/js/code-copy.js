/**
 * Enhanced Code Block Copy Functionality
 * Adds copy buttons to all code blocks with improved UX
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add copy buttons to all code blocks
    addCopyButtons();
    
    // Add language labels to code blocks
    addLanguageLabels();
});

function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('.highlight');
    
    codeBlocks.forEach((block, index) => {
        // Skip if copy button already exists
        if (block.querySelector('.code-copy-btn')) return;
        
        const pre = block.querySelector('pre');
        if (!pre) return;
        
        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'code-copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
        copyBtn.setAttribute('title', 'Copy code to clipboard');
        
        // Add click handler
        copyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            copyCodeToClipboard(pre, copyBtn);
        });
        
        // Add button to code block
        block.appendChild(copyBtn);
    });
}

function addLanguageLabels() {
    const codeBlocks = document.querySelectorAll('.highlight');
    
    codeBlocks.forEach(block => {
        // Try to detect language from class names
        const classList = Array.from(block.classList);
        let language = '';
        
        // Look for language-specific classes
        for (const cls of classList) {
            if (cls.startsWith('language-')) {
                language = cls.replace('language-', '');
                break;
            }
        }
        
        // Fallback: check pre element classes
        if (!language) {
            const pre = block.querySelector('pre');
            if (pre) {
                const preClassList = Array.from(pre.classList);
                for (const cls of preClassList) {
                    if (cls.startsWith('language-')) {
                        language = cls.replace('language-', '');
                        break;
                    }
                }
            }
        }
        
        // Fallback: check chroma classes
        if (!language) {
            const chromaElement = block.querySelector('[class*="chroma"]');
            if (chromaElement) {
                const chromaClasses = Array.from(chromaElement.classList);
                for (const cls of chromaClasses) {
                    if (cls !== 'chroma' && cls !== 'highlight') {
                        language = cls;
                        break;
                    }
                }
            }
        }
        
        // Set language label, default to 'code' if not found
        if (!language) {
            language = 'code';
        }
        
        // Format language name
        language = formatLanguageName(language);
        
        // Set the data attribute for CSS ::before content
        block.setAttribute('data-lang', language);
    });
}

function formatLanguageName(lang) {
    const languageMap = {
        'js': 'JavaScript',
        'javascript': 'JavaScript',
        'ts': 'TypeScript',
        'typescript': 'TypeScript',
        'py': 'Python',
        'python': 'Python',
        'go': 'Go',
        'golang': 'Go',
        'rs': 'Rust',
        'rust': 'Rust',
        'cpp': 'C++',
        'c++': 'C++',
        'c': 'C',
        'java': 'Java',
        'php': 'PHP',
        'rb': 'Ruby',
        'ruby': 'Ruby',
        'sh': 'Shell',
        'bash': 'Bash',
        'zsh': 'Zsh',
        'sql': 'SQL',
        'html': 'HTML',
        'css': 'CSS',
        'scss': 'SCSS',
        'sass': 'Sass',
        'json': 'JSON',
        'yaml': 'YAML',
        'yml': 'YAML',
        'xml': 'XML',
        'md': 'Markdown',
        'markdown': 'Markdown',
        'dockerfile': 'Dockerfile',
        'toml': 'TOML',
        'ini': 'INI',
        'solidity': 'Solidity',
        'sol': 'Solidity'
    };
    
    return languageMap[lang.toLowerCase()] || lang.toUpperCase();
}

async function copyCodeToClipboard(pre, button) {
    try {
        // Get the code text
        let codeText = getCodeText(pre);
        
        // Copy to clipboard using modern API
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(codeText);
        } else {
            // Fallback for older browsers or non-HTTPS
            fallbackCopyToClipboard(codeText);
        }
        
        // Update button state
        showCopySuccess(button);
        
    } catch (err) {
        console.error('Failed to copy code:', err);
        showCopyError(button);
    }
}

function getCodeText(pre) {
    // Clone the pre element to avoid modifying the original
    const clone = pre.cloneNode(true);
    
    // Remove line numbers if present
    const lineNumbers = clone.querySelectorAll('.lnt, .ln');
    lineNumbers.forEach(ln => ln.remove());
    
    // Get text content and clean it up
    let text = clone.textContent || clone.innerText || '';
    
    // Remove extra whitespace and normalize line endings
    text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // Remove leading/trailing whitespace but preserve internal structure
    text = text.trim();
    
    return text;
}

function fallbackCopyToClipboard(text) {
    // Create a temporary textarea element
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
    } finally {
        document.body.removeChild(textArea);
    }
}

function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    button.classList.add('copied');
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.remove('copied');
    }, 2000);
}

function showCopyError(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-exclamation"></i> Error';
    button.style.background = 'rgba(255, 85, 85, 0.2)';
    button.style.borderColor = '#ff5555';
    button.style.color = '#ff5555';
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = '';
        button.style.borderColor = '';
        button.style.color = '';
    }, 2000);
}

// Handle keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Shift + C to copy focused code block
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        const focusedBlock = document.querySelector('.highlight:hover, .highlight:focus-within');
        if (focusedBlock) {
            const copyBtn = focusedBlock.querySelector('.code-copy-btn');
            if (copyBtn) {
                copyBtn.click();
                e.preventDefault();
            }
        }
    }
});