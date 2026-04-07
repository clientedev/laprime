import urllib.request
import json
import ssl

url = "https://laprime-production-8a2e.up.railway.app/api/chat/"
data = json.dumps({"messages": [{"role": "user", "content": "Oi"}]}).encode("utf-8")
req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

try:
    with urllib.request.urlopen(req, context=ctx) as response:
        print("Status:", response.status)
        print("Body:", response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("HTTP Error Status:", e.code)
    print("Error Body:", e.read().decode('utf-8'))
except Exception as e:
    print("Error:", str(e))
