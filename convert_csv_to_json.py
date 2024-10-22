import pandas as pd

# Cargar el archivo CSV
df = pd.read_csv('verbs.csv')

# Convertir a JSON
df.to_json('verbs.json', orient='records', lines=False)