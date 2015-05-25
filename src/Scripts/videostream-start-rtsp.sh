#!/bin/sh
set -e

# Configuration
screenName="videostream"

videoWidth=1280
videoHeight=720
videoFPS=24

streamPort=8554

# Check execution privilege
if [ $(id -u) = 0 ]; then
    echo "Please do NOT run as root"
    exit 1
fi

# Prepare videostream
# TODO: Test without
#export DISPLAY=:0
#$startx&

# Start videostream
if screen -list | grep -q $screenName; then
    echo "Videostream is already running in screen \"$screenName\""
else
    echo "Starting RTSP videostream on port $streamPort (${videoWidth}x${videoHeight}p, ${videoFPS}FPS) in screen \"$screenName\""

    screen -dmS $screenName \
      raspivid -o - -t 0 -n -w $videoWidth -h $videoHeight -fps $videoFPS \
      | cvlc stream:///dev/stdin --sout '#rtp{sdp=rtsp://:'$streamPort'/}' :demux=h264
fi