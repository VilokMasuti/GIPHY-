import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
const Followon = () => {
  return (
    <div
      className="faded-text pt-2" //custom - faded-text
    >
      <span>Follow on:</span>
      <div className="flex gap-4 pt-3">
        <a href="https://www.instagram.com/roadsidecoder">
          <FaInstagram size={20} />
        </a>
        <a href="https://www.linkedin.com/in/vilok-masuti-99aab8252/">
          <FaLinkedin size={20} />
        </a>
      </div>
    </div>
  );
};

export default Followon;
