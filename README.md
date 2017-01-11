#Distributed Data Collections(DDC) in NodeJs#
###created by Adrian Tabirta & Ploaia Vladislav, gr.FI-131###

###Requirements:###
    - NodeJs version 4.+ for run
	- npm
	- prompt
	- underscore
	
###How to install:###

     For use this project, you will need to install:
     
	 - NodeJs - visit [https://nodejs.org/en/] then download and install it.
     - npm - (node package manager) comes with nodejs
     - prompt - install this package with nmp in terminal. Ex: npm install prompt
	 - underscore -  install this package with nmp in terminal. Ex: npm install underscore
###How about running this project:###

First, we have 3 files:
- mediator.js
- client.js
- config.sh
P.S. Run config.sh in another terminal/console using sh. Ex.: sh config.sh 

#####Description of modules
Must write here

	 
###Demo of project:	

1. Go to your cmd/console/terminal and type:
 ```sh
$node mediator.js
|____________________________________________________|
|                  Mediator connected                |
|____________________________________________________|
|  you can see log below                             |
|____________________________________________________|
```
Now server is started and display queue content when it has somethis.

2. Open second cmd/console/terminal and type:
 ```sh
$ node client.js
|                  Client connected                  |
|____________________________________________________|
|  type: [get | post]                                |
|  sort: [asc | desc]                                |
|  filter: 'any string' - person name from list      |
|  gourpBy: [ FI-131 | FI-121 ]                      |
|____________________________________________________|
```
Now Client started, and ask you to specify message type, sort type(asc or desc), filter by any string and groupBy(FI-121 or FI-131). 

3. Open third cmd/console/terminal and type:
 ```sh
Node 9006 started !
Node 9005 started !
Node 9002 started !
Node 9004 started !
Node 9001 started !
Node 9003 started !
```
Finally all nodes started! 

###Conclusion###
Must to write

####We used TCP as transfer protocol (net module in NodeJs), and UDP protocol.####

