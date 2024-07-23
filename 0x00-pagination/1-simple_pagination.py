#!/usr/bin/env python3
"""simple Pagination."""
import math
import csv
from typing import List
index_range = __import__('0-simple_helper_function').index_range


class Server:
    """Server class to paginate a database of popular baby names."""

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """Initialize the class Server."""
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cache dataset."""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Return paginated list."""
        p = isinstance(page, int) and page > 0
        p_s = isinstance(page_size, int) and page_size > 0
        assert p and p_s
        try:
            res = index_range(page, page_size)
            start = res[0]
            stop = res[1]
            data_set = self.dataset()
            return data_set[start:stop]

        except IndexError:
            print([])
