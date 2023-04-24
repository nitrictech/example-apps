from nitric.resources import api
from nitric.application import Nitric

from common import ping

myApi = api("main")


@myApi.post("/ping")
async def status(ctx):
    url = ctx.req.json['url']
    ctx.res.body = ping(url)


Nitric.run()
