import test from "ava"
import { getVirtualFilesystemModuleFromDirPath } from "index"
import mockFS from "mock-fs"

test("generate vfs from directory (default buffer)", async (t) => {
  mockFS({
    "/app/noinclude.txt": "should not include",
    "/app/somedir/file1.txt": "this is file1 content",
    "/app/somedir/file2.js": "console.log('hello world')",
    "/app/somedir/file3.png": "should not include",
  })

  const moduleContent = await getVirtualFilesystemModuleFromDirPath({
    dirPath: "/app/somedir",
    extensions: ["txt", "js"],
  })

  mockFS.restore()

  t.snapshot(moduleContent)
})

test("generate vfs from directory, content-format=string", async (t) => {
  mockFS({
    "/app/noinclude.txt": "should not include",
    "/app/somedir/file1.txt": "this is file1 content",
    "/app/somedir/file2.js": "console.log('hello world')",
    "/app/somedir/file3.png": "should not include",
  })

  const moduleContent = await getVirtualFilesystemModuleFromDirPath({
    dirPath: "/app/somedir",
    extensions: ["txt", "js"],
    contentFormat: "string",
  })

  mockFS.restore()

  t.snapshot(moduleContent)
})

test("generate vfs from directory, content-format=require", async (t) => {
  mockFS({
    "/app/noinclude.txt": "should not include",
    "/app/somedir/file1.txt": "this is file1 content",
    "/app/somedir/file2.js": "console.log('hello world')",
    "/app/somedir/file3.png": "should not include",
  })

  const moduleContent = await getVirtualFilesystemModuleFromDirPath({
    dirPath: "/app/somedir",
    extensions: ["txt", "js"],
    contentFormat: "require",
    targetPath: "/app/routes.ts",
  })

  mockFS.restore()

  t.snapshot(moduleContent)
})

test("generate vfs from directory, content-format=import-default", async (t) => {
  mockFS({
    "/app/noinclude.txt": "should not include",
    "/app/somedir/file1.txt": "this is file1 content",
    "/app/somedir/file2.js": "console.log('hello world')",
    "/app/somedir/file3.png": "should not include",
  })

  const moduleContent = await getVirtualFilesystemModuleFromDirPath({
    dirPath: "/app/somedir",
    extensions: ["txt", "js"],
    contentFormat: "import-default",
    targetPath: "/app/routes.ts",
  })

  mockFS.restore()

  t.snapshot(moduleContent)
})

test("generate vfs from directory, content-format=import-star, no-import-ext=true", async (t) => {
  mockFS({
    "/app/noinclude.txt": "should not include",
    "/app/somedir/file1.txt": "this is file1 content",
    "/app/somedir/file2.js": "console.log('hello world')",
    "/app/somedir/file3.png": "should not include",
  })

  const moduleContent = await getVirtualFilesystemModuleFromDirPath({
    dirPath: "/app/somedir",
    extensions: ["txt", "js"],
    contentFormat: "import-star",
    targetPath: "/app/routes.ts",
    noImportExt: true,
  })

  mockFS.restore()

  t.snapshot(moduleContent)
})

test("generate vfs from directory, content-format=export-pathlist", async (t) => {
  mockFS({
    "/app/noinclude.txt": "should not include",
    "/app/somedir/file1.txt": "this is file1 content",
    "/app/somedir/file2.js": "console.log('hello world')",
    "/app/somedir/file3.png": "should not include",
  })

  const moduleContent = await getVirtualFilesystemModuleFromDirPath({
    dirPath: "/app/somedir",
    extensions: ["txt", "js"],
    contentFormat: "export-pathlist",
    targetPath: "/app/routes.ts",
  })

  mockFS.restore()

  t.snapshot(moduleContent)
})
