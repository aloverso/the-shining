interface HttpClient {
    get<T>(endpoint: string): Promise<T>
}