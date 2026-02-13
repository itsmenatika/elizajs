# elizajs
The implementetion in Javascript/Typescript of ELIZA chatbot created throughout 1964-1967 


You can use it in three different ways:

## chat (most common)

```
node index.js
```

to run a chatbot


## dont wan't a chat

```
node index.js MESSAGE
```
to ask a bot directly

## want to import

just use:
```
import {createChat, eliza, version} from "elizajs";
```

eliza <- allows you to ask a simple question
createChat <- creates a chat
version <- a variable that has a version