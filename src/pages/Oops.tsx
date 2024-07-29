import { Link } from "react-router-dom";

function Oops() {
  return (
    <div>
      <h2>Oops!</h2>
      <p>
        <Link to="/">Back to home page</Link>
      </p>
    </div>
  );
}
export default Oops;
