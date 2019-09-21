import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../in-memory-databse';


@NgModule({
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)
    ]
})
export class CoreModule { }