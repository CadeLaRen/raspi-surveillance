#!/bin/bash
set -e

# Configuration
screenName="videostream"

# Check execution privilege
if [ $(id -u) = 0 ]; then
    echo "Please do NOT run as root"
    exit 1
fi

# Stop videostream
if screen -list | grep -q $screenName; then
    screen -S $screenName -X quit
    echo "Stopped videostream in screen \"$screenName\""
else
    echo "Videostream is not running in screen \"$screenName\""
fi
