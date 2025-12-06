// libs
import { useRef, useEffect, useState } from "react";

// hooks
import { useScrollSpy } from "../../src/useScrollSpy";

// constants
import { SECTIONS } from "./constants";

// types
import type { ReactElement } from "react";

export const Demo = ({ offset }: { offset: number }): ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<HTMLHeadingElement[]>([]);
  const [bandHeight, setBandHeight] = useState<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      const elements = Array.from(
        containerRef.current.querySelectorAll("h2[id]"),
      ) as HTMLHeadingElement[];
      setHeadings(elements);

      // Calculate the intersection band height (same as useScrollSpy)
      if (elements.length > 0) {
        const intersectionHeight = Math.min(
          ...elements.map((h) => h.offsetHeight),
        );
        setBandHeight(intersectionHeight);
      }
    }
  }, []);

  const activeHeadingId = useScrollSpy({ headings, offset });

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementTop - offset + 1,
        behavior: "smooth",
      });
    }
  };

  return (
    <div style={{ display: "flex" }} ref={containerRef}>
      {bandHeight > 0 && (
        <div
          style={{
            position: "fixed",
            top: offset,
            left: 0,
            right: 0,
            height: bandHeight,
            background: "rgba(255, 0, 0, 0.15)",
            borderTop: "2px solid rgba(255, 0, 0, 0.6)",
            borderBottom: "2px solid rgba(255, 0, 0, 0.6)",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        />
      )}

      <nav style={{ position: "fixed", width: 200, padding: 16 }}>
        <strong>Contents</strong>
        <ul style={{ listStyle: "none", padding: 0, marginTop: 8 }}>
          {SECTIONS.map((section) => (
            <li key={section.id} style={{ marginBottom: 4 }}>
              <a
                onClick={() => handleNavClick(section.id)}
                style={{
                  cursor: "pointer",
                  fontWeight:
                    activeHeadingId === section.id ? "bold" : "normal",
                  color: activeHeadingId === section.id ? "#0066cc" : "inherit",
                }}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main style={{ marginLeft: 220, padding: 16, maxWidth: 600 }}>
        <h1>useScrollSpy</h1>
        <p>A scroll-tracking hook for React.</p>

        {SECTIONS.map((section) => (
          <section key={section.id} style={{ marginBottom: 32 }}>
            <h2 id={section.id} style={{ scrollMarginTop: offset }}>
              {section.title}
            </h2>
            <p>{section.content}</p>
          </section>
        ))}
      </main>

      <div
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          padding: 8,
          background: "#eee",
          fontSize: 12,
        }}
      >
        <div>
          Active: <strong>{activeHeadingId || "—"}</strong>
        </div>
        <div style={{ color: "#666", marginTop: 4 }}>
          Observed area: {offset}px – {offset + bandHeight}px ({bandHeight}px
          height)
        </div>
      </div>
    </div>
  );
};
