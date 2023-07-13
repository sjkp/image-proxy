import { HandlerContext } from "$fresh/server.ts";


export const handler = {
  async GET(_req: Request, _ctx: HandlerContext) {
    const t = new Date().getTime()
    var r = await fetch(`http://185.102.215.186/current/4578copyright!/kirunakommun_1_live.jpg?counter=${t}`)

    return r;
 }
};
