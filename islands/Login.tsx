
import { useSignal } from "@preact/signals";
import LogtoClient from "https://esm.sh/@logto/browser@2.1.0?target=es2022";
import { useEffect } from "preact/hooks";

export default function Login() {
    const logtoClient = new LogtoClient({
        endpoint: 'https://k22w3c.logto.app/',
        appId: 'ti3t4nbfi5bfw4l1aj3kt',
      });


    const accessToken = useSignal('');  
    useEffect(() => {
        logtoClient.getAccessToken('https://api.webcam.browserfriend.com').then(s => {
            accessToken.value = s;
        });
    })
    return (
        <div>
        <button onClick={() => {logtoClient.signIn('http://localhost:8000/callback')}}>
        Sign In
      </button>
      <p>
        {accessToken}
      </p>
      </div>
    );
  }
  