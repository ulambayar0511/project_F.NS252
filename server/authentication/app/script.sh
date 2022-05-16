#!/bin/bash

secret = $(openssl rand -base64 32)
echo "SECRET: $secret" > .env