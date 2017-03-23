
# pylint: disable=invalid-name

import sqlite3
import numpy as np
import pandas as pd

conn = sqlite3.connect('abcd')

c = conn.cursor()

c.execute('SELECT * FROM prices')
print c.fetchall()

conn.close()
