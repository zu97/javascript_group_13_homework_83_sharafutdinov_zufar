import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { NgForm } from '@angular/forms';
import { addArtistRequest } from '../../store/artists.actions';
import { AddArtistData } from '../../models/artist.model';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css']
})
export class EditArtistComponent {
  @ViewChild('f') form!: NgForm;
  isLoading: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.isLoading = store.select(state => state.artists.addLoading);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const addArtistData: AddArtistData = this.form.value;
    this.store.dispatch(addArtistRequest({artistData: addArtistData}))
  }

}
