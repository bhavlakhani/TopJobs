import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { JobApplication } from '../models/job-application';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JobApplicationService } from '../services/job-application.service';

@Component({
  selector: 'emp-posted-jobs',
  templateUrl: './posted-jobs.component.html',
  styleUrls: ['./posted-jobs.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PostedJobsComponent implements OnInit {

  empId:String;
  jobApplications: JobApplication[];
  dataSource:JobApplication[]; 
  columnsToDisplay=['jobId','noOfOpenings','jobProfile','location','companyName','noOfApplicants'];
  columnNames=['Job ID', 'No Of Openings','Job Profile','Location','Campany Name','No of Applicants','']
  expandedElement:JobApplication;
  constructor(private FB: FormBuilder, private router: Router, private service: JobApplicationService, private route: ActivatedRoute) { }

 
  ngOnInit() {
    this.empId=this.route.snapshot.paramMap.get("empId");
    console.log(this.empId);
    this.service.getJobApplication(this.empId).subscribe(data => {

    this.jobApplications = data;
      this.dataSource = data;
      console.log(this.dataSource);
    });

  }
  job: JobApplication = new JobApplication();

  id: String;
}


