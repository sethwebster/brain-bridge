import sys
import pandas as pd

input_file = sys.argv[1]
output_file = sys.argv[2]

df = pd.read_excel(input_file)
df = df.apply(lambda x: x.str.replace('\n', '<br>') if x.dtype == 'object' else x)

with open(output_file, 'w') as f:
    f.write(df.to_markdown())