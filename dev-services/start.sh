#!/bin/sh
cd milvus && docker compose up -d && \
cd .. && cd postgres && docker compose up -d