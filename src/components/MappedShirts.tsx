import { shirts } from "../resources/shirts";
import { Link } from "react-router-dom";

function MappedShirts() {
  return (
    <div>
      {shirts.map((shirt) => (
        <Link key={shirt.id} to={`/shirt/${shirt.id}`}>
          <img
            src={shirt.url}
            alt={shirt.alt}
            style={{ height: "500px", margin: "10px" }}
          />
        </Link>
      ))}
    </div>
  );
}

export default MappedShirts;
