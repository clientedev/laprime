import os
import asyncio
import groq

async def main():
    try:
        client = groq.AsyncGroq(api_key=os.environ.get("GROQ_API_KEY"))
        completion = await client.chat.completions.create(
            messages=[{'role':'user', 'content':'oi'}],
            model='llama3-8b-8192'
        )
        print("Success:", completion.choices[0].message.content)
    except Exception as e:
        print("Error:", type(e).__name__, str(e))

asyncio.run(main())
