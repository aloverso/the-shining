class SpyHttpClient implements HttpClient {

    stubbedGetPromise?: Promise<any> = undefined;

    get<T>(endpoint: string): Promise<T> {
        return this.stubbedGetPromise!;
    }
}

export default SpyHttpClient