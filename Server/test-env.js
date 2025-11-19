// test-env.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('MONGODB_ATLAS_URI:', process.env.MONGODB_ATLAS_URI);
