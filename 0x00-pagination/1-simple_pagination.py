#!/usr/bin/env python3
"""simple Pagination."""
index_range = __import__('0-simple_helper_function').index_range
import csv
import math
from typing import List


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
            #assert both args are integers greater than 0.
            #index range to find the correct indexed to paginate the data set and return the 
            #appropriate page of the dataset
            #If inputs are out of range for dataset an empty list should be returned.

            p = isinstance(page, int) and page > 0
            p_s = isinstance(page_size, int) and page_size > 0
            assert p and p_s
            try:
                res = index_range(page, page_size)
                start = res[0]
                stop = res[1]
                data_set  = self.dataset()
                return data_set[start:stop]

            except IndexError:
                print([])
