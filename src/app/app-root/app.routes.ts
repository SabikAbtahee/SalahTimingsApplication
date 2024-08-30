import { Routes } from '@angular/router';
import { LayoutComponent } from '../components/layout/layout.component';
import { BannerUploadComponent } from '../components/banner-upload/banner-upload.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: LayoutComponent,
  },
  {
    path: 'upload',
    component: BannerUploadComponent,
  },
];
