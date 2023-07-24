import { Signal, useSignal } from "@preact/signals";
import { MutableRef, useEffect, useRef } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

interface CanvasProps extends JSX.HTMLAttributes<HTMLCanvasElement> {    
    rectangle: Signal<RectangleF>;
  }

export interface RectangleF {
    x: number;
    y: number;
    width: number;
    height: number;
}

export default function Canvas(props: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    

    const dragging = useSignal(false);
    const rectangle = props.rectangle;



    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const image = new Image();

        image.onload = () => {
            ctx?.drawImage(image, 0, 0, canvas?.width || 0, canvas?.height || 0);
        }        

        const handleMouseDown = (e: MouseEvent) => {
            const rect = canvas?.getBoundingClientRect();
            rectangle.value = {x: e.clientX - (rect?.left || 0), y: e.clientY - (rect?.top || 0), width: 0, height: 0};
            dragging.value = true;
        }

        const handleMouseUp = () => {
            dragging.value = false;
            console.log(rectangle.value); // You can replace this with storing the rectangle object
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (dragging.value) {
                const rect = canvas?.getBoundingClientRect();
                const width = (e.clientX - (rect?.left || 0)) - rectangle.value.x;
                const height = (e.clientY - (rect?.top || 0)) - rectangle.value.y;
                rectangle.value = {...rectangle.value, width: width, height: height};

                ctx?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
                ctx?.drawImage(image, 0, 0, canvas?.width || 0, canvas?.height || 0);
                ctx?.strokeRect(rectangle.value.x, rectangle.value.y, width, height);
            }
        }

        canvas?.addEventListener('mousedown', handleMouseDown);
        canvas?.addEventListener('mouseup', handleMouseUp);
        canvas?.addEventListener('mousemove', handleMouseMove);

        // Clean up event listeners
        return () => {
            canvas?.removeEventListener('mousedown', handleMouseDown);
            canvas?.removeEventListener('mouseup', handleMouseUp);
            canvas?.removeEventListener('mousemove', handleMouseMove);
        }
    }, [dragging.value, props.rectangle]);

    return (

        <canvas {...props} style={{position:'absolute'}} ref={canvasRef}></canvas>

    );
  }
  