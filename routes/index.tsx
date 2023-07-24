import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import RefreshingImage from "../islands/RefreshingImage.tsx";
import { useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import OverlayImage from "../islands/OverlayImage.tsx";
import { RectangleF } from "../islands/Canvas.tsx";
import Login from "../islands/Login.tsx";


export default function Home() {
  


  return (
    <>
       <div>

        <p>
          Random webcam in Kiruna (Sweden)
        </p>
        <a href="/new">New camera</a>
        <Login></Login>
      </div>
    </>
  );
}
