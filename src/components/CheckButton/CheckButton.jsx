import "./CheckButton.css";

export default function CheckButton({ checked, handleChange }) {
  return (
    <input
      className="CheckButton"
      type="checkBox"
      checked={checked}
      onChange={handleChange}
    />
  );
}
