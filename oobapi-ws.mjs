//default options from https://github.com/oobabooga/text-generation-webui/blob/main/api-example-stream.py
const default_options = {
  prompt: "In order to make homemade bread, follow these steps:\n1)",
  max_new_tokens: 250,
  do_sample: true,
  temperature: 1.3,
  top_p: 0.1,
  typical_p: 1,
  epsilon_cutoff: 0,  // In units of 1e-4
  eta_cutoff: 0,  // In units of 1e-4
  repetition_penalty: 1.18,
  top_k: 40,
  min_length: 0,
  no_repeat_ngram_size: 0,
  num_beams: 1,
  penalty_alpha: 0,
  length_penalty: 1,
  early_stopping: false,
  mirostat_mode: 0,
  mirostat_tau: 5,
  mirostat_eta: 0.1,
  seed: -1,
  add_bos_token: true,
  truncation_length: 2048,
  ban_eos_token: false,
  skip_special_tokens: true,
  stopping_strings: []
}

const api = WebSocket => ({host='localhost',port=5005}={}, parameters=default_options) => new Promise(res => {
  const URI = `ws://${host}:${port}/api/v1/stream`
  const socket = new WebSocket(URI)

  //browser compatibility shim
  if (!socket.on) socket.on = socket.addEventListener

  let api = {parameters}
  api.generate = prompt => {
    //check for string prompt and wrap in an object
    if (typeof prompt === 'string') prompt = {prompt}
    socket.send(JSON.stringify(Object.assign({},api.parameters,prompt)))
  }

  socket.on('message', (data) => {
    //browser compatibility shim
    if (data.data) data = data.data
    const parsed = JSON.parse(data)
    switch (parsed.event) {
      case 'text_stream':
        api.ontoken?.(parsed.text)
        api.debugstream?.(parsed)
        break;
      case 'stream_end':
        api.onend?.(parsed)
    }
  })

  socket.on('error', (error) => {
    console.error(`WebSocket error: `,error)
  })

  socket.on('close', () => {
    console.error(`WebSocket closed`)
  })

  socket.on('open', () => res(api))
})

export default api
