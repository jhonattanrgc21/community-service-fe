import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from './material.module';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProtectedModule } from './core/protected/protected.module';
import { AuthModule } from './core/auth/auth.module';
import { DatePipe } from '@angular/common';

@NgModule({
	declarations: [AppComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		NgxSpinnerModule,
		MatNativeDateModule,
		MaterialModule,
		SharedModule,
		AuthModule,
		ProtectedModule,
	],
	providers: [ DatePipe],
	bootstrap: [AppComponent],
})
export class AppModule {}
