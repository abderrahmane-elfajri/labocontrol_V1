@echo off
title Labocontrol Local Server
echo ========================================================
echo       LABOCONTROL - SERVEUR LOCAL DE DEVELOPPEMENT
echo ========================================================
echo.
echo Demarrage du serveur sur http://localhost:8000 ...
echo.
start http://localhost:8000/design_files/terrain/index.html
python -m http.server 8000
pause
