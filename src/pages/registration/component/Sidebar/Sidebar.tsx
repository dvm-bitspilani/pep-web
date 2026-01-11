import { motion } from "framer-motion";
import { Atom, Briefcase, Calendar, Cog, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import price from "../../../../../public/price.png";
import apoogee from "../../../../../public/svgs/apogee26logo.svg";
import styles from "./Sidebar.module.scss";

interface AppProps {
  bt?: boolean;
}

const Sidebar: React.FC<AppProps> = ({ bt = false }) => {
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.6, 
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className={`${styles.page} ${bt ? styles.bottom : ""}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className={styles.logoBox}>
        <motion.div className={styles.logoWrapper} whileHover={{ scale: 1.05 }}>
           <img src={apoogee} className={styles.logo} alt="APOGEE Logo" />
        </motion.div>
        
        <Link to="/contact">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Contact Us
          </motion.button>
        </Link>
      </div>

      <motion.div className={styles.topPage} variants={itemVariants}>
        <h1 className={styles.heading}>PAPER PRESENTATION</h1>
        <div className={styles.dis}>
          <p>
            India’s oldest undergraduate paper presentation competition. 
            Legacy of 40+ years. Attracting premier intellects from IITs, IIMs, and more.
          </p>
          <div className={styles.highlight}>
            <CreditCard className={styles.icon} />
            <strong>Prize Pool: ₹1 Lakh+</strong>
          </div>
          <p className={styles.small}>IEEE Format Required.</p>
        </div>
      </motion.div>

      <motion.div className={styles.description} variants={itemVariants}>
        <div className={styles.paperCategories}>
          {/* Engineering */}
          <motion.div className={styles.category} whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}>
            <div className={styles.categoryHeader}>
               {/* Using Lucide icons or existing images with filter */}
               {/* <img src={eng} alt="" className={styles.catIcon} />  Alternatively use lucide */}
               <Cog className={styles.lucideIcon} color="#00f3ff" />
               <h2>Engineering</h2>
            </div>
            <ul className={styles.categoryList}>
              <li>Chemical</li>
              <li>Civil</li>
              <li>Computer Science</li>
              <li>EEE/Instru</li>
              <li>Mech/Mfg</li>
            </ul>
          </motion.div>

          {/* Science */}
          <motion.div className={styles.category} whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}>
             <div className={styles.categoryHeader}>
               <Atom className={styles.lucideIcon} color="#bd00ff" />
               <h2>Science</h2>
            </div>
            <ul className={styles.categoryList}>
              <li>Biological Sciences</li>
              <li>Chemistry</li>
              <li>Mathematics</li>
              <li>Physics</li>
            </ul>
          </motion.div>

          {/* Misc */}
          <motion.div className={styles.category} whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}>
            <div className={styles.categoryHeader}>
               <Briefcase className={styles.lucideIcon} color="#00ff9d" />
               <h2>Misc</h2>
            </div>
            <ul className={styles.categoryList}>
              <li>Humanities</li>
              <li>Economics & Finance</li>
              <li>Entrepreneurship/Mgmt</li>
              <li>Pharmacy</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className={styles.footerInfo} variants={itemVariants}>
        <div className={styles.prizeTag}>
           <img src={price} alt="" className={styles.icon} style={{ filter: 'invert(1)' }} />
           <span>Prize Pool: ₹9000 / Category</span>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineHeader}>
            <Calendar className={styles.icon} />
            <h3>Deadlines</h3>
          </div>
          <div className={styles.dates}>
             <div className={styles.dateRow}>
                <span>Abstraction Submission</span>
                <span className={styles.dateVal}>18th Feb</span>
             </div>
             <div className={styles.dateRow}>
                <span>Paper Submission</span>
                <span className={styles.dateVal}>20th Mar</span>
             </div>
             <div className={styles.dateRow}>
                <span>Paper Presentation - APOGEE</span>
                <span className={styles.dateVal}>28th Mar</span>
             </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
