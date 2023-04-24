from nitric.faas import HttpMiddleware


async def run_first(ctx, nxt: HttpMiddleware):
    print("This is your middleware running ...")
    return await nxt(ctx)
