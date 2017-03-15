exports.mochaTest = function(name, root, test) {
  describe(name, readDir);

  function readDir() {
    var dir = path.join(root, name);

    fs
      .readdirSync(dir)
      .filter(RegExp.prototype.test, /^[^\._]/) //ignore all files with a leading dot or underscore
      .map(function(name) {
        return path.join(dir, name);
      })
      .map(require)
      .forEach(runTest);
  }

  function runTest(file) {
    it(file.name, function(done) {
      test(file, getCallback(file.expected, done));
    });
  }
};