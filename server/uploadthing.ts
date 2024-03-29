import type { NextApiRequest, NextApiResponse } from "next";

import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

import { UTApi } from "uploadthing/server";

export const utapi = new UTApi()
const f = createUploadthing();

// const { data: session } = useSession();

// const user = session?.user;
// const email = user?.email

const auth = (req: NextApiRequest, res: NextApiResponse) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({
        image: { maxFileSize: "4MB" },
        video: { maxFileSize: "256MB", maxFileCount: 1 },
    })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req, res }) => {
            // This code runs on your server before upload
            const user = await auth(req, res);

            // If you throw, the user will not be able to upload
            if (!user) throw new Error("Unauthorized");

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete for userId:", metadata.userId);

            console.log("file url", file.url);

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;