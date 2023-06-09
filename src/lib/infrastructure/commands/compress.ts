import { JsonLight } from '../index'
import { helper } from '../helper'
module.exports = async (args:any) => {
	const input = args.input || args.i
	const schema = args.schema || args.s
	const output = args.output || args.o
	const mapping = (args.mapping || args.m) !== undefined
	if (!input) {
		console.error('input is required!')
		return
	}

	let data = JsonLight.getJson(input)
	if (data === null) {
		const str = await helper.read(input)
		if (str === null) {
			throw new Error(`File ${input} not found`)
		}
		data = JSON.parse(str)
	}

	const compressed = JsonLight.compress(data, { schema, mapping })
	const result = JSON.stringify(compressed)
	if (output) {
		await helper.write(output, result)
	} else {
		console.log(result)
	}
}
