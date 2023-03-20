export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-3.5-turbo",
}

export type Message = {
  id: string;
  avatarUrl: string;
  body: string;
  isSystem: boolean;
};

export type PGChunk = {
  essay_title: string;
  essay_url: string;
  essay_date: string;
  essay_thanks: string;
  content: string;
  content_length: number;
  content_tokens: number;
  embedding: number[];
};
