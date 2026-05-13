import os
import chromadb
from sentence_transformers import SentenceTransformer
from services.embedding_service import get_embedding

# Load embedding model


# Create ChromaDB client
client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection("consent_docs")

DOCS_FOLDER = "docs"

CHUNK_SIZE = 500
OVERLAP = 50


def chunk_text(text, chunk_size=500, overlap=50):
    chunks = []

    start = 0

    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)

        start += chunk_size - overlap

    return chunks


for filename in os.listdir(DOCS_FOLDER):

    if filename.endswith(".txt"):

        filepath = os.path.join(DOCS_FOLDER, filename)

        with open(filepath, "r") as f:
            text = f.read()

        chunks = chunk_text(text, CHUNK_SIZE, OVERLAP)

        for i, chunk in enumerate(chunks):

            embedding = get_embedding(chunk)

            collection.add(
                documents=[chunk],
                embeddings=[embedding],
                ids=[f"{filename}_{i}"]
            )

print("RAG pipeline completed successfully.")