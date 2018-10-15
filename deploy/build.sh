unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    MINGW*)     machine=MinGW;;
    *)          machine="UNKNOWN:${unameOut}"
esac

if [ ${machine} == "Mac" ] || [ ${machine} == "Linux" ]; then
  cp ../build/index.js ./
  sudo docker build -t iot-v1 .
  sudo docker save -o iot-v1.tar iot-v1
  sudo chmod 666 iot-v1.tar
  sudo docker rmi iot-v1       
elif [ ${machine} == "MinGW" ]; then
  cp ../build/index.js ./
  docker build -t iot-v1 .
  docker save -o iot-v1.tar iot-v1
  chmod 666 iot-v1.tar
  docker rmi iot-v1
fi

