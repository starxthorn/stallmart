export type ButtonProps = {
  children: React.ReactNode;
  Buttontype?: "button" | "submit";
  styles?: string;
  clicked?: () => void;
};

export type UserType = {
  _id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  password?: string;
  role?: string;
  province?: string;
  city?: string;
  address?: string;
  phone?: number;
};

export interface ImagesTypes {
  url: string;
  public_id: string;
}

export interface ProductTypes {
  _id?: string;
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
  images?: ImagesTypes[] | undefined;
  image?: string;
  clicked?: string;
  route?: string;
  featured?: boolean;
  product?: {
    _id?: string;
    title?: string;
    description?: string;
    price?: number;
    category?: string;
    stock?: number;
    images?: ImagesTypes[] | undefined;
    image?: string;
    clicked?: string;
    route?: string;
    featured?: boolean;
  };
  quantity?: number;
}

export interface OrderTypes {
  _id?: number;
  user?: UserType;
  products?: [
    {
      productId?: ProductTypes;
      quantityOfPro?: number;
    }
  ];
  isCompleted?: boolean;
  totalPrice?: number;
}
