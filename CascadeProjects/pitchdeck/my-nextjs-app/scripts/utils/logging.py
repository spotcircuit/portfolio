"""Logging configuration for the project."""

import os
import logging
from datetime import datetime

def setup_logging(name: str = None) -> logging.Logger:
    """
    Set up logging configuration.
    
    Args:
        name: Optional name for the logger
        
    Returns:
        Configured logger instance
    """
    logger = logging.getLogger(name or __name__)
    
    if not logger.handlers:
        logger.setLevel(logging.INFO)
        
        # Create formatters and handlers
        console_formatter = logging.Formatter(
            '%(asctime)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S'
        )
        
        file_formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        
        # Console handler
        console_handler = logging.StreamHandler()
        console_handler.setFormatter(console_formatter)
        logger.addHandler(console_handler)
        
        # File handler
        log_dir = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
            'data',
            'logs'
        )
        os.makedirs(log_dir, exist_ok=True)
        
        log_file = os.path.join(
            log_dir,
            f'app_{datetime.now().strftime("%Y%m%d")}.log'
        )
        
        file_handler = logging.FileHandler(log_file)
        file_handler.setFormatter(file_formatter)
        logger.addHandler(file_handler)
    
    return logger
