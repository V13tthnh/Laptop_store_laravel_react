import {
  faStar,
  faStarHalfAlt,
  faStar as faStarEmpty,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AVGStarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <span className="ic-star" key={i}>
          <FontAwesomeIcon icon={faStar} size="lg" color="#FDD835" />
        </span>
      );
    } else if (i - rating < 1) {
      stars.push(
        <span className="ic-star" key={i}>
          <FontAwesomeIcon icon={faStarHalfAlt} size="lg" color="#FDD835" />
        </span>
      );
    } else {
      stars.push(
        <span className="ic-star" key={i}>
          <FontAwesomeIcon icon={faStarEmpty} size="lg" color="#FDD835" />
        </span>
      );
    }
  }

  return <>{stars}</>;
}
