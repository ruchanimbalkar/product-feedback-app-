import Button from "../components/Button";
//import styles
import "./Card.css";
export default function Card({ title, suggestion, category }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{suggestion}</p>
      <Button text={category} />
    </div>
  );
}
