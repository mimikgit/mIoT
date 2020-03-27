# mIoT

This open source mIoT microservice created by the mimik team is an example IoT (Internet of Thing) solution for developers to share sensor payloads and notifications across sensors and devices. More specifically, this edgeSDK microservice has the following functionality:

1. Uploading sensor's data payload to other sensors or devices on the network.

2. A new notification will be pushed to other devices after the payload is received.

# Releases & Deployment

For latest update: https://developer.mimik.com/resources/tutorials/develop

<h2> How to obtain the built-version of this microservice?</h2>

Please visit the [releases section](https://github.com/mimikgit/mIoT/releases) of this GitHub page to download the ready-to-deploy container image file of this microservice.

<h2>How to deploy this microservice on edgeSDK?<a name="deploy"></a></h2>

1. Please make sure that you have downloaded the [latest edgeSDK](https://github.com/mimikgit/edgeSDK/releases) and it is [running correctly](https://github.com/mimikgit/edgeSDK/wiki/Installation-Guide) on your targeted development platform.

2. Please check that you have performed all the following prerequisite steps to setup you edgeSDK on your targeted platform:

    1) Register yourself on mimik's [developer portal](https://developer.mimik.com/) and add your application information to the portal to get authorization of edgeSDK access. **Note: For information about Redirect URL, please go to [link](https://developer.okta.com/blog/2018/04/10/oauth-authorization-code-grant-type).** <br/><br/>**Attention: Please safe keep your App-ID and Redirect URL for OAuth authorization later on.**<br/><br/>
    2) Get your **edgeSDK access token** from following OAuth tool of your targeted platform: <br/><br/>Please read this on how to use the OAuth tool: [Instruction on How to use the OAuth tool](https://github.com/mimikgit/edgeSDK/tree/master/tools/oauthtool).<br/><br/>
[OAuthtool application](https://developer.mimik.com/resources/downloads/?asset=edgeSDKTool)<br/><br/>**Attention: Please safe keep your edgeSDK access token for later deployment use.**<br/><br/>
    3) If you have not downloaded the latest built version of the microservice at [here](https://github.com/mimikgit/mIoT/releases), please download it now.
3) Now you are ready to deploy this microservice on the edgeSDK, please run the following command on the bash terminal: <br/>**Note: For Windows user, please download [Cygwin](https://cygwin.com/install.html) or [Git Bash](https://git-scm.com/downloads) to perform this.**<br/><br/>**Attention: Please run the following commend under the same directory of your downloaded microservice file.**<br/><br/>

    The following curl command is for deploying this microservice to the edgeSDK:

    ```curl -i -H 'Authorization: Bearer **Replace withYourToken**' -F "image=@iot-v1.tar" http://localhost:8083/mcm/v1/images```

    The following curl command is for specifying the environment variable:

    **Note**: You can always specify your own PUB_TOPIC and PUB_URI below to handle notifications and categorize the data payload.

    ```curl -i -H 'Authorization: Bearer **ReplacewithYourToken**' -d '{"name": "iot-v1", "image": "iot-v1", "env": {"MCM.BASE_API_PATH": "/iot/v1", "MATCH": "iot-v1", "uMDS": "http://127.0.0.1:8083/mds/v1", "PUB_URI": "iot/v1/notification", "PUB_TOPIC": "Data"} }' http://localhost:8083/mcm/v1/containers```

4) The output of the above command will return status code of 200 after the deployment is successful.

5) Now you can read about the APIs in this microservice and check their functionalities on [SwaggerHub](https://app.swaggerhub.com/apis/mimik/mIoT/1.0.0).

<h2>How to build a microservice</h2>

Tools that you need:
* Latest [Docker Community Edition](https://www.docker.com/community-edition#/download]) for your target development platform(s)
* Latest [NPM](https://www.npmjs.com/)
* Latest [Node.js](https://nodejs.org/en/)
* Latest [edgeSDK](https://github.com/mimikgit/edgeSDK/releases)<br/>

Steps to build:

1. Clone the microservice project from GitHub somewhere accessible on your home directory. This guide will start from the Downloads folder

    ```cd ~/Downloads```

    ```git clone https://github.com/mimikgit/mIoT.git```

2. Navigate to the directory of the cloned repository.

2. Install dependencies:

    ```npm install```

3. Next run build script:

    ```npm run-script build```

4. Verify that index.js is copied under **/build** directory.

    **Attention: You will need to have the root permission to perform the following task.**

5. Change owner group of the build script in the deploy directory

    ``` sudo chmod a+x deploy/build.sh```

6. Run build script to create an image for the container under deploy directory: 

    ```cd deploy/ && ./build.sh```

7. Verify that a tar file of mimik container image is created as iot-v1.tar under deploy directory

8. Now you can redirect back to the deployment section and [deploy](#deploy) your newly built microservice.

# Source Code Navigation

## This Repository Folders

    - src/     the main source code for the microservice
    - build/   the compiled javascript (after running build scripts)
    - deploy/  image file for the container

For more details about the **src/** directory, please visit the README file under the **src/** directory.
