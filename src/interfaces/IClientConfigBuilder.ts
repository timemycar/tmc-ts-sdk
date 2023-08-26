export default interface IClientConfigBuilder<T> {
	withEndpoint(endpoint: string): IClientConfigBuilder<T>;
	withTimeout(timeout: number): IClientConfigBuilder<T>;
	build(): T;
}
