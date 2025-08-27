import React from "react";
import { useRef, useState } from "react";
import EmojiPickerButton from "../src/ui/EmojiPickerButton";

function App() {
  // Input refs
  const textInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // State for interactive props
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [position, setPosition] = useState<
    "top-right" | "top-left" | "bottom-right" | "bottom-left"
  >("bottom-left");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [preventBadEmojis, setPreventBadEmojis] = useState(true);
  const [enableRecentEmojis, setEnableRecentEmojis] = useState(true);
  const [enableTabsTitleEmoji, setEnableTabsTitleEmoji] = useState(true);

  // Custom styles for the documentation page
  const pageStyles = {
    backgroundColor: theme === "light" ? "#f8f9fa" : "#212529",
    color: theme === "light" ? "#212529" : "#f8f9fa",
    minHeight: "100vh",
    transition: "all 0.3s ease",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const cardStyles = {
    backgroundColor: theme === "light" ? "white" : "#343a40",
    borderRadius: "12px",
    boxShadow:
      theme === "light"
        ? "0 4px 6px rgba(0, 0, 0, 0.1)"
        : "0 4px 6px rgba(0, 0, 0, 0.3)",
    padding: "1.5rem",
    marginBottom: "1.5rem",
    transition: "all 0.3s ease",
  };

  const headerStyles = {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  };

  const buttonStyles = {
    backgroundColor: theme === "light" ? "#4361ee" : "#4cc9f0",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "0.5rem 1rem",
    margin: "0.25rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const activeButtonStyles = {
    ...buttonStyles,
    backgroundColor: theme === "light" ? "#3a0ca3" : "#7209b7",
    fontWeight: "bold" as const,
  };

  const inputStyles = {
    padding: "0.75rem",
    fontSize: "1rem",
    width: "100%",
    marginRight: "10px",
    borderRadius: "6px",
    border: theme === "light" ? "1px solid #ced4da" : "1px solid #495057",
    backgroundColor: theme === "light" ? "white" : "#495057",
    color: theme === "light" ? "#212529" : "white",
  };

  const toggleStyles = {
    display: "flex",
    alignItems: "center",
    margin: "0.5rem 0",
  };

  return (
    <div style={pageStyles}>
      {/* GitHub */}
      <a
        href="https://github.com/Mahmoud-walid/react-emoji-toggle-button"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "inherit",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <svg
          height="24"
          width="24"
          viewBox="0 0 24 24"
          version="1.1"
          data-view-component="true"
        >
          <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path>
        </svg>
        <img
          src="https://img.shields.io/badge/EmojiPickerButton-pachage-green?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANFSURBVDhPnVRLb1VVFP7W3udxz+2D2IeF9tIOvIDpw2KMSkvAhISAWEYQiAMmylT8BySQOPGR6Jw5iTjRqHUAahEETZjw1jYlUGzpQ7hp76O35569WOfRa2+5JOqXnJy91t77W2t/a+1NqIP84OB2a9u2z8nzthp/+kv3w0lmz+qWKZ81rpc+sq7gXrNqdJzLNDa2HO+KERFyb69T7Ok5qByno5LLXVS+f161tHREKxiw35+G2lqUMWPlrEZwsRW6cxMk4O1iLreTJiepuaFhWV29WqI/s1m3s63tZzub3QHbhpmbA5fLoFQq4guhX1+EdUj898oonWyB7tqUTGiYXG6ctc7qjo5lBZxQG9PpEbLtHTIBMz8vOVMNWQguy9LwPyPpppxoHCEIoBobt+h0mrC05JlC4XS48kUYEy94Dqh9JfqrLiGsVKJxFZLAKjgIFpXEuxDk80GoT12IW2/Px+NWC7p/KdKyHsT7hXI+fmycAwUKZh6hXqZqIF/NEI02nJEVcKkQ22ug33pSTp8aP6fAdMTdXVap449heApclGquQjGskYXEiEFbbCmSaB0ZcUDnxBSst/92A4feJTO6eVT8+1cXBBMW/GtN4PsvQO/Lw37n2Wywwqj8Isd/g0FNNaf6WggzE1LXlxIHuF0qvKpR2oqE+bdg5onwyBsSO4arAU+Iwu8/kCVok7bh2cSI8U8X/B8EYR9eiscJ1mcVBlgbRMbLZeDKNxXcuhwkzgRE02S+zewmTWOJC9yZlh6IGULuMx+UYLmEhhaCsuRCzDEe/WGkvxnvfeagq1ekqYLPkOhPPJq5RETDkavVjYuRYPLXMs59GsCXN2WD6+JYXx8e5gsoDI3jzaO1V1SqsidKxXyXGYCi38TwQrKIdA1Ksz5u/uijMGvB9QjdQwZdA7JmrRRy46jv7t6qy3zffVhCnJWrafFGT96s+EGoQahBLUkENpiiIBhSr47/Vd2lDjz4Sm7GQdkzTwuiuqnTM/XImH+XGuwKyUK7Jg21/+EPoujL7JtPMFNaQHHdy5JAdBce3DBsjqv+V4ZV3537yVS9mDH4Jzl6ITMMT7/GzU4PpVRa6rcoG+6K3mPUe2dC5Fl3DOApG+A2rGx9Ok4AAAAASUVORK5CYII="
          alt="repo-badge"
        />
      </a>
      {/* Header Section */}
      <div style={cardStyles}>
        <div style={headerStyles}>
          <h1 style={{ margin: 0, marginRight: "1rem" }}>EmojiPickerButton</h1>
          <span style={{ fontSize: "2rem", marginRight: "0.5rem" }}>😎</span>
          <span style={{ fontSize: "2rem", marginRight: "0.5rem" }}>🚀</span>
          <span style={{ fontSize: "2rem" }}>✨</span>
        </div>
        <p style={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
          A customizable React component that adds emoji picker functionality to
          any text input or textarea. Easily integrate emojis into your forms
          with extensive customization options.
        </p>
        <p
          style={{
            fontSize: "1.1rem",
            color: theme === "light" ? "#3a0ca3" : "#4cc9f0",
            marginTop: "0.5rem",
          }}
        >
          <strong>Note:</strong> You <strong>must</strong> connect the{" "}
          <code
            style={{
              backgroundColor: theme === "light" ? "#e9ecef" : "#495057",
              padding: "0.2rem 0.4rem",
              borderRadius: "8px",
              width: "fit-content",
              fontFamily: "monospace",
            }}
          >
            {"<EmojiPickerButton />"}
          </code>{" "}
          to the <code>ref</code> of your text input or textarea for it to work
          correctly.
        </p>
      </div>

      {/* Theme Toggle */}
      <div style={cardStyles}>
        <h2>🎨 Customize Your Experience</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h3>Theme</h3>
            <div>
              <button
                style={theme === "light" ? activeButtonStyles : buttonStyles}
                onClick={() => setTheme("light")}
              >
                Light 🌞
              </button>
              <button
                style={theme === "dark" ? activeButtonStyles : buttonStyles}
                onClick={() => setTheme("dark")}
              >
                Dark 🌙
              </button>
            </div>
          </div>

          <div>
            <h3>Position</h3>
            <div>
              <button
                style={
                  position === "top-left" ? activeButtonStyles : buttonStyles
                }
                onClick={() => setPosition("top-left")}
              >
                Top Left ↖️
              </button>
              <button
                style={
                  position === "top-right" ? activeButtonStyles : buttonStyles
                }
                onClick={() => setPosition("top-right")}
              >
                Top Right ↗️
              </button>
              <button
                style={
                  position === "bottom-left" ? activeButtonStyles : buttonStyles
                }
                onClick={() => setPosition("bottom-left")}
              >
                Bottom Left ↙️
              </button>
              <button
                style={
                  position === "bottom-right"
                    ? activeButtonStyles
                    : buttonStyles
                }
                onClick={() => setPosition("bottom-right")}
              >
                Bottom Right ↘️
              </button>
            </div>
          </div>

          <div>
            <h3>Size</h3>
            <div>
              <button
                style={size === "sm" ? activeButtonStyles : buttonStyles}
                onClick={() => setSize("sm")}
              >
                Small 🔍
              </button>
              <button
                style={size === "md" ? activeButtonStyles : buttonStyles}
                onClick={() => setSize("md")}
              >
                Medium 🔎
              </button>
              <button
                style={size === "lg" ? activeButtonStyles : buttonStyles}
                onClick={() => setSize("lg")}
              >
                Large 🔬
              </button>
            </div>
          </div>

          <div>
            <h3>Language</h3>
            <div>
              <button
                style={language === "en" ? activeButtonStyles : buttonStyles}
                onClick={() => setLanguage("en")}
              >
                English 🇺🇸
              </button>
              <button
                style={language === "ar" ? activeButtonStyles : buttonStyles}
                onClick={() => setLanguage("ar")}
              >
                Arabic 🇪🇬
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <h3>Additional Options</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <div style={toggleStyles}>
              <input
                type="checkbox"
                id="preventBadEmojis"
                checked={preventBadEmojis}
                onChange={() => setPreventBadEmojis(!preventBadEmojis)}
                style={{ marginRight: "0.5rem" }}
              />
              <label htmlFor="preventBadEmojis">Prevent Bad Emojis 🚫</label>
            </div>

            <div style={toggleStyles}>
              <input
                type="checkbox"
                id="enableRecentEmojis"
                checked={enableRecentEmojis}
                onChange={() => setEnableRecentEmojis(!enableRecentEmojis)}
                style={{ marginRight: "0.5rem" }}
              />
              <label htmlFor="enableRecentEmojis">
                Enable Recent Emojis 🕒
              </label>
            </div>

            <div style={toggleStyles}>
              <input
                type="checkbox"
                id="enableTabsTitleEmoji"
                checked={enableTabsTitleEmoji}
                onChange={() => setEnableTabsTitleEmoji(!enableTabsTitleEmoji)}
                style={{ marginRight: "0.5rem" }}
              />
              <label htmlFor="enableTabsTitleEmoji">
                Enable Tabs Title Emoji 🏷️
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div style={cardStyles}>
        <h2>✨ Try It Out</h2>

        <div style={{ marginBottom: "2rem" }}>
          <h3>Text Input Example</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              ref={textInputRef}
              placeholder={
                language === "en"
                  ? "Type something here..."
                  : "اكتب شيئًا هنا..."
              }
              style={inputStyles}
            />
            <EmojiPickerButton
              textInputRef={textInputRef}
              position={position}
              theme={theme}
              lang={language}
              size={size}
              preventBadEmojis={preventBadEmojis}
              enableRecentEmojis={enableRecentEmojis}
              enableTabsTitleEmoji={enableTabsTitleEmoji}
            />
          </div>
        </div>

        <div>
          <h3>Text Area Example</h3>
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <textarea
              ref={textAreaRef}
              placeholder={
                language === "en"
                  ? "Type multi-line text here..."
                  : "اكتب نصًا متعدد الأسطر هنا..."
              }
              rows={5}
              style={inputStyles}
            />
            <EmojiPickerButton
              textInputRef={textAreaRef}
              position={position}
              theme={theme}
              lang={language}
              size={size}
              preventBadEmojis={preventBadEmojis}
              enableRecentEmojis={enableRecentEmojis}
              enableTabsTitleEmoji={enableTabsTitleEmoji}
            />
          </div>
        </div>
      </div>

      {/* Flag Emoji Support Section */}
      <div style={cardStyles}>
        <h2>🏁 Flag Emoji Support</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.5 }}>
          When using country flag emojis, you must use a specific font family to
          ensure proper rendering:
        </p>

        <div
          style={{
            backgroundColor: theme === "light" ? "#f8f9fa" : "#343a40",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            fontFamily:
              '"Twemoji Country Flags", "Helvetica", "Comic Sans", serif',
          }}
        >
          <h3>Example with Flag Emojis</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <span style={{ fontSize: "2rem" }}>🇺🇸</span>
            <span style={{ fontSize: "2rem" }}>🇪🇬</span>
            <span style={{ fontSize: "2rem" }}>🇯🇵</span>
            <span style={{ fontSize: "2rem" }}>🇬🇧</span>
            <span style={{ fontSize: "2rem" }}>🇫🇷</span>
            <span style={{ fontSize: "2rem" }}>🇩🇪</span>
          </div>
          <p style={{ marginTop: "1rem" }}>
            Notice how the flags render correctly with the proper font family:
            <code
              style={{
                backgroundColor: theme === "light" ? "#e9ecef" : "#495057",
                padding: "0.2rem 0.4rem",
                borderRadius: "4px",
                width: "fit-content",
                fontFamily: "monospace",
                display: "block",
                marginTop: "0.5rem",
                overflowX: "auto",
                whiteSpace: "nowrap",
              }}
            >
              'font-family: "Twemoji Country Flags", "Helvetica", "Comic Sans",
              serif;'
            </code>
            <button
              style={{
                ...buttonStyles,
                marginTop: "0.5rem",
                backgroundColor: theme === "light" ? "#20c997" : "#4cc9f0",
              }}
              onClick={() => {
                navigator.clipboard.writeText(
                  `'font-family: "Twemoji Country Flags", "Helvetica", "Comic Sans", serif;'`
                );
                alert("Font family copied to clipboard!");
              }}
            >
              Copy font family to clipboard
            </button>
          </p>
        </div>
      </div>

      {/* Installation Section */}
      <div style={cardStyles}>
        <h2>📦 Installation</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.5 }}>
          Install the package using npm or yarn:
        </p>

        <div
          style={{
            backgroundColor: theme === "light" ? "#f8f9fa" : "#343a40",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        >
          <h3>Using npm</h3>
          <code
            style={{
              backgroundColor: theme === "light" ? "#e9ecef" : "#495057",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              width: "fit-content",
              fontFamily: "monospace",
              display: "block",
              marginBottom: "1rem",
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            npm install react-emoji-toggle-button
          </code>
          <button
            style={{
              ...buttonStyles,
              backgroundColor: theme === "light" ? "#20c997" : "#4cc9f0",
            }}
            onClick={() => {
              navigator.clipboard.writeText(
                "npm install react-emoji-toggle-button"
              );
              alert("npm command copied to clipboard!");
            }}
          >
            Copy npm command
          </button>

          <h3 style={{ marginTop: "1.5rem" }}>Using yarn</h3>
          <code
            style={{
              backgroundColor: theme === "light" ? "#e9ecef" : "#495057",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              width: "fit-content",
              fontFamily: "monospace",
              display: "block",
              marginBottom: "1rem",
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            yarn add react-emoji-toggle-button
          </code>
          <button
            style={{
              ...buttonStyles,
              backgroundColor: theme === "light" ? "#20c997" : "#4cc9f0",
            }}
            onClick={() => {
              navigator.clipboard.writeText(
                "yarn add react-emoji-toggle-button"
              );
              alert("yarn command copied to clipboard!");
            }}
          >
            Copy yarn command
          </button>

          <h3 style={{ marginTop: "1.5rem" }}>Basic Usage</h3>
          <code
            style={{
              backgroundColor: theme === "light" ? "#e9ecef" : "#495057",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              fontFamily: "monospace",
              display: "block",
              marginBottom: "1rem",
              width: "fit-content",
              overflowX: "auto",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            {`            import React, { useRef } from 'react';
            import { EmojiPickerButton } from 'react-emoji-toggle-button';

            function MyComponent() {
              const inputRef = useRef<HTMLInputElement>(null);
              
              return (
                <div>
                  <input ref={inputRef} type="text" placeholder="Type here..." />
                  <EmojiPickerButton textInputRef={inputRef} />
                </div>
              );
            }
`}
          </code>
        </div>
      </div>

      {/* Props Documentation */}
      <div style={cardStyles}>
        <h2>📚 Props Documentation</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  backgroundColor: theme === "light" ? "#e9ecef" : "#343a40",
                }}
              >
                <th
                  style={{
                    padding: "0.75rem",
                    textAlign: "left",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Prop
                </th>
                <th
                  style={{
                    padding: "0.75rem",
                    textAlign: "left",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Type
                </th>
                <th
                  style={{
                    padding: "0.75rem",
                    textAlign: "left",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Default
                </th>
                <th
                  style={{
                    padding: "0.75rem",
                    textAlign: "left",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  textInputRef
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  RefObject&lt;HTMLInputElement | HTMLTextAreaElement&gt;
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Required
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Reference to the input or textarea element
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  position
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  "top-right" | "top-left" | "bottom-right" | "bottom-left"
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  "top-left"
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Position of the emoji picker relative to the button
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  theme
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  "light" | "dark"
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  "light"
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Theme for the emoji picker
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  lang
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  "en" | "ar"
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  "en"
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Language for the emoji picker UI
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  size
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  "sm" | "md" | "lg"
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  "md"
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Size preset for the emoji picker
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  preventBadEmojis
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  boolean
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  true
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Filter out inappropriate emojis
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  badEmojiList
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  string[]
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  defaultBadEmojisList
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Custom list of emojis to filter out
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  enableRecentEmojis
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  boolean
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  true
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Show recently used emojis
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  enableTabsTitleEmoji
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  boolean
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  true
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Show emoji icons in category tabs
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  initialCategory
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  string
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  undefined
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Initial category to display
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  onEmojiSelect
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  (emoji: string) ='$gt;' void
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  undefined
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Callback when an emoji is selected
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  styles
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  EmojiPickerStyles
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  undefined
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Custom styles for the picker components
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  classNames
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  EmojiPickerClassNames
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  undefined
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Custom CSS class names
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  config
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  EmojiPickerConfig
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  undefined
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Advanced configuration options
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  themeConfig
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  ThemeConfig
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  defaultThemeConfig
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: `1px solid ${
                      theme === "light" ? "#dee2e6" : "#495057"
                    }`,
                  }}
                >
                  Custom theme colors configuration
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: "2rem", padding: "1rem" }}>
        <p>Made with ❤️ by Mahmoud Walid</p>
        <p>
          EmojiPickerButton - Add emoji support to your React inputs with ease!
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {/* X Platform */}
          <a
            href="https://x.com/mahmoudWalid_JS"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 1200 1227"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="none"
            >
              <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
            </svg>
          </a>
          {/* GitHub */}
          <a
            href="https://github.com/Mahmoud-walid/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit" }}
          >
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              version="1.1"
              data-view-component="true"
            >
              <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path>
            </svg>
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/mahmoud-walid-95391424a/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit" }}
          >
            <svg
              height="24"
              width="24"
              viewBox="0 0 382 382"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                style={{ fill: "#0077B7" }}
                d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889 C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056 H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806 c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1 s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73 c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079 c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426 c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472 L341.91,330.654L341.91,330.654z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
