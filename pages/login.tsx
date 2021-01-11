import GoogleLogin from 'react-google-login';
import styles from '../styles/Login.module.css';


export default function Login() {
    return (
        <main className={styles.main}>
            <div className={styles.textContainer}>
                <div className={styles.title}>
                    If you're here, you probably know what to do
                </div>
                <div className={styles.subtitle}>I hope...</div>
            </div>
            <div className={styles.btn}>
                <GoogleLogin
                    clientId=""
                    buttonText="Login"
                    onSuccess={console.log}
                    onFailure={console.log}
                    cookiePolicy="single_host_origin"
                    hostedDomain="connectingtocongress.org"
                />
            </div>
        </main>
    );
}
