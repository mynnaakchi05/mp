import {Component,computed,OnInit,inject,signal} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {form,FormField,FormRoot,required,min} from '@angular/forms/signals';
import {ProductService} from '../../../services/product';
import {Product} from '../../../models/product';

@Component({
  selector:'app-admin-products',
  standalone:true,
  imports:[CurrencyPipe,FormField,FormRoot],
  templateUrl:'./admin-products.html',
  styleUrl:'./admin-products.css',
})
export class AdminProducts implements OnInit {
  private readonly productService=inject(ProductService);
  readonly produits=this.productService.produits;
  recherche=signal('');
  produitsFiltres=computed(()=>{
    const q=this.recherche().trim().toLowerCase();
    if (!q) {
      return this.produits();
    }
    return this.produits().filter((p)=>
      p.nom.toLowerCase().includes(q)||p.categorie.toLowerCase().includes(q)
    );
  });
  idEnEdition=signal<string|null>(null);
  formModel=signal({
    nom:'',
    categorie:'',
    region:'',
    artisan:'',
    prix:0,
    stock:0,
    disponible:true,
    photo:'',
    description:'',
  });
  productForm=form(this.formModel,(path)=>{
    required(path.nom,{message:'Le nom est obligatoire'});
    required(path.categorie,{message:'La catégorie est obligatoire'});
    required(path.region,{message:'La région est obligatoire'});
    required(path.artisan,{message:"L'artisan est obligatoire"});
    min(path.prix,0.01,{message:'Le prix doit être supérieur à 0'});
    min(path.stock,0,{message:'Le stock ne peut pas être négatif'});
  });
  ngOnInit():void {
    this.productService.getProducts().subscribe();
  }
  onRechercheChange(valeur:string):void {
    this.recherche.set(valeur);
  }
  preparerAjout():void {
    this.idEnEdition.set(null);
    this.formModel.set({
      nom:'',
      categorie:'',
      region:'',
      artisan:'',
      prix:0,
      stock:0,
      disponible:true,
      photo:'',
      description:'',
    });
    document.getElementById('nomProduit')?.focus();
  }
  preparerModification(p:Product):void {
    this.idEnEdition.set(p.id);
    this.formModel.set({
      nom:p.nom,
      categorie:p.categorie,
      region:p.region,
      artisan:p.artisan,
      prix:p.prix,
      stock:p.stock,
      disponible:p.disponible,
      photo:p.photo,
      description:p.description,
    });
    document.getElementById('nomProduit')?.focus();
  }
  onEnregistrer():void {
    if (this.productForm().invalid()) {
      return;
    }
    const v=this.formModel();
    const editId=this.idEnEdition();
    const maxId=this.produits().reduce((max,p)=>Math.max(max,Number(p.id)||0),0);
    if (editId) {
      const existant=this.produits().find((item)=>item.id===editId);
      const produitModifie:Product={
        id:editId,
        nom:v.nom,
        categorie:v.categorie,
        region:v.region,
        artisan:v.artisan,
        prix:Number(v.prix),
        stock:Number(v.stock),
        disponible:Boolean(v.disponible),
        photo:v.photo,
        description:v.description,
        dateAjout:existant?.dateAjout??new Date().toLocaleDateString(),
        commentaires:existant?.commentaires??[],
      };
      this.productService.updateProduct(produitModifie).subscribe(()=>{
        if (existant&&existant.stock!==produitModifie.stock) {
          const mouvement={
            produitId:produitModifie.id,
            produitNom:produitModifie.nom,
            artisan:produitModifie.artisan,
            ancienStock:existant.stock,
            nouveauStock:produitModifie.stock,
            variation:produitModifie.stock-existant.stock,
            date:new Date().toLocaleString()
          };
          this.productService.ajouterMouvement(mouvement).subscribe();
        }
        this.preparerAjout();
      });
    } else {
      const nouveauProduit:Product={
        id:String(maxId+1),
        nom:v.nom,
        categorie:v.categorie,
        region:v.region,
        artisan:v.artisan,
        prix:Number(v.prix),
        stock:Number(v.stock),
        disponible:Boolean(v.disponible),
        photo:v.photo,
        description:v.description,
        dateAjout:new Date().toLocaleDateString(),
        commentaires:[],
      };
      this.productService.addProduct(nouveauProduit).subscribe(()=>{
        this.preparerAjout();
      });
    }
  }
  onSupprimer(id:string):void {
    this.productService.deleteProduct(id).subscribe();
  }
}


