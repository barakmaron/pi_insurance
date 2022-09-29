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
    const { secret, page }  = req.query;
    if(secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET)
        return res.status(401).json();
    try {
       switch(page) {
        case 'blogs': {
            await RevalidateBlogs(req, res);
            break;
        }
        case 'admin_blogs': {
            await RevalidateAdminBlogs(req, res);
            break;
        }
        case 'blog_update': {
            await RevalidateBlogUpdate(req, res);
            break;
        }
        case 'admin_blog_update': {
            await RevalidateAdminBlogUpdate(req, res);
            break;
        }
        default: {
            return res.status(401).json();
        }
       }
        return res.status(200).json({ revalidate: true });
    } catch (err) {
        return res.status(500).json(err);
    }
}

async function RevalidateBlogs(req, res) {
    try {
        return await res.revalidate('/blogs');
    } catch (err) {
        throw err;
    }
}


async function RevalidateAdminBlogs(req, res) {
    try {
        return await res.revalidate('/admin/blogs');
    } catch (err) {
        throw err;
    }
}


async function RevalidateBlogUpdate(req, res) {
    try {
        const id = await blogsDB.GetLastChangeBlogId();
        return await res.revalidate(`/blogs/${id}`);
    } catch (err) {
        throw err;
    }
}


async function RevalidateAdminBlogUpdate(req, res) {
    try {
        const id = await blogsDB.GetLastChangeBlogId();
        return await res.revalidate(`/admin/blogs/${id}`);
    } catch (err) {
        throw err;
    }
}