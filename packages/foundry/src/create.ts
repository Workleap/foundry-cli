import { basename } from "node:path";

import { cloneProjectTemplate } from "./cloneProjectTemplate.ts";
import { replaceTokens } from "./replaceTokens.ts";

const BaseRepositoryAddress = "workleap/wl-foundry-cli/templates";

type TemplateId = "host-application" | "remote-module" | "static-module";

const TemplateGenerators: Record<TemplateId, (outputDirectory: string, options: Record<string, string>) => Promise<void>> = {
    "host-application": async (outputDirectory, options) => {
        const scope = options["packageScope"];

        await cloneProjectTemplate(outputDirectory, `${BaseRepositoryAddress}/host-application`);

        await replaceTokens(["**/package.json", "**/@apps/host", "README.md"], {
            PACKAGE_SCOPE: scope,
            NAME: name
        }, outputDirectory);
    },
    "remote-module": async (outputDirectory, options) => {
        const scope = options["hostScope"];
        const packageName = basename(options["outDir"]);

        await cloneProjectTemplate(outputDirectory, `${BaseRepositoryAddress}/remote-module`);

    },
    "static-module": async (outputDirectory, options) => {
        const scope = options["hostScope"];
        const packageName = basename(options["outDir"]);

        await cloneProjectTemplate(outputDirectory, `${BaseRepositoryAddress}/static-module`);

    }
};

export async function create(templateId: TemplateId, outputDirectory: string, args: Record<string, string>) {
    const templateGenerator = TemplateGenerators[templateId];

    await templateGenerator(outputDirectory, args);
}
