import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full'},
  {
    path: "home",
    loadChildren: () => import("./modules/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "auth",
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "leads",
    loadChildren: () => import("./modules/leads/leads.module").then(m => m.LeadsModule)
  },
  {
    path: "settings",
    loadChildren: () => import("./modules/settings/settings.module").then(m => m.SettingsModule)
  },
  {
    path: "user-profile",
    loadChildren: () => import("./modules/user-profile/user-profile.module").then(m => m.UserProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
