import styles from "../DeviceItem.module.css";


const Reting = ({reting}) => {
    return(
    <div className={styles.rating} > 
     <span className={styles.ratingStarActive}>
      {reting >= 1 ? (
        "★"
      ) : (
        <p className={styles.ratingStar}>★</p>
      )}
    </span>
    <span className={styles.ratingStarActive}>
      {reting >= 2 ? (
        "★"
      ) : (
        <p className={styles.ratingStar}>★</p>
      )}
    </span>
    <span className={styles.ratingStarActive}>
      {reting >= 3 ? (
        "★"
      ) : (
        <p className={styles.ratingStar}>★</p>
      )}
    </span>
    <span className={styles.ratingStarActive}>
      {reting >= 4 ? (
        "★"
      ) : (
        <p className={styles.ratingStar}>★</p>
      )}
    </span>
    <span className={styles.ratingStarActive}>
      {reting >= 5 ? (
        "★"
      ) : (
        <p className={styles.ratingStar}>★</p>
      )}
    </span>
  </div>
  )
}

export default Reting;