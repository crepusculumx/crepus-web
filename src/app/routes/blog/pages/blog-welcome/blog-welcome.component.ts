import { Component } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import {
  AsyncSubject,
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  takeUntil,
} from 'rxjs';
import { UserCardStates } from './widgets/user-cards/user-cards.component';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-content-welcome',
  templateUrl: './blog-welcome.component.html',
  styleUrls: ['./blog-welcome.component.less'],
})
export class BlogWelcomeComponent {}
