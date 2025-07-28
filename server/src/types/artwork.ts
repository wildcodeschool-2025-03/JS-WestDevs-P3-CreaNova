interface Artwork {
  id?: number;
  title: string;
  description: string;
  price: string;
  image: string;
  user_account_id?: number;
  mainCategory?: string;
  tags?: string[];
}

interface artwork_category {
  category_id: number;
}
