import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { ArticlesComponent } from './articles/articles.component';
import { ToolsComponent } from './tools/tools.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo: 'login'
  },
  {
    path:'member',
    pathMatch:'full',
    component: MemberComponent
  },
  { path:'create',
    pathMatch:'full',
    component: MemberFormComponent
  },
  { path:'login',
    pathMatch:'full',
    component: LoginComponent
  },
  {
    path:':id/edit',
    pathMatch:'full',
    component: MemberFormComponent
  },
  {
    path:'dashboard',
    pathMatch:'full',
    component: DashboardComponent
  },
  {
    path:'events',
    pathMatch:'full',
    component: EventsComponent
  },
  {
    path:'articles',
    pathMatch:'full',
    component: ArticlesComponent
  },
  {
    path:'tools',
    pathMatch:'full',
    component: ToolsComponent
  },
  {
    path:'**',
    component: MemberComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
