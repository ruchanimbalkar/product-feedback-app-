//import styles
import "./Button.css";
export default function Button({ className = undefined, text, handleClick }) {
  return (
    <>
      {/* Reference : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing */}
      <button
        type="button"
        className={className ?? undefined}
        onClick={handleClick}
      >
        {text}
      </button>
    </>
  );
}
