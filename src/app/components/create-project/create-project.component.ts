import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from 'src/app/services/upload-image.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
  providers: [ProjectService, UploadService],
})
export class CreateProjectComponent implements OnInit{

  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
  ) {
    this.title = 'Crear Proyecto';
    this.project = new Project('','', '', '', 2023, '', '');
    this.status = '';
    this.filesToUpload = [];
    this.url = Global.url;
  }

  ngOnInit() {}

  onSubmit(form: any) {
    // console.log(this.project);
    this._projectService.saveProject(this.project).subscribe({
      next: (response) => {
        if (response.project) {

          console.log(response);
          

          // Subir la imagen
          this._uploadService.makeFileRequest(Global.url + 'upload-image'+response.project._id, [], this.filesToUpload, 'originalname')
          .then((result) => {
            console.log(result);
            this.status = 'success';
            form.reset();

          });
   
        } else {
          this.status = 'failed';
        }

        // console.log(response, response.message);
      },
      error: (error) => {
          console.log(error);
      },
      complete: () => console.info('complete') 
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}


