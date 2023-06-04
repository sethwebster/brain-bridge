# About
Converts a batch of documents into Markdown


# Building
docker build -t md_maker:latest . 


# Executing 
docker run -it -v /Users/aeden/Downloads/drive-download-20230531T022545Z-001:/docs md_maker:latest /docs

# Executing Recursively
docker run -it -v /Users/aeden/Downloads/drive-download-20230531T022545Z-001:/docs md_maker:latest /docs -r 