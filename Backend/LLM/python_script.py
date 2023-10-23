import sys
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.decomposition import PCA

model_url = "https://tfhub.dev/google/universal-sentence-encoder/4"
model = hub.load(model_url)
print('Model Loaded')

def embed(texts):
    return model(texts)

df = pd.read_csv("Top_10000_Movies.csv", engine="python")
df = df[["original_title", "overview", "popularity"]]  # Include "popularity" in the data
df = df.dropna()
df = df.reset_index()
df = df[:5500]

titles = list(df['overview'])
embeddings = embed(titles)

nn = NearestNeighbors(n_neighbors=10)
nn.fit(embeddings)

def recommend(movie1, movie2):
    emb1 = embed([movie1])
    emb2 = embed([movie2])
    neighbors1 = nn.kneighbors(emb1, return_distance=False)[0]
    neighbors2 = nn.kneighbors(emb2, return_distance=False)[0]
    
    # Calculate recommendations based on popularity as well
    popularity_recommendations1 = df.nlargest(10, 'popularity')['original_title'].tolist()
    popularity_recommendations2 = df.nlargest(10, 'popularity')['original_title'].tolist()
    
    # Combine popularity-based recommendations with embeddings-based recommendations
    combined_recommendations = list(set(popularity_recommendations1 + popularity_recommendations2 + df['original_title'].iloc[neighbors1].tolist() + df['original_title'].iloc[neighbors2].tolist()))
    
    return combined_recommendations

movie1 = sys.argv[1]
movie2 = sys.argv[2]
combined_recommendations = recommend(movie1, movie2)

# Print recommendations to be captured by Node.js
for recommendation in combined_recommendations:
    print(recommendation)
