import swcConfig from "./swc.dev.js";

export default {
    transform: {
        "^.+\\.(t|j)sx?$": ["@swc/jest", swcConfig]
    },
    testEnvironment: "jsdom",
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    extensionsToTreatAsEsm: [".ts", ".tsx"],
    reporters: ["default", ["jest-junit", {
        outputDirectory: "reports",
        outputName: "jest-junit.xml",
        ancestorSeparator: " › ",
        uniqueOutputName: "false",
        suiteNameTemplate: "{filepath}",
        classNameTemplate: "{classname}",
        titleTemplate: "{title}"
    }]]
};
