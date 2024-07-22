#!/usr/bin/env python3
"""Index_range."""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple:
    """Return a tup with start index and end index of corresponding pages."""
    start_index = page_size * (page - 1)
    end_index = page_size * page
    tup = (start_index, end_index)
    return tup
