import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  return (
    <GoogleLogin
  onSuccess={credentialResponse => {
    if (credentialResponse.credential) {
      var decoded = jwtDecode(credentialResponse.credential);
        console.log('Decoded: ', decoded);
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