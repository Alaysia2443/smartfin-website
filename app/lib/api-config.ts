export const apiConfig = {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
    isProduction: process.env.NODE_ENV === 'production',
};

// build API URLs
export function getApiUrl(endpoint: string): string {
    // for absolute URLs (production)
    if (apiConfig.baseUrl) {
        const baseWithoutTrailingSlash = apiConfig.baseUrl.endsWith('/')
            ? apiConfig.baseUrl.slice(0, -1)
            : apiConfig.baseUrl;

        const endpointWithLeadingSlash = endpoint.startsWith('/')
            ? endpoint
            : `/${endpoint}`;

        return `${baseWithoutTrailingSlash}${endpointWithLeadingSlash}`;
    }

    // For relative URLs (development)
    return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
}
