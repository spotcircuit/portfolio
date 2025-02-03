#!/usr/bin/env python3
"""Test module imports and configurations."""

import os
import sys
import json
import importlib
from typing import Dict, Any, Optional

# Add project root to Python path
project_root = os.path.dirname(os.path.dirname(__file__))
sys.path.insert(0, project_root)

def test_import(module_name: str) -> Optional[Dict[str, Any]]:
    """Test importing a module and return any error."""
    try:
        importlib.import_module(module_name)
        print(f"✓ Successfully imported {module_name}")
        return None
    except Exception as e:
        print(f"✗ Failed to import {module_name}: {str(e)}")
        return {"module": module_name, "error": str(e)}

def test_file_exists(path: str) -> Optional[Dict[str, Any]]:
    """Test if a file exists and return any error."""
    try:
        if os.path.exists(path):
            print(f"✓ Path exists: {path}")
            return None
        else:
            error = f"Path does not exist: {path}"
            print(f"✗ {error}")
            return {"path": path, "error": error}
    except Exception as e:
        print(f"✗ Error checking path {path}: {str(e)}")
        return {"path": path, "error": str(e)}

def main():
    """Run all tests."""
    errors = []
    
    print("\n=== Testing Module Imports ===")
    
    # Test core utilities
    modules_to_test = [
        "scripts.utils.config",
        "scripts.utils.logging",
        "scripts.jogg_api.client",
    ]
    
    # Test command modules
    modules_to_test.extend([
        "scripts.commands.video.generate",
        "scripts.commands.leads.grab",
        "scripts.commands.leads.update",
    ])
    
    # Test root scripts
    modules_to_test.extend([
        "generate_video",
        "get_product_id",
        "update_product",
        "jogg_flow",
    ])
    
    for module in modules_to_test:
        if error := test_import(module):
            errors.append(error)
    
    print("\n=== Testing Required Paths ===")
    paths_to_test = [
        project_root,
        os.path.join(project_root, "config"),
        os.path.join(project_root, "data"),
        os.path.join(project_root, "data", "leads"),
        os.path.join(project_root, "data", "output"),
        os.path.join(project_root, "data", "logs"),
    ]
    
    for path in paths_to_test:
        if error := test_file_exists(path):
            errors.append(error)
    
    print("\n=== Test Summary ===")
    total = len(modules_to_test) + len(paths_to_test)
    failed = len(errors)
    passed = total - failed
    print(f"Total Tests: {total}")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if errors:
        print("\n=== Failed Tests ===")
        for error in errors:
            if "module" in error:
                print(f"Module: {error['module']}")
                print(f"Error: {error['error']}")
            else:
                print(f"Path: {error['path']}")
                print(f"Error: {error['error']}")
            print()
        sys.exit(1)
    else:
        print("\nAll tests passed!")
        sys.exit(0)

if __name__ == "__main__":
    main()
