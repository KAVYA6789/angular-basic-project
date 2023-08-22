import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  data: any;
  newPost: any = { title: '', body: '' };
  editPost: any = { id: '', title: '', body: '' };

 
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router 
  ) {}

  postData(newPost: any) {
    this.http.post<any>('https://jsonplaceholder.typicode.com/posts', newPost).subscribe(data => {
      console.log('New post created:', data);
      this.data.push(data); // Update your data array
      this.newPost = { title: '', body: '' };
    });
  }

  // Logout function
  logout() {
    this.authService.logout();
  }

  // Fetch data from API on component initialization
  ngOnInit() {
    this.getData();
  }

  // Fetch data from API
  getData() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    this.http.get(url).subscribe((res) => {
      this.data = res;
      console.log(this.data);
    });
  }

  // Delete data
  deleteData(id: number) {
    const deleteUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
    this.http.delete(deleteUrl).subscribe(
      () => {
        console.log(`Deleted data with ID: ${id}`);
        this.data = this.data.filter((post: any) => post.id !== id);
      },
      (error) => {
        console.error(`Error deleting data with ID ${id}:`, error);
      }
    );
  }

  // Edit data
  editData(post: any) {
    this.editPost = { ...post };
  }

  // Navigate to the new post page
  navigateToAddPost() {
    this.router.navigate(['/new-post']); // Navigate to the new post page
  }
}
