import os


def ping(url):
    response = os.system("ping -c 1 " + url)

    if response == 0:
        return {'status': response < 400, 'url': url}
    else:
        return {'status': response < 400, 'url': url}
