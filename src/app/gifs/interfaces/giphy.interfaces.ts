export interface Gif {
  id: string;
  title: string;
  images: {
    original: { url: string; width: string; height: string };
    fixed_height?: { url: string; width: string; height: string };
  };
}

export interface GiphyResponse {
  data: Gif[];
  pagination: { total_count: number; count: number; offset: number };
  meta: { status: number; msg: string; response_id: string };
}
