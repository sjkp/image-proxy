import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { PropertySignature } from "https://deno.land/x/ts_morph@17.0.1/ts_morph.js";
import { Card } from "../../components/Card.tsx";
import RefreshingImage from "../../islands/RefreshingImage.tsx";
import { useSignal } from "@preact/signals";
import { RectangleF } from "../../islands/Canvas.tsx";
import OverlayImage from "../../islands/OverlayImage.tsx";

export const handler: Handlers = {
    async GET(req, ctx) {
        if (ctx.params.id === '0')
        {
            return await ctx.render();    
        }
        const [res, res2] = await Promise.all([
        fetch(`${Deno.env.get('API')!}/camerametadata/${ctx.params.id}`),
        fetch(`${Deno.env.get('API')!}/cameracapture?filter=camerametadataid=${ctx.params.id}&sortOrder=Descending&sortBy=timestamp`)
        ]);
        
        const [data, captures] = await Promise.all([res.json(), res2.json()]);


        return await ctx.render({
            form: data,
            captures: captures
        });
    },   
    async POST(req, ctx) {
        
        const data: { [key: string]: string; } = await getFormData(req);
        let error = ''
        if (data.id == '0')
        {
            console.log('PUT');
            const res = await fetch(`${Deno.env.get('API')!}/camerametadata/${data.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              }).catch(err => {
                error = '' + err;
              });
              if (!error && res!.status !== 200)
              {
                error = res!.statusText;           
              }
              console.log(error);
              if (error)
              {
                return await ctx.render({
                    form: data,
                    status: error
                });
              }
    
    
              const json = await res!.json();
    
              return await ctx.render({
                form: json
            });
        }
                

       
        const res = await fetch(`${Deno.env.get('API')!}/camerametadata`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).catch(err => {
            error = '' + err;
          });
          if (!error && res!.status !== 201)
          {
            error = res!.statusText;           
          }
          console.log(error);
          if (error)
          {
            return await ctx.render({
                form: data,
                status: error
            });
          }


          const json = await res!.json();

        // Redirect user to thank you page.
        const headers = new Headers();
        headers.set("location", `/camera/${json.id}`);
        return new Response(null, {
            status: 303, // See Other
            headers,
        });
    },
};

async function getFormData(req: Request) {
  const form = await req.formData();

  const data: { [key: string]: string; } = {};
  form.forEach((entry, key) => {
    if(entry.toString())
      data[key] = entry.toString();
  });
  console.log(data);
  return data;
}

export default function New(props: PageProps) {
    const play = useSignal(false);
    const rectangle = useSignal<RectangleF>({x: 0, y: 0, width: 0, height: 0});
    const url = Deno.env.get('API');
    const isNewForm = props.params.id === '0';
    return (
        <>            
            <div class="antialiased text-gray-900 px-6">
                <div class="max-w-xl mx-auto py-12 md:max-w-4xl">
                    <h2 class="text-4xl font-extrabold dark:text-white">{ isNewForm ? 'Create new camera' : 'Edit camera'}</h2>
                    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div class="grid grid-cols-1 gap-6">
                        <div class={`p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 ${!props.data?.status && 'hidden'}`} role="alert">
                            {props.data?.status}
                            </div>
                            <form autocomplete="off" method="post">
                                <input type="hidden" name="id" value={props.data?.form?.id}></input>
                                <label class="block">
                                    <span class="text-gray-700">Name</span>
                                    <input
                                        type="text"
                                        name="name"
                                        class="form-input mt-1 block w-full"
                                        placeholder=""
                                        value={props.data?.form?.name}
                                    />
                                </label>

                                <label class="block">
                                    <span class="text-gray-700">Source</span>
                                    <input
                                        type="url"
                                        name="sourceUrl"
                                        class="form-input mt-1 block w-full border" //border-red-300 dark:border-red-800
                                        placeholder="url to image source"
                                        value={props.data?.form?.sourceUrl}
                                    />
                                </label>
                                <label class="block">
                                <span class="text-gray-700">Source Type</span>
                                <select name="type" id="type" class="form-select block w-full mt-1">
                                    {['Image','Mjpeg','Rtsp'].map(s => {
                                        return <option value={s} selected={props.data?.form?.type===s}>{s}</option>
                                    })}                                    
                                </select>
                                </label>       
                                <div class="mt-10">
                                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >Create</button>
                                </div>                         
                            </form>
                        </div>
                    </div>
                </div>

                <RefreshingImage imageUrl={props.data?.form?.sourceUrl} rectangle={rectangle} play={play} ></RefreshingImage>
                <OverlayImage imageUrl={props.data?.form?.sourceUrl} rectangle={rectangle} apiUrl={`${url}/analyze`}></OverlayImage>
            {/* List of last 10 pictures taken */}
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">                   
                    {props.data.captures.map(item => {
                        return (<Card link={`${url}${item.imageUrl}`} title={item.timestamp} imageUrl={`${url}${item.imageUrl}`}></Card>)
                    })}
            </div>
            </div>
        </>
    );
}
