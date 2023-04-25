import { mkdir } from "node:fs/promises";

import { cloneProjectTemplate } from "../src/cloneProjectTemplate";

jest.mock("node:fs/promises");

const cloneMock = jest.fn<string, string[], void>();

jest.mock("degit", () => () => ({
    clone: (...args: string[]) => cloneMock(...args)
}));

afterEach(() => {
    jest.restoreAllMocks();
});

test("when called with valid argument, template is cloned", async () => {
    const outputDirectory = "./test";
    const repositoryUrl = "foo/bar";

    await cloneProjectTemplate(outputDirectory, repositoryUrl);

    expect(mkdir).toHaveBeenCalledWith(outputDirectory, expect.anything());
    expect(cloneMock).toHaveBeenCalledWith(outputDirectory);
});
