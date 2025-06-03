@echo off
:: Kallitests installer for Windows

echo Installing Chocolatey (if not already installed)...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))"

echo Installing Git, Node.js, Python...
choco install git nodejs-lts python -y

echo Adding environment variables...
setx PATH "%PATH%;%ProgramFiles%\nodejs;%ProgramFiles%\Git\bin;%ProgramFiles%\Python311"

echo Installing Cypress...
npm install -g cypress

echo Setup complete.