import test from "ava"
import { getVirtualFileSystemFromDirPath } from "index"
import mockFS from "mock-fs"

test("generate vfs from directory", async (t) => {
  mockFS({
    "/app/noinclude.txt": "should not include",
    "/app/somedir/file1.txt": "this is file1 content",
    "/app/somedir/file2.js": "console.log('hello world')",
    "/app/somedir/file3.png": "should not include",
  })

  const vfs = await getVirtualFileSystemFromDirPath({
    dirPath: "/app/somedir",
    extensions: ["txt", "js"],
  })

  t.is(vfs["file1.txt"].toString(), "this is file1 content")
  t.is(vfs["file2.js"].toString(), "console.log('hello world')")
  t.falsy(vfs["file3.png"])
  t.is(Object.keys(vfs).length, 2)
})
