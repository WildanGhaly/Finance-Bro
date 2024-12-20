import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#1a237e',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #1a237e 60%, #283593 100%)',
    } as React.CSSProperties,
    content: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '2rem',
    } as React.CSSProperties,
    logoContainer: {
      width: '80px',
      height: '80px',
    } as React.CSSProperties,
    logo: {
      width: '100%',
      height: '100%',
      objectFit: 'contain' as const,
      filter: 'brightness(0) invert(1)',
    } as React.CSSProperties,
    loginButton: {
      backgroundColor: '#f5f5f5',
      padding: '0.5rem',
      borderRadius: '4px',
      width: '300px',
      display: 'flex',
      justifyContent: 'center',
    } as React.CSSProperties,
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.logoContainer}>
          <img 
            src="src/assets/logo.svg"
            style={styles.logo}
            alt="Logo"
          />
        </div>
        <div style={styles.loginButton}>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              if (credentialResponse.credential) {
                const decoded = jwtDecode(credentialResponse.credential);
                const email = (decoded as { email: string }).email;
                try {
                  const response = await fetch('https://financebro-backend-958019176719.us-central1.run.app/firebase', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                  });
                  const data = await response.json();
                  const token = data.token;
                  localStorage.setItem('authToken', token);
                //if response 201, navigate to profile and if response 200, navigate to home
                    if (response.status === 201) {
                        navigate('/profile');
                    } else {
                        navigate('/home');
                    }
                } catch (error) {
                  console.error('Error:', error);
                }
              }
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
      </div>
    </div>
  );
}
