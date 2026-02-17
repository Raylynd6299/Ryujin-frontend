import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    queryCache: new QueryClient().getQueryCache(),
    defaultOptions: {}
});

export default queryClient;