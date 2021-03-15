const fs = require('fs');
const nodegit = require("nodegit");
const path = require("path");
const fileName = "top100.json";
const directoryName = "/data";
const { GITHUB_TOKEN, REPO_DIR } = require('dotenv').config().parsed;

exports.sendToGit = async (jsonContent) => {
    let remote;
    const repo = await nodegit.Repository.open(REPO_DIR);
    
    await fs.promises.mkdir(path.join(repo.workdir(), directoryName), {
      recursive: true,
    });
    
    await fs.promises.writeFile(path.join(repo.workdir(), fileName), jsonContent);
    await fs.promises.writeFile(
      path.join(repo.workdir(), directoryName, fileName),
      jsonContent
    );
    
    const index = await repo.refreshIndex();
    
    // this file is in the root of the directory and doesn't need a full path
    await index.addByPath(`data/${fileName}`);
    // this will write both files to the index
    await index.write();
    
    const oid = await index.writeTree();   
    const parent = await repo.getHeadCommit();
    const author = nodegit.Signature.now("Leonardo Cunha",
      "leo_cunha87@hotmail.com");
    const committer = nodegit.Signature.now("Leonardo Cunha",
      "leo_cunha87@hotmail.com");
  
    repo.createCommit("HEAD", author, committer, `:fire: New data from ${new Date().toLocaleString()}`, oid, [parent])
    // Add a new remote
    .then(function(commitId) {
        console.log("Successfull commit: ", commitId);
    return repo.getRemote('origin')})
    .then(function(remoteResult) {
      remote = remoteResult;
      // Create the push object for this remote
      return remote.push(
        ["refs/heads/master:refs/heads/master"],
        {
          callbacks: {
            credentials: function(url, userName) {
              return nodegit.Cred.userpassPlaintextNew(GITHUB_TOKEN, "x-oauth-basic");
            },
            certificateCheck: function() {
              return 1;
            }
          }
        }
      );
    }).then(function() {
    console.log("Push successfull!");
  }).catch((err) => console.log(err));
}
