
import sqlite3

conn = sqlite3.connect('pxdb')

c = conn.cursor()

c.execute('SELECT * FROM hist_prices_uniq')
print(c.fetchall())

conn.close()
