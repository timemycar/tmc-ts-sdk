import { Command, RequestMethod } from '../../src';

const defaultMethod = Command.DEFAULT_METHOD;
const defaultJwt = Command.DEFAULT_JWT;
const defaultPath = Command.DEFAULT_PATH;
const defaultParams = Command.DEFAULT_PARAMS;

const newMethod = RequestMethod.GET;
const newJwt = 'jwt-abc';
const newPath = '/abc/def/path';

const newParams: any = new Object();
newParams['abc'] = 'abc';

test('Default Command', () => {
	const command = Command.builder().build();

	expect(command).toHaveProperty('method', defaultMethod);
	expect(command).toHaveProperty('jwt', defaultJwt);
	expect(command).toHaveProperty('path', defaultPath);
	expect(command).toHaveProperty('params', defaultParams);
});

test('Fully Modified Command', () => {
	const command = Command.builder()
		.withMethod(newMethod)
		.withJwt(newJwt)
		.withPath(newPath)
		.withParams(newParams)
		.build();

	expect(command).toHaveProperty('method', newMethod);
	expect(command).toHaveProperty('jwt', newJwt);
	expect(command).toHaveProperty('path', newPath);
	expect(command).toHaveProperty('params', newParams);
});
