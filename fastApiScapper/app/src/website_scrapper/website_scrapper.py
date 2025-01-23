import requests
from bs4 import BeautifulSoup
from typing import List, Dict, Optional, Any


class WebScraper:
    def __init__(self, url: str):
        self.url: str = url
        self.links: Optional[List[str]] = None
        self.paragraphs: Optional[List[str]] = None
        self.headers: Optional[Dict[str, List[str]]] = None
        self.ordered_lists: Optional[List[List[str]]] = None
        self.other_tags: Optional[Dict[str, List[str]]] = None

        # Fetch and parse the website content
        soup = self._fetch_content()

        # Populate extracted data
        self._extract_links(soup)
        self._extract_paragraphs(soup)
        self._extract_headers(soup)
        self._extract_ordered_lists(soup)
        self._extract_other_tags(soup)

    def _fetch_content(self) -> BeautifulSoup:
        """
        Fetch and parse the HTML content of the URL.
        """
        try:
            response = requests.get(self.url, timeout=10)  # Set a timeout for requests
            response.raise_for_status()  # Raise an exception for HTTP errors
        except requests.exceptions.RequestException as e:
            raise Exception(f"Failed to fetch the webpage: {e}")

        return BeautifulSoup(response.content, 'html.parser')

    def _extract_links(self, soup: BeautifulSoup) -> None:
        """
        Extract all hyperlinks from the webpage.
        """
        self.links = [a.get('href') for a in soup.find_all('a', href=True)]

    def _extract_paragraphs(self, soup: BeautifulSoup) -> None:
        """
        Extract all paragraphs from the webpage.
        """
        self.paragraphs = [p.get_text(strip=True) for p in soup.find_all(['p', 'div'])]

    def _extract_headers(self, soup: BeautifulSoup) -> None:
        """
        Extract all headers (H1 to H6) from the webpage.
        """
        self.headers = {
            f'h{i}': [header.get_text(strip=True) for header in soup.find_all(f'h{i}')]
            for i in range(1, 7)
        }

    def _extract_ordered_lists(self, soup: BeautifulSoup) -> None:
        """
        Extract all ordered list items from the webpage.
        """
        self.ordered_lists = [
            [li.get_text(strip=True) for li in ol.find_all('li')]
            for ol in soup.find_all('ol')
        ]

    def _extract_other_tags(self, soup: BeautifulSoup) -> None:
        """
        Extract content from other tags like divs, spans, images, etc.
        """
        self.other_tags = {
            tag: [element.get_text(strip=True) for element in soup.find_all(tag)]
            for tag in ['span', 'footer', 'header']
        }

    def to_dict(self) -> Dict[str, Any]:
        """
        Serialize the scraped data into a dictionary.
        """
        return {
            "url": self.url,
            "links": self.links,
            "paragraphs": self.paragraphs,
            "headers": self.headers,
            "orderedLists": self.ordered_lists,
            "otherTags": self.other_tags,
        }


# Example Usage
# if __name__ == "__main__":
#     try:
#         scraper = WebScraper("https://example.com")
#         data = scraper.to_dict()
#         print(data)
#     except Exception as e:
#         print(f"Error: {e}")
