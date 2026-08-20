import React, { useState } from "react";

// Renders **bold** segments inside plain text.
function RichText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

function CodeBlock({ label, lines }) {
  const [copied, setCopied] = useState(false);
  const text = lines.map((l) => l.t).join("\n");

  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="code-block">
      <div className="code-head">
        <div className="code-dots"><span /><span /><span /></div>
        <span className="code-label">{label || "terminal"}</span>
        <button className={`copy-btn${copied ? " copied" : ""}`} onClick={copy}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>
        {lines.map((l, i) => (
          <div key={i} className={l.cmt ? "cmt-line" : ""}>{l.t}</div>
        ))}
      </pre>
    </div>
  );
}

function StepsBlock({ items }) {
  return (
    <div className="steps">
      {items.map((s, i) => (
        <div className="step" key={i}>
          <div className="step-num">{i + 1}</div>
          <div className="step-body">
            <h5>{s.title}</h5>
            <p><RichText text={s.body} /></p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TableBlock({ headers, rows }) {
  return (
    <table className="ref">
      {headers && headers.some(Boolean) && (
        <thead>
          <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
      )}
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>{r.map((c, j) => <td key={j}>{typeof c === "string" ? <RichText text={c} /> : c}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}

function CalloutBlock({ tone, label, text }) {
  return (
    <div className={`callout ${tone || "info"}`}>
      <span className="callout-label">{label}</span>
      <RichText text={text} />
    </div>
  );
}

function CompareBlock({ left, right }) {
  return (
    <div className="compare-grid">
      {[left, right].map((c, i) => (
        <div className="compare-card" key={i}>
          <h5 style={{ color: c.color === "green" ? "#3fb950" : "#58a6ff" }}>{c.title}</h5>
          <p style={{ fontSize: "13.5px", marginBottom: 10 }}>{c.text}</p>
          <ul>{c.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}

export default function Blocks({ blocks }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "heading":
            return b.level === 3 ? <h3 className="sub-title" key={i}>{b.text}</h3> : <h4 className="mini-title" key={i}>{b.text}</h4>;
          case "p":
            return <p key={i}><RichText text={b.text} /></p>;
          case "code":
            return <CodeBlock key={i} label={b.label} lines={b.lines} />;
          case "list":
            return (
              <ul className="plain" key={i}>
                {b.items.map((it, j) => <li key={j}><RichText text={it} /></li>)}
              </ul>
            );
          case "steps":
            return <StepsBlock key={i} items={b.items} />;
          case "table":
            return <TableBlock key={i} headers={b.headers} rows={b.rows} />;
          case "callout":
            return <CalloutBlock key={i} tone={b.tone} label={b.label} text={b.text} />;
          case "compare":
            return <CompareBlock key={i} left={b.left} right={b.right} />;
          default:
            return null;
        }
      })}
    </>
  );
}
