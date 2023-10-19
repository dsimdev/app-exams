import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { StarExamComponent } from './pages/user/star-exam/star-exam.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { WelcomeUserComponent } from './pages/user/welcome-user/welcome-user.component';
import { LoadExamComponent } from './pages/user/load-exam/load-exam.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { ViewExamQuestionComponent } from './pages/admin/view-exam-question/view-exam-question.component';
import { UpdateExamComponent } from './pages/admin/update-exam/update-exam.component';
import { AddExamComponent } from './pages/admin/add-exam/add-exam.component';
import { ViewExamsComponent } from './pages/admin/view-exams/view-exams.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';
import { DashboardUserComponent } from './pages/user/dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './pages/admin/dashboard-admin/dashboard-admin.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard-admin',
    component: DashboardAdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'categories/:categoryId',
        component: UpdateCategoryComponent,
      },
      {
        path: 'exams',
        component: ViewExamsComponent,
      },
      {
        path: 'add-exam',
        component: AddExamComponent,
      },
      {
        path: 'exams/:examId',
        component: UpdateExamComponent,
      },
      {
        path: 'questions/:examId/:title',
        component: ViewExamQuestionComponent,
      },
      {
        path: 'add-question/:examId/:title',
        component: AddQuestionComponent,
      },
      {
        path: 'questions/:questionId',
        component: UpdateQuestionComponent,
      },
    ],
  },
  {
    path: 'dashboard-user',
    component: DashboardUserComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: '',
        component: WelcomeUserComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: ':categoryId',
        component: LoadExamComponent,
      },
      {
        path: 'instructions/:examId',
        component: InstructionsComponent,
      },
    ],
  },
  {
    path: 'start/:examId',
    component: StarExamComponent,
    canActivate: [UserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
