import styles from "./Sidebar.module.scss";
import apoogee from "../../../../../public/svgs/apogee26logo.svg";
import calender from "../../../../../public/calender.png";
import misc from "../../../../../public/misc.png";
import eng from "../../../../../public/eng.png";
import science from "../../../../../public/science.png";
import price from "../../../../../public/price.png";
import { Link } from "react-router-dom";

interface AppProps {
  bt?: boolean; // The '?' makes it optional
}

const Sidebar: React.FC<AppProps> = ({ bt = false }) => {
  return (
    <div className={`${styles.page} ${bt ? styles.bottom : ""}`}>
      <div className={styles.logoBox}>
        <h1>
          <img src={apoogee} className={styles.logo} alt="" />
        </h1>
        <Link to="/contact">
          <button>Contact Us</button>
        </Link>
      </div>
      <div className={styles.topPage}>
        <div className={styles.heading}>Paper Presentation</div>
        <div className={styles.dis}>
          The Paper Presentation event is India’s oldest undergraduate paper
          presentation competition. As an event with a legacy spanning more than
          40 years, the competition attracts participants from premier
          institutes in India, including IITs, IIMs, DUs, IISERs, etc.{" "}
          <strong style={{ color: "#00ffe6" }}>
            With cash prizes amounting to more than 1 lakhs,
          </strong>{" "}
          the previous editions have been a huge success, and we would like your
          support in growing this event further. Paper needs to be submitted in
          IEEE format only.
        </div>
      </div>
      <div className={styles.Description}>
        <div className={styles.paperCategories}>
          <div className={styles.category}>
            <h2 className={styles.categoryTitle}>
              <div className={styles.logo}>
                <img src={eng} alt="" className={styles.svgs} />
              </div>
              Engineering
            </h2>
            <ul className={styles.categoryList}>
              <li>Chemical</li>
              <li>Civil</li>
              <li>Computer Science</li>
              <li>Electrical and Electronics</li>
              <li>Mechanical and Manufacturing</li>
            </ul>
          </div>

          <div className={styles.category}>
            <h2 className={styles.categoryTitle}>
              <div className={styles.logo}>
                <img src={science} className={styles.svgs} alt="" />
              </div>
              Science
            </h2>
            <ul className={styles.categoryList}>
              <li>Biological Sciences</li>
              <li>Chemistry</li>
              <li>Mathematics</li>
              <li>Physics</li>
            </ul>
          </div>

          <div className={styles.category}>
            <h2 className={styles.categoryTitle}>
              <div className={styles.logo}>
                <img src={misc} alt="" className={styles.svgs} />
              </div>
              Miscellaneous
            </h2>
            <ul className={styles.categoryList}>
              <li>Humanities</li>
              <li>Economics & Finance</li>
              <li>Entrepreneurship & Management</li>
              <li>Pharmacy</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.price}>
        <img src={price} alt="" className={styles.svgs} />
        Prize Pool of ₹9000 per category
      </div>
      <div className={styles.timeline}>
        <div className={styles.heading}>
          <div className={styles.logo}>
            <img src={calender} alt="" className={styles.svgs} />
          </div>
          Deadlines
        </div>
        <div className={styles.date}>
          Abstration Submision: <span>18th Feb</span>
        </div>
        <div className={styles.date}>
          Paper Submission: <span>20th March</span>
        </div>
        <div className={styles.date}>
          Paper Presentation - APOGEE: <span>28th March</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
