from pydantic import BaseModel
from typing import List, Dict, Optional

class ScrapedData(BaseModel):
    headers: Optional[Dict[str, List[str]]]
    links: Optional[List[str]]
    paragraphs: Optional[List[str]]
    orderedLists: Optional[List[List[str]]]
    otherTags: Optional[Dict[str, List[str]]]