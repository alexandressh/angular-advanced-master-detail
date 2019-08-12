import { Component, OnInit } from '@angular/core';

import { Entry } from './../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {
  entries: Entry[] = [];

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.entryService.getAll().subscribe(
      entries => this.entries = entries.sort((a,b) => b.id - a.id),
      error => console.error('Erro ao carregar lista', error)
    );
  }

  deleteEntry(entry) {
    this.entryService.delete(entry).subscribe(
      () => this.entries = this.entries.filter(el => el !== entry),
      (err) => console.error(err)
    )
  }

}
