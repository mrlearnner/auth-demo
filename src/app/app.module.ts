import { HttpBackend, HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { ApiService } from './services/api-service/api.service';
import { AuthService } from './services/auth-service/auth.service';
// import { AuthInterceptor } from './services/auth.interceptor';
import { FakeBackendInterceptor, FakeBackendProvider } from './services/auth.interceptor';
import { OrderService } from './services/order-service/order.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    NoAccessComponent,
    NotFoundComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,    
  ],
  providers: [
    HttpClient,
    ApiService,
    AuthService,
    OrderService,
    // FakeBackendInterceptor
    FakeBackendProvider
    // For creating a mock back-end. 
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
