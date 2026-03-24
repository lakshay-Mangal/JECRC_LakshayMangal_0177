import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductComponent } from './product/product';
import { Contact } from './contact/contact';
import { Error } from './error/error';
import path from 'path';
import { Component } from '@angular/core';
import { error } from 'console';
import { ProductDetailsComponent } from './product-details/product-details';
import { ProductGuardService } from './product-guard.service';
export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'products', component: ProductComponent},
    {path: 'contact', component: Contact},
      {path: 'product/:id', component: ProductDetailsComponent, canActivate:[ProductGuardService] },
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', component: Error},
  
];
