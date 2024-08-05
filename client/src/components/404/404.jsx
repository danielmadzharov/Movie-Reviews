import styles from './404.module.css';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export default function NotFound(){
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Page Not Found!</h1>
            <Link to={`/`}>
                <Button variant="contained" className={styles.button}>Back to home</Button>
            </Link>
        </div>
    )
}