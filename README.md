#oobapi-ws
[oobabooga/text-generation-webui](https://github.com/oobabooga/text-generation-webui) websocket api wrapper

  This is a simple isomorphic wrapper for the oobabooga websocket api (must be enabled when [launching ooba](https://github.com/oobabooga/text-generation-webui#api) with `--api`)
  
## Usage

  As this wrapper is meant to function the same in the browser as well as in node it must be passed a `WebSocket` object when instantiated. This can be either the browser context 'WebSocket' or one from the ['ws' module](https://github.com/websockets/ws). See `node_example.mjs` and `browser_example.html` for more details.

  ```js
  import ooba from 'oobap-ws'
  //when instantiating the api you can specify a host and a port, as well as default generation options
  //const api = await ooba(WebSocket)({host,port}, generation_options)
  //or if you're running ooba locally and you want to use the default options you can omit both
  const api = await ooba(WebSocket)()
  ```
  this promise will return once a websocket connection to 'localhost:5005' is established and the generation will use the default parameters from [the example](https://github.com/oobabooga/text-generation-webui/blob/main/api-example-stream.py).

  in order to generate text simply call `api.generate()` with a prompt
  ```js
  const prompt = "In order to make homemade bread, follow these steps:\n1)"
  api.generate(prompt)
  ```
  
  and listen to generated tokens by supplying a function to `api.ontoken` 

  ```js
  api.ontoken = token => console.log(token)
  ```

  you can also pass an options object containing any parameters for the specific generation instead of a string 

  ```js
  api.generate({
    prompt: 'please write me a very long poem\n',
    max_new_tokens: 1000,
      })
  ```

  additionally, the default 'parameters' object is exposed as a property of the 'api' object and can be freely modified to change the default parameters after instantiation
  ```js
  api.parameters.max_new_tokens = 1000
  ```

## Additional Notes

  Currently only the 'stream' [api](https://github.com/oobabooga/text-generation-webui/blob/main/api-example-stream.py) is supported. The `chat-stream` [api](https://github.com/oobabooga/text-generation-webui/blob/main/api-example-chat-stream.py) is coming soon.

