export default function LeftItems({ num }) {
  return (
    <p>
      {num}
      {num === 1 ? " item" : " items"} left
    </p>
  );
}
