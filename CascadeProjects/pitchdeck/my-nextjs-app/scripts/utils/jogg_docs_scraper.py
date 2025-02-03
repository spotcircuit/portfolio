import requests
from bs4 import BeautifulSoup
import markdown
import time
from urllib.parse import urljoin
import os

# List of URLs to scrape
urls = [
    "https://docs.jogg.ai/welcome",
    "https://docs.jogg.ai/api-reference/QuickStart/GettingStarted",
    "https://updates.jogg.ai/roadmap",
    "https://updates.jogg.ai/changelog",
    "https://updates.jogg.ai/",
    "https://docs.jogg.ai/api-reference/API%20Documentation/CreateVideoFromURL",
    "https://docs.jogg.ai/api-reference/API%20Documentation/CreatVideoFormTemplate",
    "https://docs.jogg.ai/api-reference/API%20Documentation/AIScripts",
    "https://docs.jogg.ai/api-reference/API%20Documentation/Webhook",
    "https://docs.jogg.ai/api-reference/URL-to-Video/UploadURL",
    "https://docs.jogg.ai/api-reference/URL-to-Video/UpdateProduct",
    "https://docs.jogg.ai/api-reference/URL-to-Video/CreateVideo",
    "https://docs.jogg.ai/api-reference/URL-to-Video/GeneratePreview",
    "https://docs.jogg.ai/api-reference/Create-Avatar-Videos/CreateAvatarVideo",
    "https://docs.jogg.ai/api-reference/GetGeneratedVideo/GetGeneratedVideo",
    "https://docs.jogg.ai/api-reference/AI-Scripts/AI-Scripts",
    "https://docs.jogg.ai/api-reference/UploadFile/UploadFile",
    "https://docs.jogg.ai/api-reference/Avatar/GetAvatarList",
    "https://docs.jogg.ai/api-reference/Avatar/GetInstantAvatar",
    "https://docs.jogg.ai/api-reference/Voice/GetVoiceList",
    "https://docs.jogg.ai/api-reference/Voice/GetMyVoice",
    "https://docs.jogg.ai/api-reference/Visual-Style/GetVisualStyle",
    "https://docs.jogg.ai/api-reference/Template/GetTemplate",
    "https://docs.jogg.ai/api-reference/Template/GetMyTemplate",
    "https://docs.jogg.ai/api-reference/Music/GetMusic",
    "https://docs.jogg.ai/api-reference/Webhook/ListofWebhookEndpoints",
    "https://docs.jogg.ai/api-reference/Webhook/AddWebhookEndpoint",
    "https://docs.jogg.ai/api-reference/Webhook/UpdateWebhookEndpoint",
    "https://docs.jogg.ai/api-reference/Webhook/DeleteWebhookEndpoint",
    "https://docs.jogg.ai/api-reference/Webhook/ListofAvailableWebhookEvents"
]

def fetch_page_content(url):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.text
    except Exception as e:
        print(f"Error fetching {url}: {str(e)}")
        return None

def parse_content(html, url):
    try:
        soup = BeautifulSoup(html, 'html.parser')
        
        # Get the title
        title = soup.find('h1')
        title_text = title.text if title else url.split('/')[-1].replace('-', ' ')
        
        # Get the main content
        content = soup.find('article') or soup.find('main') or soup.find('div', class_='content')
        if content:
            # Convert relative URLs to absolute
            for a in content.find_all('a', href=True):
                a['href'] = urljoin(url, a['href'])
            
            # Convert relative image sources to absolute
            for img in content.find_all('img', src=True):
                img['src'] = urljoin(url, img['src'])
            
            return f"# {title_text}\n\nSource: {url}\n\n{content.get_text(separator='\n', strip=True)}\n\n---\n\n"
        return f"# {title_text}\n\nSource: {url}\n\nNo content could be extracted.\n\n---\n\n"
    except Exception as e:
        print(f"Error parsing {url}: {str(e)}")
        return f"# Error parsing {url}\n\nAn error occurred while parsing this page.\n\n---\n\n"

def main():
    output_dir = "jogg_docs"
    os.makedirs(output_dir, exist_ok=True)
    
    # Create main documentation file
    with open(os.path.join(output_dir, "jogg_documentation.md"), "w", encoding="utf-8") as f:
        f.write("# Jogg.ai Documentation\n\n")
        f.write("This documentation was automatically compiled from the Jogg.ai website and API references.\n\n")
        f.write("## Table of Contents\n\n")
        
        # Write table of contents
        for url in urls:
            page_name = url.split('/')[-1].replace('-', ' ')
            f.write(f"- [{page_name}](#{page_name.lower().replace(' ', '-')})\n")
        
        f.write("\n---\n\n")
        
        # Fetch and write content for each URL
        for url in urls:
            print(f"Processing {url}...")
            content = fetch_page_content(url)
            if content:
                parsed_content = parse_content(content, url)
                f.write(parsed_content)
            time.sleep(1)  # Be nice to the server
    
    print(f"\nDocumentation has been saved to {os.path.join(output_dir, 'jogg_documentation.md')}")

if __name__ == "__main__":
    main()
