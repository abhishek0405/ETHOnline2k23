
import json
from fastapi import FastAPI
from diffusers import StableDiffusionPipeline
from pydantic import BaseModel
from fastapi.responses import FileResponse
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
import torch
import requests
import io
from PIL import Image
import os
from dotenv import load_dotenv
from base64 import b64encode
import secrets
from langchain.llms import OpenAI


def generate_big_random_number(digits): return int(
    ''.join(str(secrets.randbelow(10)) for _ in range(digits)))


load_dotenv()


class PromptRequest(BaseModel):
    text: str


class EditRequest(BaseModel):
    url: str
    prompt: str


class ScriptRequest(BaseModel):
    characters: str
    baselinePlot: str


API_URL = os.getenv('API_URL')
API_KEY = os.getenv('API_KEY')
PINATA_API_KEY = os.getenv('PINATA_API_KEY')
PINATA_API_SECRET = os.getenv('PINATA_API_SECRET')
SD_API_KEY = os.getenv('SD_API_KEY')
SD_URL = os.getenv('SD_URL')
PINATA_JWT = os.getenv('PINATA_JWT')
OPEN_AI_KEY = os.getenv('OPEN_AI_KEY')
os.environ['OPENAI_API_KEY'] = OPEN_AI_KEY
print(SD_API_KEY)
print(SD_URL)
headers = {"Authorization": f"Bearer {API_KEY}"}

llm = OpenAI(temperature=0.6)


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend URL
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)


def toB64(imgUrl):
    return str(b64encode(requests.get(imgUrl).content))[2:-1]


@app.post("/generate")
async def generate(request: PromptRequest):
    prompt = request.text
    print('hi')
    print(prompt)
    payload = {
        "inputs": prompt,
        "options": {"wait_for_model": True}
    }
    data = json.dumps(payload)
    response = requests.post(API_URL, headers=headers, data=data)
    print(response)
    image = Image.open(io.BytesIO(response.content))
    image.save("./img.png")
    return FileResponse('./img.png')


@app.post("/edit")
async def edit(request: EditRequest):
    prompt = request.prompt
    print('trigerring edit api call')
    print(request)
    random_number = generate_big_random_number(9)
    data = {
        "image": toB64(request.url),
        "samples": 1,
        "prompt": request.prompt,
        "negative_prompt": "nude, disfigured, blurry, mangled ears, ugly, bad",
        "scheduler": "UniPC",
        "num_inference_steps": 25,
        "guidance_scale": 7.5,
        "strength": 1,
        "seed": random_number,
        "base64": False
    }

    response = requests.post(SD_URL, json=data, headers={
                             'x-api-key': SD_API_KEY})
    print(response)
    image = Image.open(io.BytesIO(response.content))
    image.save("./imgedit.png")
    return FileResponse('./imgedit.png')


@app.post("/generateScript")
async def edit(request: ScriptRequest):
    print("processing script gen")
    input_prompt = f'''
        Your task is to generate script for a manga comic.  You will be provided the character names and a baseline plot, you need to generate a script in manga style and break it down to smaller scenes. Each scene basically represents a manga strip which will be animated, So ensure to keep the scenes and dialogues within each scene small. Lets limit the total number of scenes to be less than 10. Try to generate a conclusive story within these constraints.

        Characters : {request.characters}

        Baseline plot : {request.baselinePlot}
        '''

    script = llm(input_prompt)

    print(script)
    return script
