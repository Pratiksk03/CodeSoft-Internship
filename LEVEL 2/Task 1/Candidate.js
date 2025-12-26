```js
});


await transporter.sendMail({
from: process.env.SMTP_FROM,
to: req.user.email,
subject: 'Application received',
text: `Your application for ${job.title} has been received.`
});

const employer = await job.populate('employer');
await transporter.sendMail({
from: process.env.SMTP_FROM,
to: employer.employer.email,
subject: `New application for ${job.title}`,
text: `${req.user.name} applied for ${job.title}.`
});


res.json({ msg: 'Application submitted', application });
});


module.exports = router;
```



