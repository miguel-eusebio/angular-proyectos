import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {

  public projects: Project[] = [];

  constructor(
    private _projectsService: ProjectService
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this._projectsService.getProjects().subscribe({
      next: (response) => {
        if (response.projects) {
          this.projects = response.projects;
        }
      },
      error: (error) => {
        console.log(error);     
      }
    });
  }

}


