import User from '../models/users'
import { Realm } from 'realm'

let realm = new Realm({schema: [User]});

export realm;
