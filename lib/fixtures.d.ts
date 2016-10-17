export declare const normalizedComments: {
    "id": number;
    "user": string;
    "text": string;
}[];
export declare const normalizedArticles: {
    "id": string;
    "date": string;
    "title": string;
    "text": string;
    "comments": number[];
}[];
export declare const articles: ({
    "id": string;
    "date": string;
    "title": string;
    "text": string;
    "comments": ({
        "id": number;
        "user": string;
        "text": string;
    } | {
        "id": number;
        "title": string;
        "user": string;
        "text": string;
    })[];
} | {
    "id": string;
    "date": string;
    "title": string;
    "text": string;
})[];
