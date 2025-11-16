import { bootstrapApplication, platformBrowser } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { HomeModule } from './home/home.module';
import { Home } from './home/home';
import { Profile } from './app/profile/profile';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
/*platformBrowser()
  .bootstrapModule(HomeModule)
  .catch((err) => console.error(err));*/
