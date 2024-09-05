import { NgModule } from '@angular/core';
import { InMemoryDataService } from './services/in-memory-data/in-memory-data.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';


@NgModule({
  declarations: [
  ],
  imports: [
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }