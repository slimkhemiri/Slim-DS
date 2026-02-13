import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
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
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "20px",
            fontSize: "14px",
            lineHeight: "1.8",
            borderRadius: 0,
            background: "#1e1e1e",
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
