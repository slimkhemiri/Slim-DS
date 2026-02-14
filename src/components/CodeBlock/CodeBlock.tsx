import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./CodeBlock.css";

interface CodeBlockProps {
  title: string;
  code: string;
  language?: string;
  defaultExpanded?: boolean;
}

export function CodeBlock({ title, code, language = "bash", defaultExpanded = false }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const [isDark, setIsDark] = React.useState(true);

  // Detect current theme
  React.useEffect(() => {
    const checkTheme = () => {
      const root = document.documentElement;
      const theme = root.getAttribute('data-theme') || 'light';
      setIsDark(theme === 'dark' || theme === 'hc');
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Map language aliases to proper Prism language codes
  const languageMap: Record<string, string> = {
    "tsx": "tsx",
    "typescript": "typescript",
    "jsx": "jsx",
    "javascript": "javascript",
    "bash": "bash",
    "shell": "bash",
    "css": "css",
    "html": "markup",
    "json": "json",
  };

  const prismLanguage = languageMap[language] || language;
  const syntaxTheme = isDark ? vscDarkPlus : prism;
  const syntaxBg = isDark ? "#1e1e1e" : "#f5f5f5";

  return (
    <div className={`codeBlock ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="codeBlockHeader">
        <div className="codeBlockHeaderLeft">
          <button
            className="expandButton"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Collapse code" : "Expand code"}
            title={expanded ? "Collapse code" : "Expand code"}
          >
            <span className="codeIcon">&lt;/&gt;</span>
          </button>
          <span className="codeBlockTitle">{title}</span>
          <span className="codeLanguageBadge">{language}</span>
        </div>
        <button 
          className={`copyButton ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {expanded && (
        <SyntaxHighlighter
          language={prismLanguage}
          style={syntaxTheme}
          customStyle={{
            margin: 0,
            padding: "20px",
            fontSize: "14px",
            lineHeight: "1.8",
            borderRadius: 0,
            background: syntaxBg,
          }}
          codeTagProps={{
            style: {
              fontFamily: "var(--ant-font-family-code)",
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      )}
    </div>
  );
}

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = "Copy" }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button 
      className={`copyButtonSmall ${copied ? 'copied' : ''}`}
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
      title={`Copy ${label}`}
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}
