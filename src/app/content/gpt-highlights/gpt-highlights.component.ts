import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../services/content.service';
import { Highlight } from 'src/app/shared/interfaces';
import { HighlightService } from '../services/highlight.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gpt-highlights',
  templateUrl: './gpt-highlights.component.html',
  styleUrls: ['./gpt-highlights.component.scss'],
})
export class GptHighlightsComponent {
  contentId = '';

  GPThighlights: Highlight[] = [];

  textHtml = 'this is the desc';
  constructor(
    private highlightService: HighlightService,
    private contentService: ContentService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.contentId = this.route.snapshot.paramMap.get('id') || '';
    this.getContentbyID();
  }


  getContentbyID() {
    this.contentService.getById(this.contentId).subscribe((res: any) => {
      this.GPThighlights = res.content.GptHighlights;
    });
  }

  createGPTHighlights() {
    console.log('function called');
    this.contentService.createGPTHighlights(this.contentId).subscribe((res) => {
      this.toastr.success('Highlights Generated');
      this.getContentbyID();
    });
  }

  addGptHighlight(highlight: Highlight) {
    console.log('hihihih', highlight);

    const data: Highlight = {
      ContentId: highlight.ContentId,
      content: highlight.content,
      description: highlight.description,
    };
    this.highlightService.add(data).subscribe((res) => {
      console.log('Highlight added successfuly', res);
      this.toastr.success('Highlight added successfuly');
    });
  }
}

