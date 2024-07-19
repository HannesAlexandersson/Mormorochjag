import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

const config = defineConfig({
    projectId: "i8zm0npp",
    dataset: "production",
    title: "Annika's studio",
    apiVersion: "2024-07-19",
    plugins: [structureTool()],
    basePath: "/studio",
});

export default config;
