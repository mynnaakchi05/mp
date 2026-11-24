import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Info } from '../../../models/info';
import { signal } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  siteInfo = signal<Info>({
    nomSite: 'TuniSanat',
    description: 'TuniSanat est une boutique en ligne dédiée à la valorisation de l’artisanat tunisien.',
    objectif: 'Notre objectif est de faire découvrir les créations authentiques des artisans tunisiens et de préserver notre patrimoine culturel.',
    createur: 'Akchi Mynna'
  });

}