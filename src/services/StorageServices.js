import { ref } from 'firebase/storage';

import { storage } from '../lib/FirebaseConfig';

const profileRef = ref(storage, "/userProfiles");