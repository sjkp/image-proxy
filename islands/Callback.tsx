import LogtoClient from "https://esm.sh/@logto/browser@2.1.0?target=es2022";
import { useEffect } from "preact/hooks";

export default function Callback() {
    const logtoClient = new LogtoClient({
        endpoint: 'https://k22w3c.logto.app/',
        appId: 'ti3t4nbfi5bfw4l1aj3kt',
      });

    useEffect(() => {
        
            logtoClient.handleSignInCallback(window.location.href).then(async () => {
                console.log(await logtoClient.isAuthenticated()); // true
                console.log(logtoClient.getAccessToken());
            }).catch(e => {
                console.log(e);
            });
            
          
    },[]);
    return (
        <div></div>
    );
  }
  