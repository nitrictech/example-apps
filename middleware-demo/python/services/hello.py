from nitric.application import Nitric
from nitric.resources import api, ApiOptions

from middle import run_first

publicApi = api("public", ApiOptions(
    middleware=[run_first],
))


@publicApi.get("/hello")
async def get_profiles(ctx):
    print("This is  your main function running ...")

    ctx.res.body = "hello"


Nitric.run()
