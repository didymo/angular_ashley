import {Component, OnInit} from '@angular/core';
import {QuestionsService} from '../questions.service';
import {CategoryQuestion} from '../question';

// @ts-ignore
@Component({
  selector: 'app-question-show',
  templateUrl: './question-show.component.html',
  styleUrls: ['./question-show.component.css']
})
export class QuestionShowComponent implements OnInit {
  protected questions: CategoryQuestion[];
  protected postBody = {};
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

  private assignResults(results) {
    this.questions = results;
  }

  protected onSubmit(value) {
    console.log('before');
    // alert('in onsubmit');
    for (const entry of this.questions) {
      console.log(entry);
    }
    console.log(value.value['q_1']);
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
