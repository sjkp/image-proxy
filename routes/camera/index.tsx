import { Handlers, PageProps } from "$fresh/server.ts";
import { PropertySignature } from "https://deno.land/x/ts_morph@17.0.1/ts_morph.js";
import { Card } from "../../components/Card.tsx";
import { mapContentType } from "https://deno.land/x/esbuild_deno_loader@0.7.0/src/shared.ts";


export const handler: Handlers = {
    async GET(req, ctx) {
        
        const res = await fetch(`${Deno.env.get('API')!}/camerametadata`);

        const data = await res.json();


        return await ctx.render({
            metadata: data
        });
    }
}

export default function ListCamera(props: PageProps) {
    var url = Deno.env.get('API');
    return (
        <>
            <div>

                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                    <Card><a href="/camera/0">Add new camera</a></Card>
                    </div>
                    {props.data.metadata.map(item => {
                        return (<Card link={`/camera/${item.id}`} title={item.name} imageUrl={`${url}/images/${item.id?.toString().padStart(10,'0')}/latest.png`}></Card>)
                    })}
{/*                   
                    <div>
                        <div class="h-auto max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img class="rounded-t-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg" alt="" />
                            </a>
                            <div class="p-5">
                                <a href="#">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                </a>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Read more
                                    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div> */}
                </div>
               

            </div>
        </>
    );
}