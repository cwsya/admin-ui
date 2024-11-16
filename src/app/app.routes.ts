import {Routes} from '@angular/router';
import {AdminComponent} from './pages/admin/admin.component';
import {WelcomeComponent} from './pages/admin/pages/welcome/welcome.component';
import {Page404Component} from './pages/error/page404/page404.component';
import {LoginComponent} from './pages/auth/login/login.component';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/admin' },
  { path: 'admin', component: AdminComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
    ]
  },
  { path:"login", component: LoginComponent },
  { path: '**', component: Page404Component}
];

