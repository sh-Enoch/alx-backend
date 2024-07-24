#!/usr/bin/env python3
"""BasicCache."""
BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """class BaseCaching."""

    def __init__(self):
        """Initialize class."""
        super().__init__()

    def put(self, key, item):
        """Assign key: item to dictionary."""
        if key and item:
            self.cache_data[key] = item
        else:
            pass

    def get(self, key):
        """Return value in cache."""
        if key in self.cache_data.keys():
            return self.cache_data[key]
        else:
            return None
