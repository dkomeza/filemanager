import Datastore from "nedb";

interface User {
  username: string;
  passwordHash: string;
  privateKey: string;
}

class Database {
  private UserDatabase: Datastore;
  constructor() {
    this.UserDatabase = new Datastore({
      filename: "db/users.db",
      autoload: true,
    });
  }
  createUser(data: User) {
    this.UserDatabase.insert({
      username: data.username,
      passwordHash: data.passwordHash,
      privateKey: data.privateKey,
    });
  }
  changePrivateKey(username: string, passwordHash: string) {
    this.UserDatabase.findOne({ username: username }, (err: any, doc: User) => {
      console.log(doc.passwordHash === passwordHash);
    });
  }
}

export default new Database();
