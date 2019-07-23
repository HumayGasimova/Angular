import { MockBackend } from '@angular/http/testing';
import { AuthService } from './services/auth.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AppErrorHandler } from './common/app-error-handler';
import { PostService } from './services/post.service';
import { ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NewCourseFormComponent } from './new-course-form/new-course-form.component';
import { PostsComponent } from './posts/posts.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { SignupComponent } from './signup/signup.component';
import { OrderService } from './services/order.service';
import { fakeBackendProvider } from './helpers/fake-backend';
import { HttpModule, Http, BaseRequestOptions } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    SignupFormComponent,
    NewCourseFormComponent,
    PostsComponent,
    NavbarComponent,
    GithubProfileComponent,
    GithubFollowersComponent,
    HomeComponent,
    NotFoundComponent,
    AdminComponent,
    LoginComponent,
    NoAccessComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // HttpModule,
    RouterModule.forRoot([
      // {
      //   path: '',
      //   component: HomeComponent
      // },
      // {
      //   path: 'followers/:id/:username',
      //   component: GithubProfileComponent
      // },
      // {
      //   path: 'followers',
      //   component: GithubFollowersComponent
      // },
      // {
      //   path: 'posts',
      //   component: PostsComponent
      // },
      // {
      //   path: '**',
      //   component: NotFoundComponent
      // },
      { path: '', component: HomeComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'login', component: LoginComponent },
      { path: 'no-access', component: NoAccessComponent }

    ])
  ],
  providers: [
    PostService,
    {provide: ErrorHandler, useClass: AppErrorHandler},
    OrderService,
    AuthService,

    //For creating a mock back-end. You don't need these in a real app
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
