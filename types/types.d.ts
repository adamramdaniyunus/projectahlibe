type DataItem = {
    _id: string;
    desc: string;
    tags: string[];
    likes: string[];
    comments: string[];
    video: string
    image: string;
    createdAt: string
    user: {
        name: string;
        image: string;
        email: string;
        verified: boolean
    }
}

type TagsData = {
    name: string
}

type CommentItem = {
    desc: string
    user: {
        name: string;
        image: string;
        _id: string;
        verified: boolean;
    }
    createdAt: string;
    post: string;
    replyOnUserName: string;
    _id: string;
    replies: [
        {
            user: {
                name: string;
                image: string;
                _id: string;
                verified: boolean;
            }
            desc: string;
            createdAt: string;
            replyOnUserName: string;
            replyOnUser: string;
            _id: string;
            replies: [
                {
                    user: {
                        name: string;
                        image: string;
                        _id: string;
                    }
                    desc: string;
                    createdAt: string;
                    replyOnUserName: string;
                    replyOnUser: string;
                    _id: string;
                    replies: string[];
                }
            ]
        }
    ]
    replyOnUser: string;
    parent: string;
}


type ReportData = {
    desc: string;
    user: {
        name: string;
        image: string;
    }
    post: {
        _id: string;
        user: {
            name: string;
            image: string;
        }
        desc: string
        image: string;
        video: string;
    }
}


type User = {
    name: string;
    desc: string;
    image: string
}

type TagsItem = {
    name: string;
}


type VideoState = {
    fileUrl: string;
    fileKey: string;
    fileName: string;
};

type ImageState = {
    fileUrl: string;
    fileKey: string;
    fileName: string;
};

type SetErrorType = (error: boolean) => void;