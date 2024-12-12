import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';


export default function Login() {
  return (
    <GoogleLogin
  onSuccess={ async credentialResponse => {
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
        localStorage.setItem('token', token);
        console.log(localStorage.getItem('token'));
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
  )
}