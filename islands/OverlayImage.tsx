import type { Signal } from "@preact/signals";
import { signal, useSignal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { useEffect, useMemo } from "preact/hooks";
import { RectangleF } from "./Canvas.tsx";
import { config as dotEnvConfig } from 'https://deno.land/x/dotenv@v1.0.1/mod.ts';
import { Handlers } from "$fresh/server.ts";

interface OverlayImageProps { 
    rectangle: Signal<RectangleF>;   
    apiUrl: string;
    imageUrl: string;
  }

  export interface Prediction {
    label: Label
    score: number
    rectangle: Rectangle
  }
  
  export interface Label {
    id: number
    name: string
    color: Color
    kind: number
  }
  
  export interface Color {}
  
  export interface Rectangle {
    x: number
    y: number
    width: number
    height: number
    location: Location
    size: Size
    isEmpty: boolean
    top: number
    right: number
    bottom: number
    left: number
  }
  
  export interface Location {
    x: number
    y: number
    isEmpty: boolean
  }
  
  export interface Size {
    width: number
    height: number
    isEmpty: boolean
  }
  

interface AnalyzeResponse {
  image: string;
  predictions : Prediction[];
}

export default function OverlayImage(props: OverlayImageProps) {    
    const count = useSignal(0);
    const disabled  = useSignal(false);
    const data = useSignal<AnalyzeResponse | null>(null);    
    
    useEffect(() => {
       
       console.log(disabled.value)
       const getData = async () => {
        const res = await fetch(props.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({            
            url: props.imageUrl,
            bounds: props.rectangle.value.width * props.rectangle.value.height > 0 ? props.rectangle.value : null
          })
        });
        const json = await res.json();
        data.value = json;
        disabled.value = false;
       };
       


       getData().catch(console.error);
       
       
      },[count.value]);

  const groupPredictions = () => {
    return data.value?.predictions.reduce<{ [key: string]: number }>((prev, cur, i) => {return {...prev, [cur.label.name]: Object.hasOwn(prev, cur.label.name) ? prev[cur.label.name]+1 : 1}}, {}) || {};
  }

  const numberOfVehicles = useMemo(() => {
    const predictions = groupPredictions();
    return Object.getOwnPropertyNames(predictions).reduce<number>((prev, cur,i) => { return prev + (['car', 'truck','bus'].indexOf(cur)>-1? predictions[cur]:0)},0);
  },[data.value]);

  return (
    <div>
      {
      data.value && <>
        <img src={`data:image/png;base64,${data.value.image}`}></img>         
        <div><Button disabled={disabled.value} onClick={() => {count.value++; disabled.value = !disabled.value}}>Refresh</Button></div>
        {JSON.stringify(groupPredictions())}
        <p>Number of vechicles {numberOfVehicles}</p>
        <p>At {((numberOfVehicles/30)*100).toFixed(0)} % capacity</p>
        </>              
      }
    </div>
  );
}
