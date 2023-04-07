import { JsonLight, helper } from '../index'
module.exports = async (args:any) => {
	const input = args.input || args.i
	const schema = args.schema || args.s
	const output = args.output || args.o
	if (!input) {
		console.error('input is required!')
		return
	}

	let data = helper.getJson(input)
	if (data === null) {
		const str = await helper.read(input)
		if (str === null) {
			throw new Error(`File ${input} not found`)
		}
		data = JSON.parse(str)
	}

	const compressed = JsonLight.compress(data, schema)
	if (output) {
		await helper.write(output, compressed)
	} else {
		console.log(compressed)
	}
}
