import { useRef } from "react";
import EmojiPickerButton from "./ui/EmojiPickerButton";

function App() {
  const textInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h3>Emoji Picker Demo</h3>

      <h4>For Text Input:</h4>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          ref={textInputRef}
          style={{
            padding: "10px",
            fontSize: "1rem",
            width: "300px",
            marginRight: "10px",
          }}
        />
        <EmojiPickerButton
          textInputRef={textInputRef}
          position="bottom-right"
          key={"emoji-picker-button-1"}
          theme="light"
          lang={"en"}
          size="sm"
          preventBadEmojis={true}
        />
      </div>
      {/* ------------------------------------------------------- */}
      <span
        style={{
          fontFamily:
            '"Twemoji Country Flags", "Helvetica", "Comic Sans", serif',
        }}
      >
        🇪🇬
      </span>
      <h4>For Text Area:</h4>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <textarea
          ref={textAreaRef}
          placeholder="Type multi-line text here..."
          rows={5}
          style={{
            padding: "10px",
            fontSize: "1rem",
            width: "300px",
            marginRight: "10px",
          }}
        />
        <EmojiPickerButton
          textInputRef={textAreaRef}
          key={"emoji-picker-button-2"}
        />
      </div>
    </div>
  );
}

export default App;
