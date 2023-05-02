from nitric.resources import api, bucket
from nitric.application import Nitric

img_api = api("main")
img_bucket = bucket('assets').allow('reading')


@img_api.get("/images/:id/download")
async def download(ctx):
    image_id = ctx.req.params['id']

    img = img_bucket.file(f'images/{image_id}/photo.png')
    url = await img.download_url()

    ctx.res.body = url


@img_api.get("/images/:id/upload")
async def upload(ctx):
    img_id = ctx.req.params['id']

    img = img_bucket.file(f'images/{img_id}/photo.png')
    url = await img.upload_url()

    ctx.res.body = url

Nitric.run()
