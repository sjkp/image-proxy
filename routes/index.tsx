import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import RefreshingImage from "../islands/RefreshingImage.tsx";
import { useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import OverlayImage from "../islands/OverlayImage.tsx";
import { RectangleF } from "../islands/Canvas.tsx";


export default function Home() {
  const count = useSignal(3);
  const play = useSignal(false);
  const rectangle = useSignal<RectangleF>({ x: 0, y: 0, width: 0, height: 0 });
  const url = Deno.env.get('ANALYZE_API') || 'https://container-app-sjkpyoloapi.wonderfulsea-38fb324c.northeurope.azurecontainerapps.io/analyze';
  return (
    <>
       <div>

        <p>
          Random webcam in Kiruna (Sweden)
        </p>
        <a href="/new">New camera</a>

      </div>
    </>
  );
}
