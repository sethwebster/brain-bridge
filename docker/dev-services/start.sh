#!/bin/sh
cd postgres && docker compose up -d
cd weaviate && docker compose up -d