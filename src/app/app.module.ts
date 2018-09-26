import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { QuestionShowComponent } from './question-show/question-show.component';
import { QuestionGetComponent } from './question-get/question-get.component';
import {FormsModule} from '@angular/forms';
import {AppData} from './app-data';
import {windowFactory} from './window-factory';

@NgModule({
  declarations: [
    AppComponent,
    QuestionShowComponent,
    QuestionGetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AppData,
    {
      provide: AppData,
      useFactory: windowFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
