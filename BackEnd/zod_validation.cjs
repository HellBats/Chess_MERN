const zod = require('zod');

const zod_signin_schema = zod.object({
    Name:zod.string().trim().min(4).max(20),
    UserName:zod.string().trim().min(4).max(20),
    EmailId:zod.string().trim().email(),
    Password:zod.string().min(8).max(50),
})

const zod_signup_schema = zod.object({
    EmailId:zod.string().trim().email(),
    Password:zod.string().min(8).max(50),
})

const zod_update_schema = zod.object({
    Name:zod.string().trim().min(4).max(20).optional(),
    UserName:zod.string().trim().min(4).max(20),
    EmailId:zod.string().trim().email().optional(),
    Password:zod.string().min(8).max(50).optional(),
})

const zod_filter_schema = zod.object({
    UserName:zod.string().trim().min(4).max(20),
})
module.exports = {zod_signin_schema,zod_signup_schema,zod_update_schema,zod_filter_schema}