#!/bin/bash
concurrently "npm --prefix backend/ run dev" "npm --prefix frontend/ run dev"