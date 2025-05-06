import heroImage from '../assets/image/hh.jpg'; // تأكد من استيراد الصورة
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.fullPage}>
      <div className={styles.container}>
        <div className={styles.textSection}>
          <h1 className={styles.mainTitle}>EVIDENS</h1>
          <h2 className={styles.subTitle}>DE BEAUTÉ</h2>
          <h3 className={styles.tagline}>L'ESSENCE DU LUXE</h3>
          <button className={styles.shopButton}>DÉCOUVRIR</button>
        </div>
        <div className={styles.imageSection}>
          <img src={heroImage} alt="EVIDENS Perfume" className={styles.productImage} />
        </div>
      </div>
    </div>
  );
};

export default Home;