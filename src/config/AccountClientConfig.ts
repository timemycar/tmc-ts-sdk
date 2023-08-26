import IClientConfig from "../interfaces/IClientConfig";
import IClientConfigBuilder from "../interfaces/IClientConfigBuilder";

/**
 * Config for the AccountClient.
 */
export class AccountClientConfig implements IClientConfig {
    endpoint: string;
    timeout: number;

    static DEFAULT_ENDPOINT = "localhost";
    static DEFAULT_TIMEOUT = 4000;
    
    constructor() {
        this.endpoint = AccountClientConfig.DEFAULT_ENDPOINT;
        this.timeout = AccountClientConfig.DEFAULT_TIMEOUT;
    }

    /**
     * Builder for creating the AccountClientConfig.
     * 
     * @returns     Builder.
     */
    static builder() {
        return new AccountClientConfigBuilder();
    }
}

/**
 * Builder for AccountClientConfig.
 */
class AccountClientConfigBuilder implements IClientConfigBuilder<AccountClientConfig> {
    private config: AccountClientConfig;

    constructor() {
        this.config = new AccountClientConfig();
    }

    /**
     * Sets the API Endpoint
     * 
     * @default "localhost"
     * 
     * @param endpoint  Endpoint to set
     * @returns 
     */
    withEndpoint(endpoint: string): AccountClientConfigBuilder {
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
    withTimeout(timeout: number): AccountClientConfigBuilder  {
        this.config.timeout = timeout;
        return this;
    }

    /**
     * Builds the AccountClientConfig
     * 
     * @returns     Config Object
     */
    build(): AccountClientConfig {
        return this.config;
    }
}