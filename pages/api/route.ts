import { NextApiRequest, NextApiResponse } from "next";
import { UTApi } from "uploadthing/server";

// export const utapi = new UTApi()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const newUrl: any = req.query.key;
    const url = newUrl.substring(newUrl.lastIndexOf("/") + 1);
    const utapi = new UTApi();
    await utapi.deleteFiles(url);

    return res.json({ message: "ok" });
}

export default handler