import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'closed',
        style({
          opacity: 0.1,
        })
      ),

      state('open', style({})),

      transition('open => closed', [animate('0.1s')]),
      transition('closed => open', [animate('0.1s')]),
    ]),

    trigger('hideText', [
      state(
        'shown',
        style({
          visibility: 'visible',
        })
      ),

      state(
        'hidden',
        style({
          visibility: 'hidden',
        })
      ),

      transition('shown => hidden', [animate('0.1s')]),
      transition('hidden => shown', [animate('0.1s')]),
    ]),
  ],
})
export class StickerComponent implements OnInit {
  @Input() sticker!: Sticker;
  @Input() isFavorite: boolean = false;
  @Input() isHidden: boolean = false;
  @Input() size: number = 0;

  @Output() Favorite = new EventEmitter<string>();
  @Output() UnFavorite = new EventEmitter<string>();
  @Output() Hide = new EventEmitter<string>();
  @Output() UnHide = new EventEmitter<string>();
  @Output() Copied = new EventEmitter<void>();

  isShown = true;

  hideImage() {
    this.isShown = !this.isShown;
  }

  ngOnInit(): void {
    this.isShown = this.isHidden;
  }

  ngOnDestroy(): void {}

  favoriteClick(sticker: Sticker) {
    if (!this.isFavorite) {
      this.UnFavorite.emit(sticker.id);
    } else {
      this.Favorite.emit(sticker.id);
    }
  }

  hideClick(sticker: Sticker) {
    if (!this.isHidden) {
      this.hideImage();
      setTimeout(() => {
        this.UnHide.emit(sticker.id);
      }, 500);
    } else {
      this.hideImage();
      setTimeout(() => {
        this.Hide.emit(sticker.id);
      }, 500);
    }
  }

  async copyToClipboard() {
    const url = new URL(`stickers/${this.sticker.set}/${this.sticker.name}${(this.size ? `.s${this.size}` : '')}.${this.sticker.type}`, window.location.href).href;
    navigator.clipboard.writeText(url);
    this.Copied.emit()
  }
}
