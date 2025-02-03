import sys
import time
import logging
import json
import os
import dotenv
from jogg_api import JoggAPIClient

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# API Status Codes
API_SUCCESS = 0
API_NOT_FOUND = 10104
API_INVALID_KEY = 10105
API_NO_CREDIT = 18020
API_NO_PERMISSION = 18025
API_PARAM_ERROR = 40000
API_SYSTEM_ERROR = 50000

# Video Status Codes
VIDEO_START = 1        # start
VIDEO_WAITING = 2      # waiting
VIDEO_PROCESSING = 3   # processing
VIDEO_SUCCESS = 4      # success
VIDEO_FAILED = 5       # failed
VIDEO_DELETED = 99     # deleted

def check_video_status(api_key, project_id, max_retries=60, delay=5):
    """
    Check video status until it's complete or max retries reached.
    Returns: dict with full status information
        {
            "status": "success" | "failed" | "processing" | "error",
            "video_url": str | None,
            "error": str | None,
            "details": {
                "status_code": int,
                "status_desc": str,
                "video_duration": int,
                "created_at": int,
                ...
            }
        }
    """
    client = JoggAPIClient(api_key)
    retries = 0
    
    while retries < max_retries:
        try:
            response = client.check_video_status(project_id)
            logger.info(f"Status check response: {response}")
            
            api_code = response.get('code')
            if api_code == API_SUCCESS:
                data = response.get('data', {})
                status_code = data.get('status_code')
                status_desc = data.get('status_desc', '')
                
                result = {
                    "details": data,
                    "error": None,
                    "video_url": data.get('video_url')
                }
                
                if status_code == VIDEO_SUCCESS:
                    result["status"] = "success"
                    logger.info(f"Video completed! URL: {result['video_url']}")
                    return result
                elif status_code == VIDEO_FAILED:
                    result["status"] = "failed"
                    result["error"] = f"Video generation failed: {status_desc}"
                    logger.error(result["error"])
                    return result
                elif status_code == VIDEO_DELETED:
                    result["status"] = "failed"
                    result["error"] = "Video was deleted"
                    logger.error(result["error"])
                    return result
                else:  # VIDEO_START, VIDEO_WAITING, VIDEO_PROCESSING
                    logger.info(f"Status: {status_desc} (code: {status_code})")
                    if retries == max_retries - 1:
                        result["status"] = "processing"
                        return result
            elif api_code == API_NOT_FOUND:
                return {"status": "error", "error": "Project not found", "video_url": None}
            elif api_code == API_INVALID_KEY:
                return {"status": "error", "error": "Invalid API key", "video_url": None}
            elif api_code == API_NO_CREDIT:
                return {"status": "error", "error": "Insufficient credit", "video_url": None}
            elif api_code == API_NO_PERMISSION:
                return {"status": "error", "error": "No permission to call APIs", "video_url": None}
            elif api_code == API_PARAM_ERROR:
                return {"status": "error", "error": "Parameter error", "video_url": None}
            else:
                return {"status": "error", "error": "System error", "video_url": None}
                
        except Exception as e:
            logger.error(f"Error checking status: {str(e)}")
            return {"status": "error", "error": str(e), "video_url": None}
        
        retries += 1
        if retries < max_retries:
            time.sleep(delay)
    
    return {"status": "processing", "error": "Still processing after max retries", "video_url": None}

def main():
    # Load environment variables
    dotenv.load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local'))
    api_key = os.getenv('JOGG_API_KEY')
    if not api_key:
        print("Error: JOGG_API_KEY not found in environment variables")
        sys.exit(1)

    if len(sys.argv) != 2:
        print("Usage: python check_video_status.py <project_id>")
        sys.exit(1)
    
    project_id = sys.argv[1]
    
    print(f"\nChecking status for project: {project_id}")
    print("This may take a few minutes...")
    
    result = check_video_status(api_key, project_id)
    
    # Output clean result
    if result["status"] == "success":
        print("\nVideo is ready!")
        print(f"URL: {result['video_url']}")
    elif result["status"] == "processing":
        print("\nVideo is still processing")
    else:
        print(f"\nError: {result['error']}")
    
    # Also output JSON for scripting
    print("\nFull response:")
    print(json.dumps(result, indent=2))
    
    # Exit with appropriate code
    if result["status"] == "success":
        sys.exit(0)
    elif result["status"] == "processing":
        sys.exit(2)
    else:  # error or failed
        sys.exit(1)

if __name__ == "__main__":
    main()
