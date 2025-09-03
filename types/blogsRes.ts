export interface Article {
  id: string;
  title: string;
  image?: string;
  short_description: string;
  content?: string;
}

export interface ArticlesResponse {
  status: boolean;
  data: Article[];
}
