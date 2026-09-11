@echo off
cd /d C:\Users\swpoe\Documents\Codex\2026-09-11\new-chat\match-shop-bot
start /min python server.py
timeout /t 3 /nobreak >nul
"C:\Users\swpoe\AppData\Roaming\npm\lt.cmd" --port 8080
