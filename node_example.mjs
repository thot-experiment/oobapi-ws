import WebSocket from 'ws'
import ooba from './oobapi-ws.mjs'

const api = await ooba(WebSocket)()

const prompt = "In order to make homemade bread, follow these steps:\n1)"

process.stdout.write(prompt)
api.ontoken = token => process.stdout.write(token)

api.generate(prompt)
