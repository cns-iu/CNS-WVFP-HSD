# CNS-WVFP-HSD

## Installation
* Follow the installation instructions on: https://github.com/cns-iu/CNS-WVF
* After everything is ready, navigate to your WVF directory and go in the **/grunt** folder
* Create a new file called **hsd-config.json** with the following contents: 
```json
	{
	    "projectName": "HSD",
	    "pluginsURL": "https://github.com/cns-iu/CNS-WVF-Plugins.git",
	    "projectURL": "https://github.com/cns-iu/CNS-WVFP-HSD.git"
	}
```
In the same **/grunt** directory, open a command terminal and type the following command:

```sh
	grunt build-project-full --config-dir="hsd-config.json"
```
The compiled code will be in **/grunt/deploy/HSD**

