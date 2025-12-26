
```js
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');


// Create job (employer)
router.post('/', auth, async (req,res)=>{
if (req.user.role !== 'employer') return res.status(403).json({ msg: 'Not allowed' });
const data = { ...req.body, employer: req.user._id };
const job = await Job.create(data);
res.json(job);
});


// List / search
router.get('/', async (req,res)=>{
const { q, location, type } = req.query;
const filter = {};
if (q) filter.title = { $regex: q, $options: 'i' };
if (location) filter.location = { $regex: location, $options: 'i' };
if (type) filter.type = type;
const jobs = await Job.find(filter).populate('employer','name company').sort({ createdAt: -1 });
res.json(jobs);
});


// Get single job
router.get('/:id', async (req,res)=>{
const job = await Job.findById(req.params.id).populate('employer','name company');
if(!job) return res.status(404).json({ msg: 'Not found' });
res.json(job);
});


module.exports = router;
```