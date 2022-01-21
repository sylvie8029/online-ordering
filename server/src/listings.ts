interface Listing {
  id: string;
  productName: string;
  image: string;
  price: number;
  rating: number;
}
export const listings: Listing[] = [
  { id: "001", productName: "gongbaojiding", image: "image001", price: 10, rating: 1 },
  { id: "002", productName: "gongbaojiding", image: "image002", price: 20, rating: 2 },
  { id: "003", productName: "gongbaojiding", image: "image003", price: 30, rating: 3 },
];
