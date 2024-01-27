declare global {
    namespace NodeJS{
        interface ProccessEnv {
            NODE_ENV: "development" | "production"
        }
    }
}

export {}