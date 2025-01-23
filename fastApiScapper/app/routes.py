import json

from fastapi import APIRouter, Query

from app.schemas import ScrapedData
from app.src.website_scrapper.website_scrapper import WebScraper

router = APIRouter()


@router.get("/scrape", response_model=ScrapedData)
async def get_scrapped_data(url: str = Query(...)):
    scraper = WebScraper(url)
    return scraper.to_dict()

@router.get("/example")
async def example_endpoint():
    return {"message": "This is an example endpoint!"}

# @router.post("/items", response_model=ItemResponse)
# async def create_item(item: Item, user: str = Depends(get_current_user)):
#     return {"id": 1, "name": item.name, "owner": user}
