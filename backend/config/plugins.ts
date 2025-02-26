export default () => ({
    upload: {
        enable: true,
        config: {
            provider: "local",
            providerOptions: {
                sizeOptimization: true,
                // sizeLimit: 10000000,
            }
        }
    }
});
