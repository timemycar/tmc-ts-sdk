import IClientConfig from '../interfaces/IClientConfig';
import IClientConfigBuilder from '../interfaces/IClientConfigBuilder';

/**
 * Config for the TimeMyCar Client.
 */
export class TimeMyCarClientConfig implements IClientConfig {
	endpoint: string;
	timeout: number;

	static DEFAULT_ENDPOINT = 'http://localhost';
	static DEFAULT_TIMEOUT = 4000;

	constructor() {
		this.endpoint = TimeMyCarClientConfig.DEFAULT_ENDPOINT;
		this.timeout = TimeMyCarClientConfig.DEFAULT_TIMEOUT;
	}

	/**
	 * Builder for creating the TimeMyCarConfig.
	 *
	 * @returns     Builder.
	 */
	static builder() {
		return new TimeMyCarClientConfigBuilder();
	}
}

/**
 * Builder for TimeMyCarConfig.
 */
class TimeMyCarClientConfigBuilder implements IClientConfigBuilder<TimeMyCarClientConfig> {
	private config: TimeMyCarClientConfig;

	constructor() {
		this.config = new TimeMyCarClientConfig();
	}

	/**
	 * Sets the API Endpoint
	 *
	 * @default "localhost"
	 *
	 * @param endpoint  Endpoint to set
	 * @returns
	 */
	withEndpoint(endpoint: string): TimeMyCarClientConfigBuilder {
		this.config.endpoint = endpoint;
		return this;
	}

	/**
	 * Sets the Timeout Duration (ms)
	 *
	 * @default 4000
	 *
	 * @param timeout   Maximum Timeout in ms.
	 * @returns
	 */
	withTimeout(timeout: number): TimeMyCarClientConfigBuilder {
		this.config.timeout = timeout;
		return this;
	}

	/**
	 * Builds the TimeMyCarConfig
	 *
	 * @returns     Config Object
	 */
	build(): TimeMyCarClientConfig {
		return this.config;
	}
}
