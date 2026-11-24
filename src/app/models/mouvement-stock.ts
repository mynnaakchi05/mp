export interface MouvementStock {
  id?: string;
  produitId: string;
  produitNom: string;
  artisan: string;
  ancienStock: number;
  nouveauStock: number;
  variation: number;
  date: string;
}
