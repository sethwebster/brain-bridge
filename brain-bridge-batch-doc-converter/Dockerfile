# Use the latest Ubuntu version as the base image
FROM ubuntu:latest

# Install Pandoc, Python, NodeJs, and NPM
RUN apt-get update 
RUN apt-get install -y pandoc python3 poppler-utils python3-pip git
RUN rm -rf /var/lib/apt/lists/*

RUN pip install pptx2md
RUN pip install pandas
RUN pip install openpyxl
RUN pip install tabulate
RUN pip install xlrd

# Copy the startup script into the Docker image and make it executable
COPY startup.sh /startup.sh
COPY convert_xls_to_md.py /convert_xls_to_md.py
RUN chmod +x /startup.sh

# Specify the script we want to run when the container launches
ENTRYPOINT ["/startup.sh"]

