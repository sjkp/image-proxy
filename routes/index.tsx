import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import RefreshingImage from "../islands/RefreshingImage.tsx";
import { useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";


export default function Home() {
  const count = useSignal(3);
  const play = useSignal(false);
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div>
        <RefreshingImage play={play}></RefreshingImage>
        <p>
          Random webcam in Kiruna (Sweden)
        </p>
        
        
      </div>
    </>
  );
}
