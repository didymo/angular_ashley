import {Component, OnInit} from '@angular/core';
import {QuestionsService} from '../questions.service';
import {CategoryQuestion} from '../question';
import {TrafficPlanCategory} from '../traffic-plan-category';

// @ts-ignore
@Component({
  selector: 'app-question-show',
  templateUrl: './question-show.component.html',
  styleUrls: ['./question-show.component.css']
})
export class QuestionShowComponent implements OnInit {
  public questions: CategoryQuestion[];
  public categoryInformation: TrafficPlanCategory;
  public postBody = {};
  typeList: any[] = [
    {id: 1, name: 'Yes'},
    {id: 2, name: 'No'}
  ];
  // FIXME this is a temporary declaration for an example that does not work correctly.
  protected radioButtons: any[] = [
    {},
  ];
  type: number;
  // TODO This is a temporary variable used to demonstrate the [disabled] tag on the submit button. Please remove when able.
  myNum: number;

  constructor(
    private questionService: QuestionsService,
  ) {
  }

  ngOnInit(): void {
    this.radioButtons = [0];
    this.getQuestion();
  }

  getQuestion(): void {
    this.questionService.getQuestion().subscribe((results) => this.assignResults(results));
  }

  postAnswers(): void {
    this.questionService.postAnswers().subscribe((results) => this.assignCategory(results));
    console.log(this.categoryInformation);
  }

  private assignResults(results) {
    this.questions = results;
  }

  private assignCategory(results) {
    this.categoryInformation = results;
  }

  public onSubmit(value) {
    console.log('before');
    // alert('in onsubmit');
    // for (const entry of this.questions) {
    //   console.log(entry);
    // }
    this.questionService.postAnswers().subscribe();

    // console.log(value.value['q_1']);
    console.log('test');
    event.preventDefault();
  }

  protected changeRadioButton(value, questionId) {
    console.log(value);
    // console.log(questionId);
  }

  protected processForm() {
    alert('got the form info');
    console.log('test');
    event.preventDefault();
  }
}
