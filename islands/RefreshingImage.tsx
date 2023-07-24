import type { Signal } from "@preact/signals";
import { signal, useSignal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { useEffect, useRef } from "preact/hooks";
import Canvas, { RectangleF } from "./Canvas.tsx";

interface RefreshingImageProps {
    play: Signal<boolean>;
    rectangle : Signal<RectangleF>;
    imageUrl: string | undefined;
  }

export default function RefreshingImage(props: RefreshingImageProps) {    
    const imageRef = useRef<HTMLImageElement | null>(null);
    const count = useSignal(0);
    const play  = useSignal(props.play.value);
    const canvasSize = useSignal({width:0, height:0})

    useEffect(() => {    
      
      const image = imageRef.current;
      
      image!.onload = () => {

          console.log('setting size', image!.width)
          canvasSize.value = {width: image!.width, height: image!.height};
          if (image!.width > 0) 
            image!.onload = null;  
      };
      
    },[]);

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
        <Canvas rectangle={props.rectangle} width={canvasSize.value.width} height={canvasSize.value.height} ></Canvas>
        <img ref={imageRef} src={`${props.imageUrl}?counter=${count.value}`}></img>         
        <div><Button onClick={() => play.value = !play.value}>{play.value ? "Stop": "Play"}</Button></div>
        {JSON.stringify(props.rectangle.value)}
    </div>
  );
}
