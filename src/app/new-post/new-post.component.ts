import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  newPost: any = { title: '', body: '' };

  constructor(private router: Router, private http: HttpClient) {}

  postData(newPost: any) {
    this.http.post<any>('https://jsonplaceholder.typicode.com/posts', newPost).subscribe(data => {
      console.log('New post created:', data);
      this.router.navigate(['/']); // Navigate back to the dashboard after adding
    });
  }
}
