# Source Code Navigation
## This Repository Folders & Files

    - index.js  the main source file of this microservice, it contains all the logics of microservice APIs.
    - helper/ the directory that contains all the helper method.
    - usecase/ the directory that contains all the object class as add-ons to the main source file.
 
# microservice APIs

Base path is specified as environment variable during the deployment, default is set as: /iot/v1

So to make a request you need the full path: 

http://xxx.xxx.xxx:8083/iot/v1/{endpoint}

You can read about the APIs and endpoints in this microservice and check their functionalities on [SwaggerHub](https://app.swaggerhub.com/apis/mimik/mIoT/1.0.0)
