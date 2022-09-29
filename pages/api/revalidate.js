import blogsDB from "../../services/db/blogs";

export default function handler(req, res) {
    const { method } = req;
    switch(method) {
        case "POST": {
            return Validate(req, res);
        }
        default: {
            return res.status(401).json();
        }
    }
}

async function Validate(req, res) {
    const { secret }  = req.query;
    if(secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET)
        return res.status(401).json();
    try {
        const blogs = res.revalidate('/blogs');
        const admin_blogs = res.revalidate('/admin/blogs');
        const blogs_array = await blogsDB.GetAll();
        const blogs_promise = [...blogs_array.map(blog => [res.revalidate(`/blogs/${blog.id}`), res.revalidate(`/admin/blogs/${blog.id}`)])];
        await Promise.all([blogs, admin_blogs, ...blogs_promise]);
        return res.status(200).json({ revalidate: true });
    } catch (err) {
        return res.status(500).json(err);
    }
}