"""Test script to verify imports and path handling."""

import os
import sys
import importlib
import traceback
from typing import List, Tuple

# Add project root to path
project_root = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
sys.path.insert(0, project_root)

def test_module_imports(module_path: str) -> Tuple[bool, str]:
    """
    Test if a module can be imported successfully.
    
    Args:
        module_path: Dot-separated path to module (e.g., 'scripts.utils.config')
        
    Returns:
        Tuple of (success, error_message)
    """
    try:
        importlib.import_module(module_path)
        return True, f"✓ Successfully imported {module_path}"
    except Exception as e:
        return False, f"✗ Failed to import {module_path}: {str(e)}\n{traceback.format_exc()}"

def test_file_paths() -> List[Tuple[bool, str]]:
    """Test if critical paths exist and are accessible."""
    from scripts.utils.config import config
    
    results = []
    paths_to_test = [
        ('config', None),
        ('config', 'api'),
        ('config', 'video'),
        ('data', None),
        ('data', 'leads'),
        ('data', 'output'),
        ('data', 'logs'),
    ]
    
    for path_parts in paths_to_test:
        try:
            if len(path_parts) == 2 and path_parts[1] is None:
                path = config.get_path(path_parts[0])
            else:
                path = config.get_path(*path_parts)
            
            exists = os.path.exists(path)
            results.append((
                exists,
                f"{'✓' if exists else '✗'} Path {'exists' if exists else 'missing'}: {path}"
            ))
        except Exception as e:
            results.append((False, f"✗ Error checking path {path_parts}: {str(e)}"))
    
    return results

def main():
    """Run all tests."""
    print("\n=== Testing Module Imports ===")
    modules_to_test = [
        'scripts.utils.config',
        'scripts.utils.logging',
        'scripts.jogg_api.client',
        'scripts.jogg_api.avatars',
        'scripts.commands.leads.grab',
        'scripts.commands.leads.update',
        'scripts.commands.video.generate',
    ]
    
    import_results = [test_module_imports(m) for m in modules_to_test]
    for success, message in import_results:
        print(message)
    
    print("\n=== Testing File Paths ===")
    path_results = test_file_paths()
    for success, message in path_results:
        print(message)
    
    # Calculate summary
    total_tests = len(import_results) + len(path_results)
    passed_tests = sum(1 for success, _ in import_results + path_results if success)
    
    print(f"\n=== Test Summary ===")
    print(f"Total Tests: {total_tests}")
    print(f"Passed: {passed_tests}")
    print(f"Failed: {total_tests - passed_tests}")
    
    # Exit with status code
    sys.exit(0 if passed_tests == total_tests else 1)

if __name__ == "__main__":
    main()
