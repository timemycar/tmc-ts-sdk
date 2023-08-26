import { AccountCommand } from '../../src/command/AccountCommand';
import { RequestMethod } from '../../src/enums/RequestMethod';

const defaultMethod = AccountCommand.DEFAULT_METHOD;
const defaultJwt = AccountCommand.DEFAULT_JWT;
const defaultPath = AccountCommand.DEFAULT_PATH;
const defaultParams = AccountCommand.DEFAULT_PARAMS;

const newMethod = RequestMethod.GET;
const newJwt = 'jwt-abc';
const newPath = '/abc/def/path';

const newParams: any = new Object();
newParams['abc'] = 'abc';

test('Default Command', () => {
	const command = AccountCommand.builder().build();

	expect(command).toHaveProperty('method', defaultMethod);
	expect(command).toHaveProperty('jwt', defaultJwt);
	expect(command).toHaveProperty('path', defaultPath);
	expect(command).toHaveProperty('params', defaultParams);
});

test('Fully Modified Command', () => {
	const command = AccountCommand.builder()
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
