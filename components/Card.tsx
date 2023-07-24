import { ComponentChildren } from "https://esm.sh/v128/preact@10.15.1/src/index.js";

interface CardProps {
    title?: string;
    imageUrl?: string;
    link?: string;
    children?: ComponentChildren
  }

export function Card(props: CardProps) {
    return (
        <div class="h-auto max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href={props.link}>
                <img class="rounded-t-lg" src={props.imageUrl} alt="" />
            </a>
            {(props.children || props.title) && <div class="p-5">
                {props.title && <a href={props.link}>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h5>
                </a>}
                {props.children}
            </div>}
        </div>
    )
}