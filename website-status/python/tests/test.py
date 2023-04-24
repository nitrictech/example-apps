import unittest
import os


class TestPing(unittest.TestCase):
    def test_ping_valid_url(self):
        result = ping("www.google.com")
        self.assertEqual(result, {'status': True, 'url': 'www.google.com'})

    def test_ping_invalid_url(self):
        result = ping("www.invalidurl123.com")
        self.assertEqual(
            result, {'status': False, 'url': 'www.invalidurl123.com'})


def ping(url):
    response = os.system("ping -c 1 " + url)

    if response == 0:
        return {'status': response < 400, 'url': url}
    else:
        return {'status': response < 400, 'url': url}


if __name__ == '__main__':
    unittest.main()
