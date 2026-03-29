export interface NewsItem {
    id: string;
    title: string;
    category: string;
    date: string;
    status: 'Published' | 'Draft';
    excerpt: string;
    content: string;
    image: string;
    views: number;
    createdAt?: number;
}
