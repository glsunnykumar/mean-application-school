import { importType } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

import {TopSlider} from '../topslider.model';
import {SliderService} from '../slider.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-topslider-list',
  templateUrl: './topslider-list.component.html',
  styleUrls: ['./topslider-list.component.css']
})
export class TopsliderListComponent implements OnInit {

  isLoading = false;
  displayedColumns: string[] = ['imageUrl','heading','subheading','action'];
  //displayedColumns: string[] = ['imageUrl','Name' ,'FatherName','action'];
  private slideSubs: Subscription;
  dataSource =null;

  slides: TopSlider[] = [];

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
 

  constructor(private  sliderservice :SliderService ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.sliderservice.getslides();
    this.slideSubs = this.sliderservice.getslideUpdatedListner().subscribe((slide: TopSlider[]) => {
     
      this.isLoading = false;
      this.slides = slide;
      console.log(this.slides);
     this.dataSource = new MatTableDataSource<TopSlider>(this.slides);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  })
}
}
