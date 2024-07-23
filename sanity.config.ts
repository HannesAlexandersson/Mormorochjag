import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import {visionTool} from '@sanity/vision';
import schemas from "./sanity/schemas";


export const config = defineConfig({
    projectId: "i8zm0npp",
    dataset: "production",
    title: "Annika's studio",
    apiVersion: "2024-07-19",
    plugins: [structureTool(), visionTool()],
    schema: { types: schemas },
    basePath: "/studio",
});

