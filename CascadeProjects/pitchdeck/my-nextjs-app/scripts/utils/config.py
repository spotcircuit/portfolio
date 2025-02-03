"""Configuration utilities for managing config files."""

import os
import json
from typing import Dict, Any

class Config:
    _instance = None
    _config = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Config, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        if self._config is None:
            self._load_config()
    
    def _load_config(self):
        """Load configuration based on environment."""
        # Get environment from ENV var, default to development
        env = os.getenv('APP_ENV', 'development')
        
        # Load base config using Windows paths
        base_config_path = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
            'config',
            'base_config.json'
        )
        with open(base_config_path, 'r', encoding='utf-8') as f:
            self._config = json.load(f)
        
        # Load environment-specific config
        env_config_path = os.path.join(os.path.dirname(base_config_path), f'{env}.json')
        try:
            with open(env_config_path, 'r', encoding='utf-8') as f:
                env_config = json.load(f)
                # Merge configs
                self._config = self._merge_configs(self._config, env_config)
        except FileNotFoundError:
            # Environment config is optional
            pass
    
    def _merge_configs(self, base: Dict, override: Dict) -> Dict:
        """Deep merge two configs, with override taking precedence."""
        merged = base.copy()
        
        for key, value in override.items():
            if isinstance(value, dict) and key in merged and isinstance(merged[key], dict):
                merged[key] = self._merge_configs(merged[key], value)
            else:
                merged[key] = value
        
        return merged
    
    def get_path(self, *keys: str) -> str:
        """
        Get a path from the config.
        
        Args:
            *keys: Path keys to look up
            
        Returns:
            Absolute path
        """
        try:
            # Get path from config
            path = self._config.get('paths', {})
            for key in keys:
                if key is not None:
                    path = path[key]
            
            # Convert to absolute path
            if isinstance(path, str):
                return os.path.abspath(os.path.join(
                    os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
                    path.replace('/', '\\')  # Convert to Windows paths
                ))
            
            raise ValueError(f"Invalid path for keys: {keys}")
            
        except (KeyError, TypeError) as e:
            raise ValueError(f"Path not found for keys: {keys}")
    
    def get_file_path(self, *keys: str) -> str:
        """
        Get a file path from the config.
        
        Args:
            *keys: Path keys to look up
            
        Returns:
            Absolute path to the file
        """
        try:
            # Get path from config
            path = self._config.get('paths', {}).get('files', {})
            for key in keys:
                if key is not None:
                    path = path[key]
            
            # Convert to absolute path
            if isinstance(path, str):
                return os.path.abspath(os.path.join(
                    os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
                    path.replace('/', '\\')  # Convert to Windows paths
                ))
            
            raise ValueError(f"Invalid path for keys: {keys}")
            
        except (KeyError, TypeError) as e:
            raise ValueError(f"Path not found for keys: {keys}")

    def get_api_config(self, *keys: str) -> Any:
        """
        Get API configuration.
        
        Args:
            *keys: Config keys to look up
            
        Returns:
            API configuration value
        """
        try:
            value = self._config.get('api', {})
            for key in keys:
                if key is not None:
                    value = value[key]
            return value
        except (KeyError, TypeError) as e:
            raise ValueError(f"API config not found for keys: {keys}")

# Create global config instance
config = Config()

def get_project_root() -> str:
    """Get the project root directory."""
    return os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
