
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
        await res.revalidate('/blogs');
        await res.revalidate('/admin/blogs');
        return res.status(200).json({ revalidate: true });
    } catch (err) {
        return res.status(500).json(err);
    }
}