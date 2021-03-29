import { customElement, LitElement, property } from 'lit-element';

@customElement('segments-element')
export class SegmentsElement extends LitElement {
  @property()
  query?: string;

  @property({ attribute: false })
  map!: google.maps.Map;

  private rendered = false;

  private addTask(): void {
    if (this.query) {
      const params = new URLSearchParams(this.query);
      const paths = params.getAll('seg').map(google.maps.geometry.encoding.decodePath);
      const colors = params.getAll('segcol');

      paths.forEach((path, i) => {
        new google.maps.Polyline({
          clickable: false,
          map: this.map,
          path,
          strokeColor: colors[i] ? '#' + colors[i] : 'yellow',
          strokeWeight: 3,
          strokeOpacity: 0.8,
          zIndex: 1000,
        });
      });
    }
  }

  protected shouldUpdate(): boolean {
    if (!this.rendered && this.map) {
      if (this.query) {
        this.addTask();
        this.rendered = true;
      }
    }
    return false;
  }
}
