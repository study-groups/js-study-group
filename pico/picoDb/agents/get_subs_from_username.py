import re
import sys
from playwright.sync_api import sync_playwright

def extract_number(text):
    """
    Extracts the first sequence of digits from a provided string and returns it.
    If no digits are found, returns None.
    
    Args:
    text (str): The string from which to extract the number.

    Returns:
    str: The extracted number as a string, or None if no number is found.
    """
    match = re.search(r'\d+', text)
    if match:
        return match.group()
    else:
        return None

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    
    # Take the URL from the command line arguments
    if len(sys.argv) < 2:
        print("Usage: python script.py <YouTube URL>")
        sys.exit(1)
    url = sys.argv[1]

    page.goto(url)

    subscribers_xpath = "//*[@id='subscriber-count']"
    page.wait_for_selector(f'xpath={subscribers_xpath}')
    subscriber_count_text = page.text_content(f'xpath={subscribers_xpath}')
    
    subscriber_count = extract_number(subscriber_count_text)
    if subscriber_count:
        print(f"{subscriber_count}")
    else:
        print("Subscriber count not found.")

    browser.close()

if __name__ == '__main__':
    with sync_playwright() as playwright:
        run(playwright)
