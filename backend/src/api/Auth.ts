import db from "./DB";
import cypher from "../utils/cypher";

class Auth {
  private db: typeof db;
  constructor() {
    this.db = db;
  }

  public async login(username: string, password: string) {
    this.db.changePrivateKey(username, cypher.cypherPassword(password));
    // const user = this.db.getUser(username);
  }

  public async signup(username: string, password: string) {
    const passwordHash = cypher.cypherPassword(password);
    const { publicKey, privateKey } = cypher.createKeyPair(passwordHash);
    this.db.createUser({ username, passwordHash, privateKey });
    return publicKey;
  }

  public async auth(publicKey: string) {}
}

export default new Auth();
