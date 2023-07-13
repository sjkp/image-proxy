import type { Signal } from "@preact/signals";
import { signal, useSignal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { useEffect } from "preact/hooks";

interface CounterProps {
    play: Signal<boolean>;
  }

export default function RefreshingImage(props: CounterProps) {    
    const count = useSignal(0);
    const play  = useSignal(props.play.value);
    useEffect(() => {
        let timer = 0;
        console.log(play)
        if (play.value)
        {
        timer = setInterval(() => {
          console.log(count.value);
         count.value++;
        },1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
      },[play.value]);
  return (
    <div>
        <img src={`/api/webcam?counter=${count.value}`}></img>          
        <div><Button onClick={() => play.value = !play.value}>{play.value ? "Stop": "Play"}</Button></div>
    </div>
  );
}
