from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from model.forecast import predict_unemployment
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/forecast")
def get_forecast(country: str = Query(...)):
    result = predict_unemployment(country)
    return result

@app.get("/countries")
def get_countries():
    with open("country_list.json", "r") as f:
        countries = json.load(f)
    return {"countries": countries} 