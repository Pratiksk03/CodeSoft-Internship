```js
const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
title: { type: String, required: true },
location: String,
type: String, // e.g. Full-time
description: String,
requirements: [String],
salary: String,
slug: { type: String, index: true },
featured: { type: Boolean, default: false },
createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Job', JobSchema);
```