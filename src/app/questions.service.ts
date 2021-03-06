///<reference path="../../node_modules/@angular/common/http/src/client.d.ts"/>
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryQuestion} from './question';
import {map} from 'rxjs/operators';
import {forEach} from '@angular/router/src/utils/collection';
import {TrafficPlanCategory} from './traffic-plan-category';
import {parseHttpResponse} from 'selenium-webdriver/http';
import {AppData} from './app-data';


@Injectable({providedIn: 'root'})

export class QuestionsService {
  private api = 'http://local.serviceangular.com.au/questionnaire/questions?_format=json';
  private postapi =  'http://local.serviceangular.com.au/questionnaire/submit?_format=json';
  private csrfToken: string;


  constructor(private http: HttpClient, private appData: AppData) {
    http.get('http://local.serviceangular.com.au/rest/session/token', {responseType: 'text'})
      .subscribe((value) => {
        console.log(value);
        this.csrfToken = value;
      });
  }

  postAnswers(myBody): Observable<TrafficPlanCategory> {
    const headers = {
      'headers': new HttpHeaders({
        'content-type': 'application/json',
        'X-CSRF-Token': this.csrfToken,
        //'Authorization': 'Basic ZnJvbnRlbmQ6cmVzdDEyMw=='
        'Authorization': `Bearer ${this.appData.jwtkey}`
      })
    };
  // const body = '{"q_1":{"Will it impact a major road(s)?":false},"q_2":{"Will it disrupt the non-event community over a wide area?":false},"q_3":{"Will your event impact traffic over a wide area? (trains, buses, etc.)":false},"q_4":{"Will it impact local traffic and roads?":false},"q_5":{"Will it disrupt the non-event community over a local area?":false},"q_6":{"Will your event impact local transport systems? (Local buses and routes)":false},"q_7":{"Will it disrupt the non-event community in the immediate area only?":false},"q_8":{"Is it a minor event under Police supervision?":false}}';
    console.log('in postAnswers');
    console.log(this.appData.jwtkey);
  console.log(myBody);
  console.log('this junk is running in the code postAnswers ');
    // this.http.get(this.api, headers).subscribe((questions) => console.log(questions));
    // return null;

    return this.http
      .post(this.postapi, myBody, headers)
      .pipe(
        map( response => this.mapCategory(response))
      );
  }

  private mapCategory(response): TrafficPlanCategory {
    const trafficCategory = new TrafficPlanCategory();
    trafficCategory.body = response;
    return trafficCategory;
  }

 // getQuestion(): Observable<CategoryQuestions[]> {
  getQuestion(): Observable<CategoryQuestion[]> {
    const headers = {
      'headers': new HttpHeaders({
        'content-type': 'application/json',
        //'Authorization': 'Basic ZnJvbnRlbmQ6cmVzdDEyMw=='
        // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MzgwMTM4NzAsImV4cCI6MTUzODAxNzQ3MCwiZHJ1cGFsIjp7InVpZCI6IjEifX0.e3lXoNdmyD136rHl8V46SiX9neNxETwuy1ubRUHatTE'
        'Authorization': `Bearer ${this.appData.jwtkey}`
      })
    };
    console.log('in getQuestion');
    console.log(this.appData.jwtkey);
    // this.http.get(this.api, headers).subscribe((questions) => console.log(questions));
    // return null;

    return this.http
     // .get<CategoryQuestions[]>(this.api, headers)
      .get(this.api, headers)
      .pipe(
        map(response => this.mapToCategoryQuestionsArray(response),
          console.log('inside pipe')
        )
      );
  }

  /**
   * Maps the Drupal server response to a CategoryQuestions array.
   *
   * @param response
   *  A tab view list that has been mapped to the CategoryQuestions object.
   */
  private mapToCategoryQuestionsArray(response): CategoryQuestion[] {
    console.log('private mapToCategoryQuestionsArray');
    // console.log(response);
    // return response.map(result => this.mapToCategoryQuestions(result));
    return response.map(result => this.mapToCategoryQuestions(result));
  }

  /**
   * Maps a tab view from the Drupal server to a CategoryQuestions.
   *
   * @param results
   *  A single question from the list from the Drupal server.
   * @returns {CategoryQuestion}
   *  A CategoryQuestions object that has been populated by the server object.
   */
  private mapToCategoryQuestions(results): CategoryQuestion {
    const categoryQuestions = new CategoryQuestion();
    categoryQuestions.id = Object.keys(results).pop();
    categoryQuestions.questionText = (<string>Object.values(results).pop());
    categoryQuestions.result = '';

    return categoryQuestions;
  }



  /**
  * Handle Http operation that failed.
  * Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      // return of(result as T);
      return null;
    };
  }
}
