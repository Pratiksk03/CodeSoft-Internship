```js
const mongoose = require('mongoose');
const ApplicationSchema = new mongoose.Schema({
job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
coverLetter: String,
resumePath: String,
status: { type: String, enum: ['submitted','reviewed','rejected','accepted'], default: 'submitted' },
appliedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Application', ApplicationSchema);
```