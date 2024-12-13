import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
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

            navigate('/home');
          } catch (error) {
            console.error('Error:', error);
          }
        } else {
          console.error('Credential is undefined');
        }
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
}