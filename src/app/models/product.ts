import { Commentaire } from "./commentaire";
export interface Product {
  id: string;
  nom: string;
  photo: string;
  prix: number;
  disponible: boolean;
  dateAjout: string;
  categorie: string;
  region: string;
  description: string;
  artisan: string;
  stock: number;
  commentaires: Commentaire[];
}